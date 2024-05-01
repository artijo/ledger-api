// Description: User Controller.
const User = require('../Models/User');

const getall = async (req, res) => {
    try{
        let users = await User.find({});
        res.json(users);
    } catch (error) {
        res.json({message: error.message}).status(500);
    }
}
const getbyemail = async (req, res) => {
    try{
        let user = await User.findOne({email: req.params.email});
        res.json(user);
    }
    catch (error) {
        res.json({message: error.message}).status(500);
    }
}

module.exports = {
    getall,
    getbyemail
}