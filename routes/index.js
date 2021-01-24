const MainRouter = require('express').Router();

MainRouter.use('/opportunities',require('../controllers/opportunityController'))
MainRouter.use('/workshops',require('../controllers/workshopController'))
MainRouter.use('/auth',require('./authRoutes/auth'))

module.exports = MainRouter;