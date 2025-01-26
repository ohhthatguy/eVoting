const mongoose = require("mongoose")

const candidateSchema =  mongoose.Schema({ // Use mongoose.Schema
    name: { type: String, required: true},
    partyName: { type: String, required: true},
    partyLogo: { type: String, required: true},
    profile: { type: String, required: true},
    vote: { type: String, required: true },
});

const electionSchema =  mongoose.Schema({ // Use mongoose.Schema
    electionTitle: { type: String, required: true},
    candidate: [candidateSchema],
    createdBy: {type: String, required: true},
    adminCitizenshipNum: {type:String, required: true}

});

const electionModel = mongoose.model('election', electionSchema)
module.exports = electionModel

