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
  console.log("Global middleware chargé !");
  console.log(process.env.ALLOWED_ORIGINS);
  // CORS pour le front Angular en dev
  const allowedOrigins = process.env.ALLOWED_ORIGINS.split(',');
  app.use(cors({
    origin: (origin, callback) => {
      console.log(origin);
      console.log(allowedOrigins);
      if (allowedOrigins.includes(origin)) {
        callback(null, true); // origin autorisée
      } else {
        callback(new Error('Origin non autorisée')); // origin manquante ou non autorisée
      }
    },
    credentials: true
  }));

}
module.exports = globalMiddleware;