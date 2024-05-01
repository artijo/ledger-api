const Ledger = require('../Models/Ledger');
const User = require('../Models/User');

const newLedger = async (req, res) => {
    let { title, description, amount, type } = req.body;
    amount = parseFloat(amount);
    try {
        let ledger = new Ledger({ title, description, amount, type, user: req.user._id });
        await ledger.save();
        let user = await User.findById(req.user._id);
        user.amount = type === 'income' ? user.amount + amount : user.amount - amount;
        await user.save();
        //add the ledger to the user
        let userledgers = [
            ...user.Ledger,
            ledger._id
        ];
        user.Ledger = userledgers;
        await user.save();
        res.json(ledger);
    }
    catch (error) {
        res.json({ message: error.message }).status(500);
    }
}

const getbyuser = async (req, res) => {
    try {
        let user = await User.findById(req.user._id).populate('Ledger');
        res.json(user.Ledger);
    }
    catch (error) {
        res.json({ message: error.message }).status(500);
    }
}

module.exports = {
    newLedger,
    getbyuser
}