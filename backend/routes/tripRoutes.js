const express = require('express');
const router = express.Router();
const {
  dispatchNewTrip,
  getAllTrips,
  getTripById,
  updateTripStatus,
  cancelTrip
} = require('../controllers/tripCtrl');


router.route('/')
  .get(getAllTrips)
  .post(dispatchNewTrip);


router.route('/:id')
  .get(getTripById);


router.route('/:id/status')
  .patch(updateTripStatus);


router.route('/:id/cancel')
  .delete(cancelTrip);

module.exports = router;