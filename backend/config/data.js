const mongoose = require('mongoose');
require('dotenv').config({ path: '../.env' });
const Vehicle = require('../models/Vehicle');
const Driver = require('../models/Driver');


const OrderSchema = new mongoose.Schema({
  orderNumber: String,
  clientName: String,
  materialDescription: String,
  weightKg: Number,
  status: { 
    type: String, 
    enum: ['Pending', 'Dispatched'], 
    default: 'Pending' 
  }
});
const Order = mongoose.model('Order', OrderSchema);


const seedLogisticsDatabase = async () => {
  try {
    console.log(' connecting to MongoDB Atlas ...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected');


    await Promise.all([
      Vehicle.deleteMany({}),
      Driver.deleteMany({}),
      Order.deleteMany({})
    ]);


    const seededVehicles = await Vehicle.create([
      { vehicleNumber: 'MH-12-QW-8845', type: 'Flatbed', maxCapacityKg: 18000, status: 'Available', currentYard: 'Factory Dispatch Gate 1' },
      { vehicleNumber: 'DL-03-CB-1290', type: 'Container Truck', maxCapacityKg: 25000, status: 'Available', currentYard: 'Factory Dispatch Gate 2' },
      { vehicleNumber: 'KA-51-MJ-4311', type: 'Chiller Van', maxCapacityKg: 6000, status: 'Available', currentYard: 'Cold Storage Wing' },
      { vehicleNumber: 'GJ-01-XX-7756', type: 'Box Truck', maxCapacityKg: 4500, status: 'Maintenance', currentYard: 'Repair Bay Alpha' }
    ]);

   
    const seededDrivers = await Driver.create([
      { employeeId: 'EMP-9021', fullName: 'Marcus Vance', contactNo: '+919876543210', licenseClass: 'Heavy Combination (HC)', licenseNumber: 'DL-HEAVY-77A', status: 'Available', gatePassExpiry: new Date('2027-12-31') },
      { employeeId: 'EMP-4412', fullName: 'Sarah Jenkins', contactNo: '+918765432109', licenseClass: 'Heavy Rigid (HR)', licenseNumber: 'DL-RIGID-12B', status: 'Available', gatePassExpiry: new Date('2027-06-15') },
      { employeeId: 'EMP-1102', fullName: 'Rajesh Kumar', contactNo: '+917654321098', licenseClass: 'Medium Rigid (MR)', licenseNumber: 'DL-MED-99C', status: 'On Trip', gatePassExpiry: new Date('2026-11-20') }
    ]);


    const seededOrders = await Order.create([
      { orderNumber: 'ORD-2026-001', clientName: 'Apex Infrastructure Group', materialDescription: 'Reinforced Structural Steel Rebar', weightKg: 14500, status: 'Pending' },
      { orderNumber: 'ORD-2026-002', clientName: 'Global Automotive Parts Corp', materialDescription: 'Stamped Sheet Aluminum Coils', weightKg: 8200, status: 'Pending' },
      { orderNumber: 'ORD-2026-003', clientName: 'Metro Food Distributors', materialDescription: 'Perishable Dairy Ingredients', weightKg: 3800, status: 'Pending' },
      { orderNumber: 'ORD-2026-004', clientName: 'Titanium Alloys Inc', materialDescription: 'Raw Nickel Processing Ores', weightKg: 22000, status: 'Pending' }
    ]);

    console.log(`Success!! ${seededVehicles.length} vehicles, ${seededDrivers.length} drivers, and pending orders.`);
  } catch (error) {
    console.error(' Data seeding aborted :', error);
  }
};

seedLogisticsDatabase();