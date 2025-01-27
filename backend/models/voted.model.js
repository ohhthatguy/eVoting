const mongoose = require('mongoose')

const votedSchema = mongoose.Schema({
    votedElection: {
        type: [String],
        required: true
    },

    voter: {
        type: String, //citizennum
        required: true
    },
    
});

const votedModel = mongoose.model('voted', votedSchema);

module.exports = votedModel