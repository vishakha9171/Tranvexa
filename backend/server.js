
const express = require('express');
const mongoose = require('mongoose');
const {connectDB}=require("./config/db");
const cors = require('cors'); // cors enables frontend-backend communication
require('dotenv').config(); // dotenv ensures security    //.config reads .env file and parse to process.env
const vehicleRoutes = require('./routes/vehicleRoutes');
const driverRoutes=require('./routes/driverRoutes')
const tripRoutes=require('./routes/tripRoutes')


const app = express();

app.use(cors(
  {
  origin: 'https://tranvexa-1.onrender.com', 
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  credentials: true
}
));
app.use(express.json()); // express will able to read json data from client

connectDB();

app.get("/", (req, res) => {
  res.send(" API running");
});


app.use('/api/vehicles', vehicleRoutes);
app.use('/api/drivers', driverRoutes);
app.use('/api/trips', tripRoutes);


const PORT = process.env.PORT || 5000; //if port not there use 5000

app.listen(PORT, () => {
  console.log(`Production logistics server running on port ${PORT}`)
});
