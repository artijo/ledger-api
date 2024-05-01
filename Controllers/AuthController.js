const jwt = require('jsonwebtoken');
const User = require('../Models/User');

function loginwithgoogle(req, res) {
    const user = User.findOne({email: req.body.email});
    if (!user) {
        const newUser = new User(req.body);
        newUser.save();
    }
    const token = jwt.sign({email: req.body.email}, process.env.TOKEN_SECRET);
    res.json({status:"ok",token: token});
}

module.exports = {
    loginwithgoogle
};