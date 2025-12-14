const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Newsletter = sequelize.define('Newsletter', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // Empêche les doublons
    validate: {
      isEmail: true // Vérifie automatiquement si c'est un email valide
    }
  },
  created_at: {
    type: DataTypes.DATE, 
    allowNull: false,
    unique: true 
  }
});

module.exports = Newsletter;