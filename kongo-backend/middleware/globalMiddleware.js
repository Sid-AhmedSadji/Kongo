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
  app.use(cors({
    origin: 'http://localhost:4200',
    credentials: true
  }));
};

module.exports = globalMiddleware;