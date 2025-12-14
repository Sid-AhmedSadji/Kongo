// ============================================
// SECTION 1 : IMPORTATION DES MODULES
// ============================================

const https = require('https');
const fs = require('fs');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const sequelize = require('./config/database');
const apiRoutes = require('./routes/apiRoutes');

// Dotenv charge les variables d'environnement depuis un fichier .env (mots de passe, clés API, etc.)
require('dotenv').config();

// ============================================
// SECTION 2 : CRÉATION DE L'APPLICATION
// ============================================

// Crée une instance de l'application Express
// C'est notre serveur web principal
const app = express();

// ============================================
// SECTION 3 : MIDDLEWARES DE SÉCURITÉ
// ============================================

// Active toutes les protections de sécurité Helmet automatiquement
// (protection contre XSS, clickjacking, etc.)
app.use(helmet());

// Configure CORS pour autoriser uniquement notre frontend Angular
app.use(
  cors({
    origin: 'https://localhost:4200', // Seul ce domaine peut accéder à l'API
    credentials: true, // Permet l'envoi de cookies/authentification
  })
);

// Middleware pour parser (analyser) les données JSON dans les requêtes
// Exemple : {email: "test@kongo.com"} sera accessible via req.body.email
app.use(express.json());

// Middleware pour parser les données de formulaires HTML classiques
app.use(express.urlencoded({ extended: true }));

// ============================================
// SECTION 4 : ROUTES DE L'API
// ============================================

app.use('/api', apiRoutes);

// ROUTE GET : Page d'accueil de l'API
// Accessible à : https://localhost:3000/
app.get('/', (req, res) => {
  // req = requête entrante (request)
  // res = réponse à envoyer (response)

  // Envoie une réponse JSON au client
  res.json({
    message: "Bienvenue sur l'API KONGO by AMENYS",
    status: 'Serveur HTTPS actif',
  });
});


// ============================================
// SECTION 5 : CONFIGURATION HTTPS/SSL
// ============================================

// Objet contenant les certificats SSL pour HTTPS
const options = {
  // Lit la clé privée (à ne JAMAIS partager publiquement)
  key: fs.readFileSync('./ssl/key.pem'),

  // Lit le certificat public
  cert: fs.readFileSync('./ssl/cert.pem'),
};

// ============================================
// SECTION 6 : DÉMARRAGE DU SERVEUR
// ============================================

// Définit le port du serveur : utilise la variable d'environnement PORT ou 3000 par défaut
const PORT = process.env.PORT || 3000;

// Crée et démarre le serveur HTTPS
https.createServer(options, app).listen(PORT, () => {
  // Cette fonction callback s'exécute quand le serveur est prêt

  // Affiche un message dans la console
  console.log(`🔒 Serveur HTTPS KONGO démarré sur https://localhost:${PORT}`);
  console.log(`✨ API prête pour les parfums de luxe`);
});

// ============================================
// FLUX DE FONCTIONNEMENT
// ============================================
/*
1. Client Angular (https://localhost:4200) envoie une requête
   ↓
2. HTTPS sécurise la connexion avec SSL
   ↓
3. CORS vérifie que la requête vient bien d'Angular
   ↓
4. Helmet applique les protections de sécurité
   ↓
5. Express route la requête vers le bon endpoint (/, /api/newsletter, etc.)
   ↓
6. Le serveur traite la requête et répond en JSON
   ↓
7. La réponse retourne au client Angular
*/
