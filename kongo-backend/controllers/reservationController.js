const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user'); // ton modèle Sequelize

// ===============================
// SIGN UP
// ===============================
exports.signup = async (req, res) => {
  try {
    const { email, password, role, numeroCarte } = req.body;

    // Vérifier si l'utilisateur existe déjà
    const existing = await User.findOne({ where: { email } });
    if (existing) {
      return res.status(409).json({ error: "Cet email est déjà utilisé" });
    }

    // Hash du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Création utilisateur
    const newUser = await User.create({
      email,
      password: hashedPassword,
      role,
      numeroCarte
    });

    res.status(201).json({
      message: "Utilisateur créé avec succès",
      id: newUser.id
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

// ===============================
// LOGIN
// ===============================
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Vérifier utilisateur
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(401).json({ error: "Identifiants invalides" });

    // Vérifier mot de passe
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: "Identifiants invalides" });

    // Générer token
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.status(200).json({
      message: "Connexion réussie",
      token
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

// ===============================
// LOGOUT
// ===============================
exports.logout = async (req, res) => {
  try {
    // En JWT, le logout se fait côté client (on supprime le token)
    res.status(200).json({ message: "Déconnexion réussie (token supprimé côté client)" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

// ===============================
// GET USER (profil)
// ===============================
exports.getUser = async (req, res) => {
  try {
    const userId = req.user.id; // récupéré via middleware JWT

    const user = await User.findByPk(userId, {
      attributes: ["id", "email", "role", "createdAt"]
    });

    if (!user) return res.status(404).json({ error: "Utilisateur introuvable" });

    res.status(200).json(user);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

// ===============================
// GET CREDIT CARD
// ===============================
exports.getCreditCard = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findByPk(userId, {
      attributes: ["numeroCarte"]
    });

    if (!user) return res.status(404).json({ error: "Utilisateur introuvable" });

    res.status(200).json({
      numeroCarte: user.numeroCarte
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};