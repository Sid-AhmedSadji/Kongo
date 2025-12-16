const jsw = require('jsonwebtoken');

const Auth = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jsw.verify(token, process.env.JWT_SECRET);
        const userId = decodedToken.userId;
        if ( req.body.userId && req.body.userId !== userId) {
            throw 'Invalid user ID';
        }
        else if ( req.params.id && req.params.id !== userId ) {
            throw 'Invalid user ID';
        } 
        else if( !req.params.id && !req.body.userId ) {
            throw 'Invalid user ID';
        }else {
            next();
        }
    } catch (error) {
        console.log(error);
        res.status(401).json({ error });
    }
};

module.exports = Auth;
