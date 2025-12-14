const Newsletter = require('../models/newsletter');

exports.newsletter = async (req, res) => {
  try {
    const email= req.params.email;

    // On utilise Reservation.create
    const newNewsletter = await Newsletter.create({
      email
    });

    res.status(201).json({ 
      message: 'email    enregistrée avec succès', 
      id: newNewsletter.id 
    });

  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({ error: 'Cette email est déja inscrite' });
    }
    console.error(error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};