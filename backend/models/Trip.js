
const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
    tripId: 
    { 
        type: String, 
        required: true, 
        unique: true
    },
    vehicle: 
    {   
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Vehicle', 
        required: true  
    },
    driverName: 
    { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Driver',
        required: true 
    },
    // can deliver more than one product at a time
    deliveryOrders: 
    [{ 
        type: String, 
        required: true 
    }], 
    route: {
        origin: 
        { 
            type: String, 
            default: 'Factory Main Gate' 
        },
        destination: 
        { 
            type: String, 
            required: true 
        }
    },
    status: 
    { 
        type: String, 
        enum: ['Scheduled', 'Dispatched', 'Delivered', 'Cancelled'], 
        default: 'Scheduled' 
    },
    dispatchedAt: { type: Date },
    estimatedArrival: { type: Date }
},
{ 
    timestamps: true 
});

module.exports = mongoose.model('Trip', tripSchema);