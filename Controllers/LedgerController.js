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
    const type = req.query.type;
    try {
        if (type == 'income' || type == 'expense') {
            let data = await Ledger.find({ user: req.user._id, type });
            res.json(data);
            return;
        }
        let user = await User.findById(req.user._id).populate('Ledger');
        res.json(user.Ledger);
    }
    catch (error) {
        res.json({ message: error.message }).status(500);
    }
}

const overview = async (req, res) => {
    try {
        let user = await User.findById(req.user._id).populate('Ledger');
        let income = 0;
        let expense = 0;
        user.Ledger.forEach(ledger => {
            if (ledger.type === 'income') {
                income += ledger.amount;
            }
            else {
                expense += ledger.amount;
            }
        });
        //today expense
        let today = new Date();
        let todayexpense = 0;
        user.Ledger.forEach(ledger => {
            if (ledger.type === 'expense') {
                if (ledger.date.getDate() === today.getDate() &&
                    ledger.date.getMonth() === today.getMonth() &&
                    ledger.date.getFullYear() === today.getFullYear()) {
                    todayexpense += ledger.amount;
                }
            }
        });
        //this month expense
        let thismonth = new Date();
        let thismonthexpense = 0;
        user.Ledger.forEach(ledger => {
            if (ledger.type === 'expense') {
                if (ledger.date.getMonth() === thismonth.getMonth() &&
                    ledger.date.getFullYear() === thismonth.getFullYear()) {
                    thismonthexpense += ledger.amount;
                }
            }
        });

        res.json({ income, expense, todayexpense, thismonthexpense });

    }
    catch (error) {
        res.json({ message: error.message }).status(500);
    }
}

module.exports = {
    newLedger,
    getbyuser,
    overview
}