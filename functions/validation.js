const Joi = require('@hapi/joi');

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
        deadline: Joi.string(),
    })
    return schema.validate(data)

}

//User Validation
const userValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        
    })

    return schema.validate(data)
}
//Login Validation
const loginValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        
    })

    return schema.validate(data)
}


module.exports.workshopValidation = workshopValidation
module.exports.opportunityValidation = opportunityValidation
module.exports.userValidation = userValidation
module.exports.loginValidation = loginValidation