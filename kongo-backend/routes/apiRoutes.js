const express = require('express');
const router = express.Router();

const newsletterController = require('../controllers/newsletterController');
const reservationController = require('../controllers/reservationController');
const adminController = require('../controllers/adminController');
const userController = require('../controllers/userController');

// Routes Newsletter
router.post('/newsletter', newsletterController.newsletter);

// Routes Réservation 
router.post('/reservation', reservationController.createReservation);

// Routes Admin
router.get('/admin', adminController.getAdmin);

// Routes User
route .post('/signup', userController.signup);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/user', userController.getUser);
router.get('/creditCard', userController.getCreditCard);

module.exports = router;