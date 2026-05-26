
const Vehicle = require('../models/Vehicle');


exports.getAllVehicles = async (req, res) => {
  try {
    const { status } = req.query;
    const filter = {};

    if (status) {
      filter.status = status;
    }
    const vehicles = await Vehicle.find(filter).sort({ createdAt: -1 });  //arrange newest first
    res.status(200).json(
      { success: true, 
        count: vehicles.length, 
        data: vehicles 
      });
  } catch (error) {
    res.status(500).json(
      { 
        success: false,
        message: error.message 
      });
  }
};



exports.createVehicle = async (req, res) => {
  try {
    if (req.body.vehicleNumber) {
      req.body.vehicleNumber = req.body.vehicleNumber.toUpperCase();
    }
    const newVehicle = await Vehicle.create(req.body);
    res.status(201).json({ success: true, data: newVehicle });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};