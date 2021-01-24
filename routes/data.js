const router = require('express').Router()
const Workshop = require('../models/Workshop')
const Opportunity = require('../models/Opportunity')
const { workshopValidation,opportunityValidation } = require('../functions/validation')
const fetch = require('node-fetch')

router.post('/workshop', async (req, res) => {

    //Making sure that we are getting valid data
    const { error } = workshopValidation(req.body)
    if (error) return res.status(400).send(error)

    //Making sure we don't have dupicates
    const urlExists = await Workshop.findOne({ video_url: req.body.video_url })
    if (urlExists) return res.status(400).send("Workshop already exists")

    //Save Workshop
    try {
        const workshop = new Workshop({
            name: req.body.name,
            video_url: req.body.video_url,
            description: req.body.description,
            startDate: req.body.startDate,
            endDate: req.body.endDate
        })
        const savedWorkshop = await workshop.save()
        res.status(200).send(savedWorkshop)

    } catch (err) {
        res.status(400).send(err)
    }

})

router.post('/opportunity', async (req, res) => {

    //Making sure that we are getting valid data
    const { error } = opportunityValidation(req.body)
    if (error) return res.status(400).send(error)

    //Making sure we don't have dupicates
    const urlExists = await Opportunity.findOne({ url: req.body.url })
    if (urlExists) return res.status(400).send("Opportunity already exists")

    //Making sure url that was sent is real
    const urlResponse = await fetch(req.body.url)
    try {
        if(urlResponse.status != 200) return res.status(404).send("URL was not found")
        const opportunity = new Opportunity({
            name: req.body.name,
            url: req.body.url,
            participants: req.body.participants,
            major: req.body.major,
            deadline: req.body.deadline
        })
        const savedOpportunity = await opportunity.save()
        res.status(200).send(savedOpportunity)
    } catch (err) {
        return res.status(400).send("SOMETHING  BAD HAPPEND")
        
    }


    //Save Workshop
    try {
        const opportunity = new Opportunity({
            name: req.body.name,
            url: req.body.url,
            participants: req.body.participants,
            major: req.body.major,
            deadline: req.body.deadline
        })
        const savedOpportunity = await opportunity.save()
        res.status(200).send(savedOpportunity)

    } catch (err) {
        res.status(400).send(err)
    }

})



module.exports = router