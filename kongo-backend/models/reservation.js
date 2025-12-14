const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Reservation = sequelize.define('Reservation', {
  full_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: { isEmail: true }
  },
  date_rdv: {
    type: DataTypes.DATE, // Gère Date + Heure (Timestamp)
    allowNull: false,
    unique: true // Empêche deux RDV à la même heure
  }
});

module.exports = Reservation;