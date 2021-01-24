const mongoose = require('mongoose');

const opportunitySchema = mongoose.Schema({
    name: { type: String, required: true },
    url: { type: String, required: true },
    classification: { type: String, required: true },
    participants: String,
    major: String,
    deadline: Date
})



module.exports = mongoose.model("Opportunity", opportunitySchema)
