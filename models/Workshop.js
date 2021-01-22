const mongoose = require('mongoose');

const workshopSchema = mongoose.Schema({
    name: { type: String, required: true },
    url: { type: String, required: true },
    description:{type:String,required:true},
    startDate: Date,
    endDate: Date
})

module.exports = mongoose.model("Workshop",workshopSchema)