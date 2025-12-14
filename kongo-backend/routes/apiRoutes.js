const express = require('express');
const router = express.Router();

const newsletterController = require('../controllers/newsletterController');
// Mise à jour de l'import
const reservationController = require('../controllers/reservationController');

// Routes Newsletter
router.post('/newsletter', newsletterController.newsletter);

// Routes Réservation (URL mise à jour : /reservation)
router.post('/reservation', reservationController.createReservation);

module.exports = router;