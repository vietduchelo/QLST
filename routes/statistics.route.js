var router = require('express').Router();
var statisticsController = require('./../controller/statistics.controller');

module.exports = function () {
    router.get('/', statisticsController.getAllStatistics);
    router.get('/:id', statisticsController.getStatisticsById);
    router.put('/:id', statisticsController.updateStatistics);
    router.delete('/:id', statisticsController.deleteStatisticsById);
    router.post('/', statisticsController.createStatistics);
    return router;
}