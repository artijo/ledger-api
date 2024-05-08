const jwt = require('jsonwebtoken');
const User = require('../Models/User');

async function loginwithgoogle(req, res) {
    const user = await User.findOne({email: req.body.email});
    console.log(user);
    if (!user) {
        // const newUser = new User(req.body);
        // newUser.save();
        return res.status(400).json({status:"error",error:"User doesn't exist"});
    }
        const token = jwt.sign({email: req.body.email}, process.env.TOKEN_SECRET);
        res.json({status:"ok",token: token});
    
}

module.exports = {
    loginwithgoogle
};