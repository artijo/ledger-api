const e = require('express');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const ledgerSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    amount: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: ['income', 'expense'],
    },
    date: {
        type: Date,
        default: Date.now
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Ledger', ledgerSchema);