const router = require('express').Router()
const { userValidation } = require('../functions/validation');


router.post('/register', async (req, res) => {
    
    const {error} = await userValidation(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    res.send("You want to create a user")
})


module.exports = router;