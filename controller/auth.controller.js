var userService = require('./../service/auth.service');
var authController = require('./../service/auth.service')
var config = require('./../config');
module.exports = {
    login: login,
    getUserByToken: getUserByToken
}
function login(req, res) {
   authController.login(req.body).then((response)=>{
       res.send(response);
   }).catch((err)=>{
       res.send(err);
   })
}
function getUserByToken(req, res) {
    var token = req.headers[config.TOKEN];
    userService.getUserByToken(token).then(function (response) {
        res.send(response);
    })
        .catch(function (err) {
            res.send(err);
        });
}