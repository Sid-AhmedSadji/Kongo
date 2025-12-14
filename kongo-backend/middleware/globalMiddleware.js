const cors = require('cors');
const helmet = require('helmet');

const globalMiddleWare = (app) => {
    console.log(req.method, req.url);

    app.use(
        () => {console.log(origine)}
    )

    app.use(helmet());
    app.use(cors({
        origin : 'http://localhost:4200'
    })
    )
    next();
};

module.exports = globalMiddleWare;