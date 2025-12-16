const cors = require('cors');
const helmet = require('helmet');

const globalMiddleware = (app) => {

  // Log de l'origine de la requête
  app.use((req, res, next) => {
    const origin = req.headers.origin || 'unknown-origin';
    console.log('Origin:', origin);
    console.log(`${req.method} ${req.url}`);
    next();
  });

  // Sécurité HTTP headers
  app.use(helmet());

  // CORS pour le front Angular en dev
const allowedOrigins = ['http://localhost:4200', 'http://192.158.50.20:4200'];
app.use(cors({
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin)) {
      callback(null, true); // origin autorisée
    } else {
      callback(new Error('Origin non autorisée')); // origin manquante ou non autorisée
    }
  },
  credentials: true
}));


module.exports = globalMiddleware;