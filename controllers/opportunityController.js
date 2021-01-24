const opportunityController = require('express').Router()
const { opportunityValidation } = require('../functions/validation')
const Opportunity = require('../models/Opportunity')
const fetch = require('node-fetch')


// @route GET api/opportunity
// @dessc Get Specific Opportunity or All Opportunities
// @access PUBLIC 

//TODO: Implement Pagination
opportunityController.get('/', async (req, res) => {
    const { c } = req.query;
    if (c) {
        try {
            const specificOpportunity = await Opportunity.find({ classification: c })
            res.status(200).send(specificOpportunity)
        } catch (err) {
            res.status(400).send(err)
        }
    }
    else {
        try {
            const opportunityAll = await Opportunity.find();
            res.status(200).send(opportunityAll)
        } catch (err) {
            res.status(400).send(err)
        }
    }




})

// @route DELETE api/opportunity
// @dessc Delete Opportunity
// @access AUTH 
opportunityController.delete('/:id', async (req, res) => {

    try {
        const opportunity = await Opportunity.deleteOne({ _id: req.params.id })
        res.status(200).send("Opportunity deleted.")
    } catch (err) {
        res.status(400).send("Couldn't delete opportunity")
    }


})


// @route UPDATE api/opportunity
// @dessc UPDATE Opportunity
// @access AUTH 
opportunityController.patch('/:id', async (req, res) => {

    try {
        const opportunity = await Opportunity.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new:true}
        )
        res.status(200).send(opportunity)    
    } catch (error) {
        res.status(400).send(error)
    }
})


// @route POST api/opportunity
// @dessc Create Opportunity
// @access PUBLIC 
opportunityController.post('/', async (req, res) => {

    //Making sure that we are getting valid data
    const { error } = opportunityValidation(req.body)
    if (error) return res.status(400).send(error)

    //Making sure we don't have dupicates
    const urlExists = await Opportunity.findOne({ url: req.body.url })
    if (urlExists) return res.status(400).send("Opportunity already exists")

    //Making sure url that was sent is real
    const urlResponse = await fetch(req.body.url)
    try {
        if (urlResponse.status != 200) return res.status(404).send("URL was not found")
        const opportunity = new Opportunity({
            name: req.body.name,
            url: req.body.url,
            participants: req.body.participants,
            classification: req.body.classification,
            major: req.body.major,
            deadline: req.body.deadline
        })
        const savedOpportunity = await opportunity.save()
        res.status(200).send(savedOpportunity)
    } catch (err) {
        return res.status(400).send("SOMETHING  BAD HAPPEND")

    }


})

module.exports = opportunityController