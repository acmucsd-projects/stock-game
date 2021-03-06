const mongoose = require('mongoose');
const PredictionSchema = new mongoose.Schema(
    {
        ticker_d: {
            type: String,
            required: true
        },
        length_d: {
            type: Number,
            required: true
        },
        predictedPrice_d: {
            type: Number,
            required: true
        }, 
        initialPrice_d: {
            type: Number,
            required: true
        },
        time_d: {
            type: Number,
            required: true
        },
        googleId_d: {
            type: String,
            required: true
        },
        finalPrice_d: { //finalPrice should be calculated when user logs in
            type: Number,
            required: false
        }
    }
)
const Prediction = mongoose.model('Prediction', PredictionSchema);

module.exports = Prediction;