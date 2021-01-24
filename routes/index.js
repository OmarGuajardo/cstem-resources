const MainRouter = require('express').Router();

MainRouter.use('/opportunity',require('../controllers/opportunityController'))
MainRouter.use('/workshop',require('../controllers/workshopController'))

module.exports = MainRouter;