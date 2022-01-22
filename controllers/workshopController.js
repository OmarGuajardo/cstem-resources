const workshopController = require('express').Router()
const {workshopValidation} = require('../functions/validation')
const Workshop = require('../models/Workshop')


// @route POST api/workshop
// @dessc Create Workshop
// @access AUTH 
workshopController.post('/', async (req, res) => {

    //Making sure that we are getting valid data
    const { error } = workshopValidation(req.body)
    if (error) return res.status(400).send(error)

    //Making sure we don't have duplicates
    const urlExists = await Workshop.findOne({ video_url: req.body.video_url })
    if (urlExists) return res.status(400).send("Workshop already exists")

    //Save Workshop
    try {
        const workshop = new Workshop({
            name: req.body.name,
            video_url: req.body.video_url,
            banner_url: req.body.banner_url,
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

// @route GET api/opportunity
// @dessc Get Specific Opportunity or All Opportunities
// @access PUBLIC 

//TODO: Implement Pagination
workshopController.get('/', async (req, res) => {

    try {
        const workshopAll = await Workshop.find();
        res.status(200).send(workshopAll)
    } catch (err) {
        res.status(400).send(err)
    }

})

// @route DELETE api/opportunity
// @dessc Delete Opportunity
// @access AUTH 
workshopController.delete('/:id', async (req, res) => {

    try {
        const workshop = await Workshop.deleteOne({ _id: req.params.id })
        res.status(200).send("Workshop deleted.")
    } catch (err) {
        res.status(400).send("Couldn't delete workshop")
    }


})


// @route UPDATE api/opportunity
// @dessc UPDATE Opportunity
// @access AUTH 
workshopController.patch('/:id', async (req, res) => {

    try {
        const workshop = await Workshop.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new:true}
        )
        res.status(200).send(workshop)    
    } catch (error) {
        res.status(400).send(error)
    }
})


module.exports = workshopController