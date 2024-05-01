const jwt = require('jsonwebtoken');
const User = require('../Models/User');

async function checkAuth(req, res, next) {
    const token = req.header('Authorization').split(' ')[1];
    if (!token) return res.status(401).json({message: 'Access Denied'});
    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        const user = await User.findOne({email: verified.email});
        if (!user) return res.status(400).json({message: 'Invalid Token'});
        req.user = user;
        next();
    } catch (error) {
        res.status(400).json({message: 'Invalid Token'});
    }
}

module.exports = {
    checkAuth
};