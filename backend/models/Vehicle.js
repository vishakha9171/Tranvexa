
const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
    vehicleNumber: { 
        type: String,
        required: true, 
        unique: true, 
        uppercase: true
    },
    type: { 
        type: String, 
        enum: ['Flatbed', 'Container Truck', 'Box Truck', 'Chiller Van'],  //no other words except these
        required: true 
    },
    maxCapacityKg: { 
        type: Number, 
        required: true 
    },
    status: {
        type: String, 
        enum: ['Available', 'Loading', 'On Trip', 'Maintenance'], 
        default: 'Available' 
    },
    currentYard: { 
        type: String, 
        default: 'Main Factory Dispatch Yard' 
    }
},
{ 
    timestamps: true 
});


module.exports = mongoose.model('Vehicle', vehicleSchema);