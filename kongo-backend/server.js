// ============================================
// SECTION 1 : IMPORTATION DES MODULES
// ============================================
require('dotenv').config();
const https = require('https');
const fs = require('fs');
const express = require('express');

const sequelize = require('./config/database');
const apiRoutes = require('./routes/apiRoutes');
const globalMiddleware = require('./middleware/globalMiddleware' );

// Dotenv charge les variables d'environnement depuis un fichier .env (mots de passe, clés API, etc.)

// ============================================
// SECTION 2 : CRÉATION DE L'APPLICATION
// ============================================
const app = express();



// ============================================
// SECTION 3 : MIDDLEWARES DE SÉCURITÉ
// ============================================
globalMiddleware(app);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// ============================================
// SECTION 4 : ROUTES DE L'API
// ============================================
app.use('/api', apiRoutes);

// ROUTE GET : Page d'accueil de l'API
// Accessible à : https://localhost:3000/
app.get('/', (req, res) => {
  res.json({
    message: "Bienvenue sur l'API KONGO by AMENYS",
    status: 'Serveur HTTPS actif',
  });
});


// ============================================
// SECTION 5 : CONFIGURATION HTTPS/SSL
// ============================================
const options = {
  key: fs.readFileSync('./ssl/key.pem'),
  cert: fs.readFileSync('./ssl/cert.pem'),
};



const PORT = process.env.PORT || 3000;
// Crée et démarre le serveur HTTPS
https.createServer(options, app).listen(PORT, () => {

  console.log(`🔒 Serveur HTTPS KONGO démarré sur https://localhost:${PORT}`);
  console.log(`✨ API prête pour les parfums de luxe`);
});
