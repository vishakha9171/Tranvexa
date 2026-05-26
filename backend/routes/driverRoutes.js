const express = require('express');
const router = express.Router();
const { 
  getAllDrivers, 
  createDriver, 
  getDriverById, 
  updateDriver, 
  deleteDriver 
} = require('../controllers/driverCtrl');

router.route('/')
  .get(getAllDrivers)
  .post(createDriver);

router.route('/:id')
  .get(getDriverById)
  .put(updateDriver)
  .delete(deleteDriver);

module.exports = router;