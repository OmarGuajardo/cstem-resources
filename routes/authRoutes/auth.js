const router = require('express').Router()
const { userValidation } = require(appRoot + "/functions/validation");
const User = require( appRoot + "/models/User")
const bcrypt = require('bcryptjs');


router.post('/register', async (req, res) => {

    const { error } = await userValidation(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    const userExists = await User.findOne({email:req.body.email})
    if(userExists) return res.status(400).send("Email already exists")

    //Hashing passwords
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    try {
        const user = new User({
            name: req.body.name,
            email:req.body.email,
            password:hashedPassword
        })
        const savedUser = await user.save()
        res.status(200).send(savedUser)
    } catch (err) {
        res.status(400).send("User couldn't be saved")
    }

})


module.exports = router;