var router = require('express').Router();
var productController = require('./../controller/product.controller');
module.exports = function () {
    router.get('/', productController.getAllProduct);
    router.get('/:id', productController.getProductById);
    router.put('/:id', productController.updateProduct);
    router.delete('/:id', productController.deleteProductById);
    router.post('/', productController.createProduct);
    return router;
}