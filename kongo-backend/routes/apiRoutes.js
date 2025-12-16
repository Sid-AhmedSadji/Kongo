const express = require('express');
const router = express.Router();

const newsletterController = require('../controllers/newsletterController');
const reservationController = require('../controllers/reservationController');
const adminController = require('../controllers/adminController');

// Routes Newsletter
router.post('/newsletter', newsletterController.newsletter);

// Routes Réservation 
router.post('/reservation', reservationController.createReservation);

// Routes Admin
router.get('/admin', adminController.getAdmin);

module.exports = router;