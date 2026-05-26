const Trip = require('../models/Trip');
const Vehicle = require('../models/Vehicle');
const Driver = require('../models/Driver');

exports.dispatchNewTrip = async (req, res) => {
    const { vehicleId, driverId, destination, deliveryOrders} = req.body; 

    try {
        const vehicle = await Vehicle.findById(vehicleId);
        if (!vehicle || vehicle.status !== 'Available') {
        return res.status(400).json({ success: false, message: "Target vehicle is not available." });
        }

        const driver = await Driver.findById(driverId);
        if (!driver || driver.status !== 'Available') {
          return res.status(400).json({ success: false, message: "Selected operator is not on yard standby status." });
        }

        const uniqueTripId = `TRIP-${Date.now().toString().slice(-6)}`;

        const newTrip = await Trip.create({
        tripId: uniqueTripId,
        vehicle: vehicleId,
        driver: driverId,
        deliveryOrders: deliveryOrders, 
        destination: destination,
        status: 'Scheduled',
        dispatchedAt: new Date()
        });


        vehicle.status = 'Loading';
        await vehicle.save();
        driver.status = 'On Trip';
        await driver.save();

        res.status(201).json({ success: true, data: newTrip });
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Internal error: " + error.message });
    }
};



exports.getAllTrips = async (req, res) => {
  try {
    const trips = await Trip.find()
      .populate('vehicle', 'vehicleNumber type')
      .populate('driver', 'fullName contactNumber employeeId')
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, count: trips.length, data: trips });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


exports.getTripById = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id)
      .populate('vehicle')
      .populate('driver');

    if (!trip) return res.status(404).json({ success: false, message: " not found." });
    res.status(200).json({ success: true, data: trip });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


exports.updateTripStatus = async (req, res) => {
  const { status } = req.body; 
  try {
    const trip = await Trip.findById(req.params.id);
    if (!trip) return res.status(404).json({ success: false, message: "Trip not found." });

    trip.status = status;
    if (status === 'Dispatched') trip.dispatchedAt = new Date();
    await trip.save();

   
    if (status === 'Delivered') {
      await Vehicle.findByIdAndUpdate(trip.vehicle, { status: 'Available', currentYard: trip.route.destination });
      await Driver.findByIdAndUpdate(trip.driver, { status: 'Available' });
    }

    res.status(200).json({ success: true, data: trip });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};


exports.cancelTrip = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);
    if (!trip) return res.status(404).json({ success: false, message: "Target not located." });
    if (trip.status !== 'Scheduled') {
      return res.status(400).json({ success: false, message: "Cannot cancel a trip already in transit operations." });
    }

    await Promise.all([
      Vehicle.findByIdAndUpdate(trip.vehicle, { status: 'Available' }),
      Driver.findByIdAndUpdate(trip.driver, { status: 'Available' })
    ]);


    await trip.deleteOne();
    res.status(200).json({ success: true, message: "Trip cancelled successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};