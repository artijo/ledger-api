const mongoose = require('mongoose');
const Ledger = require('./Ledger');
const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        required: true,
        default: 'user'
    },
    amount: {
        type: Number,
        default: 0
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    Ledger: [{
        type: Schema.Types.ObjectId,
        ref: 'Ledger'
    }]
});

module.exports = mongoose.model('User', userSchema);