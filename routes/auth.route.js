var router = require('express').Router();
var authController = require('./../controller/auth.controller');

module.exports = function () {
    router.post('/login',authController.login);
    router.get('/getuserbytoken', authController.getUserByToken)    
    return router;
}