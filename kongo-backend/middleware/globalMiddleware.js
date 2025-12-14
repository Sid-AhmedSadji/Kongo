const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const globalMiddleware = (app) => {
  // Logging méthode + URL
  app.use((req, res, next) => {
    console.log(process.env.DB_PASSWORD);
    console.log(`${req.method} ${req.url}`);
    next();
  });

  // Log de l'origine de la requête
  app.use((req, res, next) => {
    const origin = req.headers.origin || 'unknown-origin';
    console.log('Origin:', origin);
    next();
  });

  // Sécurité HTTP headers
  app.use(helmet());

  // CORS pour le front Angular en dev
  app.use(cors({
    origin: 'http://localhost:4200',
    credentials: true
  }));
};

module.exports = globalMiddleware;