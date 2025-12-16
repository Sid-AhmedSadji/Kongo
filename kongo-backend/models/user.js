const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },

  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
    validate: { isEmail: true }
  },

  password: {
    type: DataTypes.STRING(255),
    allowNull: false
  },

  role: {
    type: DataTypes.STRING(255),
    allowNull: false
  },

  numeroCarte: {
    type: DataTypes.STRING(255),
    allowNull: false
  }

}, {
  tableName: 'users',
  timestamps: true
});

module.exports = User;