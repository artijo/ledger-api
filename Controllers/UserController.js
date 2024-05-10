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
const create = async (req, res) => {
    try{
        let user = new User(req.body);
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        res.json({message: error.message}).status(500);
    }
}
const update = async (req, res) => {
    try{
        let user = await User.findOneAndUpdate({email: req.params.email}, req.body, {new: true});
        res.json(user);
    }catch (error) {
        res.json({message: error.message}).status(500);
    }
}
const remove = async (req, res) => {
    try{
        let user = await User.findOneAndDelete({email: req.params.email});
        res.json(user);
    }
    catch (error) {
        res.json({message: error.message}).status(500);
    }
}

module.exports = {
    getall,
    getbyemail,
    create,
    update,
    remove
}