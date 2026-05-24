const mongoose = require('mongoose');

const driverSchema = new mongoose.Schema({
  employeeId: { 
    type: String, 
    required: true, 
    unique: true, 
    uppercase: true,
    trim: true
  },
  fullName: { 
    type: String, 
    required: true,
    trim: true
  },
  contactNo: { 
    type: String, 
    required: true 
  },
  licenseClass: { 
    type: String, 
    enum: ['Heavy Rigid (HR)', 'Heavy Combination (HC)', 'Medium Rigid (MR)', 'Standard Commercial (SC)'], 
    required: true 
  },
  licenseNumber: { 
    type: String, 
    required: true, 
    unique: true,
    uppercase: true 
  },
  status: { 
    type: String, 
    enum: ['Available', 'On Trip', 'Off Duty', 'Suspended'], 
    default: 'Available' 
  },
  gatePassExpiry: { 
    type: Date, 
    required: true 
  },
  assignedVehicle: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vehicle',
    default: null
  }
}, 
{ 
  timestamps: true
});

driverSchema.index({ status: 1, licenseClass: 1 });

module.exports = mongoose.model('Driver', driverSchema);