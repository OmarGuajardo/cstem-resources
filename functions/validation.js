const Joi = require('@hapi/joi');
const { model } = require('mongoose');

//Workshop Validation
const workshopValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        video_url: Joi.string().uri().required(),
        description: Joi.string(),
        startDate: Joi.date(),
        endDate: Joi.date()
    })

    return schema.validate(data)
}

//Opportunity Validation
const opportunityValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        url: Joi.string().uri().required(),
        classification: Joi.string().required(),
        participants: Joi.string(),
        major: Joi.string(),
        deadline: Joi.date(),
    })

    return schema.validate(data)

}


module.exports.workshopValidation = workshopValidation
module.exports.opportunityValidation = opportunityValidation