const express = require('express');
const app = express();

//Import routes
const testrouter = require('./Routes/test');
const userRouter = require('./Routes/user');


//Use routes
app.use(testrouter.router);
app.use(userRouter.router);

//export app other name
module.exports = {
    app
};
