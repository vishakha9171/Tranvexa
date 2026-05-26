const Driver = require('../models/Driver');


exports.getAllDrivers = async (req, res) => {
  try {
    const { status } = req.query;
    const filter = {};
    

    if (status) {
      filter.status = status;
    }

    const drivers = await Driver.find(filter)
      .populate('assignedVehicle', 'vehicleNumber type') 
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: drivers.length,
      data: drivers
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to access driver registry: " + error.message
    });
  }
};


exports.createDriver = async (req, res) => {
  try {
    const { employeeId, licenseNumber } = req.body;

    const existingDriver = await Driver.findOne({ 
      $or: [{ employeeId: employeeId.toUpperCase() }, { licenseNumber: licenseNumber.toUpperCase() }] 
    });

    if (existingDriver) {
      return res.status(400).json({
        success: false,
        message: "Driver is already registered"
      });
    }

    const newDriver = await Driver.create(req.body);

    res.status(201).json({
      success: true,
      data: newDriver
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to create driver profile: " + error.message
    });
  }
};


exports.getDriverById = async (req, res) => {
  try {
    const driver = await Driver.findById(req.params.id).populate('assignedVehicle');
    
    if (!driver) {
      return res.status(404).json({
        success: false,
        message: "Driver profile not found."
      });
    }


    const isGatePassExpired = new Date(driver.gatePassExpiry) < new Date();

    res.status(200).json({
      success: true,
      isGatePassExpired,
      data: driver
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching driver details: " + error.message
    });
  }
};


exports.updateDriver = async (req, res) => {
  try {
    const updatedDriver = await Driver.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true, runValidators: true } 
    );

    if (!updatedDriver) {
      return res.status(404).json({
        success: false,
        message: "Driver profile not found."
      });
    }

    res.status(200).json({
      success: true,
      data: updatedDriver
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to update driver parameters: " + error.message
    });
  }
};


exports.deleteDriver = async (req, res) => {
  try {
    const driver = await Driver.findById(req.params.id);

    if (!driver) {
      return res.status(404).json({
        success: false,
        message: "Driver profile not found."
      });
    }


    if (driver.status === 'On Trip') {
      return res.status(400).json({
        success: false,
        message: "Operational Lockout"
      });
    }

    await driver.deleteOne();

    res.status(200).json({
      success: true,
      message: "Driver file successfully removed"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting driver: " + error.message
    });
  }
};