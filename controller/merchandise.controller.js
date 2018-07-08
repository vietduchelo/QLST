var genericService = require('./../service/generic.service');
var merchandiseController = require('./../service/merchandise.service');
module.exports = {
    getAllMerchandise: getAllMerchandise,
    createMerchandise: createMerchandise,
    updateMerchandise: updateMerchandise,
    getMerchandiseById: getMerchandiseById,
    deleteMerchandiseById: deleteMerchandiseById
}
var Model = 'merchandises'
function getAllMerchandise(req, res) {
    merchandiseController.getAllMerchandise().then((Response) => {
        res.send(Response);
    }).catch((err) => {
        res.send(err);
    })
}
function getMerchandiseById(req, res) {
    genericService.getById(req.params.id, Model).then((Response) => {
        res.send(Response);
    }).catch((err) => {
        res.send(err);
    })
}
function deleteMerchandiseById(req, res) {
    genericService.deleteById(req.params.id, Model).then((Response) => {
        res.send(Response);
    }).catch((err) => {
        res.send(err);
    })
}
function createMerchandise(req, res) {
    merchandiseController.createMerchandise(req.body).then((Response) => {
        res.send(Response);
    }).catch((err) => {
        res.send(err);
    })
}
function updateMerchandise(req, res) {
    merchandiseController.updateMerchandise(req.body).then((Response) => {
        res.send(Response);
    }).catch((err) => {
        res.send(err);
    })
}