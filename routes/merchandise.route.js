var router = require('express').Router();
var merchandiseController = require('./../controller/merchandise.controller');

module.exports = function () {
    router.get('/', merchandiseController.getAllMerchandise);
    router.get('/:id', merchandiseController.getMerchandiseById);
    router.put('/:id', merchandiseController.updateMerchandise);
    router.delete('/:id', merchandiseController.deleteMerchandiseById);
    router.post('/', merchandiseController.createMerchandise);
    return router;
}