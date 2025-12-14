const cors = require('cors');
const helmet = require('helmet');

const globalMiddleware = (app) => {

    app.use(
        () => {console.log(origine)}
    )

    app.use(helmet());
    app.use(cors({
        origin : 'http://localhost:4200'
    }));
};

module.exports = globalMiddleware;