var router = require('express').Router();
var cartController = require('./../controller/cart.controller');
module.exports = function () {
    router.get('/', cartController.getAllCart);
    router.get('/:id', cartController.getCartById);
    router.put('/:id', cartController.updateCart);
    router.delete('/:id', cartController.deleteCartById);
    router.post('/', cartController.createCart);
    return router;
}