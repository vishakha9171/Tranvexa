
const express = require('express');
const router = express.Router();
const { getAllVehicles, createVehicle } = require('../controllers/vehicleCtrl');

router.post("/", createVehicle);
router.get("/", getAllVehicles);

module.exports = router;