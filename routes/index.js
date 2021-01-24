const MainRouter = require('express').Router();

MainRouter.use('/opportunity',require('../controllers/opportunityController'))
MainRouter.use('/workshop',require('../controllers/workshopController'))
MainRouter.use('/auth',require('./authRoutes/auth'))

module.exports = MainRouter;