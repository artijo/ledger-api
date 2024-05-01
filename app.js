const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

//Import routes
const router = require('./routes');

//dotenv
require('dotenv').config();

//Configure app to use body-parser and cors and json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

console.log(process.env.MONGO_URI);

//Connect to database
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Database connected');
    } catch (err) {
        console.log(err);
    }
}
//Use routes
app.use('/', router.app);

const port = process.env.PORT || 4000;
app.listen(port, () => {
    connectDB();
    console.log(`Server running on port ${port}`);
});
