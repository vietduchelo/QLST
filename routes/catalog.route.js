var router = require('express').Router();
var catalogController = require('./../controller/catalog.controller');
module.exports = function () {
    router.get('/', catalogController.getAllCatalog);
    router.get('/:id', catalogController.getCatalogById);
    router.put('/:id', catalogController.updateCatalog);
    router.delete('/:id', catalogController.deleteCatalogById);
    router.post('/', catalogController.createCatalog);
    return router;
}