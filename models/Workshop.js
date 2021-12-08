const mongoose = require('mongoose');

const workshopSchema = mongoose.Schema({
    name: { type: String, required: true },
    video_url: { type: String, required: true },
    banner_url: { type: String, requred: true },
    description:{type:String,required:true},
    startDate: Date,
    endDate: Date
})

module.exports = mongoose.model("Workshop",workshopSchema)