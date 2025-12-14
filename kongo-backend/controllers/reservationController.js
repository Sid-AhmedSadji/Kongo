// On importe le nouveau modèle Reservation
const Reservation = require('../models/reservation');

exports.createReservation = async (req, res) => {
  try {
    const { fullName, email, city, date } = req.body;

    // On utilise Reservation.create
    const newReservation = await Reservation.create({
      full_name,
      email,
      date_rdv: date
    });

    res.status(201).json({ 
      message: 'Réservation enregistrée avec succès', 
      id: newReservation.id 
    });

  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({ error: 'Ce créneau est déjà réservé' });
    }
    console.error(error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};