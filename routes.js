const express = require('express');
const app = express();

//Import routes
const userRouter = require('./Routes/user');
const authRoter = require('./Routes/auth');
const ledgerRouter = require('./Routes/ledger');

app.get('/ping', (req, res) => {
    res.json({message: 'pong'});
});

//Use routes
app.use(userRouter.router);
app.use(authRoter.router);
app.use(ledgerRouter.router);

//export app other name
module.exports = {
    app
};
