var genericService = require('./../service/generic.service');
var merchandiseDetailsController = require('./../service/merchandisedetail.service')
module.exports = {
    getAllMerchandiseDetail: getAllMerchandiseDetail,
    createMerchandiseDetail: createMerchandiseDetail,
    updateMerchandiseDetail: updateMerchandiseDetail,
    getMerchandiseDetailById: getMerchandiseDetailById,
    deleteMerchandiseDetailById: deleteMerchandiseDetailById
}
var Model = 'merchandisedetails'
function getAllMerchandiseDetail(req, res) {
    if(Object.keys(req.query).length>0){
        genericService.getAllByValue(req.query,Model).then((Response) => {
            res.send(Response);
        }).catch((err) => {
            res.send(err);
        })
    }else{
        genericService.getAll(Model).then((Response) => {
            res.send(Response);
        }).catch((err) => {
            res.send(err);
        })
    }
}
function getMerchandiseDetailById(req, res) {
    genericService.getById(req.params.id, Model).then((Response) => {
        res.send(Response);
    }).catch((err) => {
        res.send(err);
    });
}
function deleteMerchandiseDetailById(req, res) {
    genericService.deleteById(req.params.id, Model).then((Response) => {
        res.send(Response);
    }).catch((err) => {
        res.send(err);
    });
}
function createMerchandiseDetail(req,res) {
    merchandiseDetailsController.createMerchandisedetail(req.body).then((Response) => {
        res.send(Response);
    }).catch((err) => {
        res.send(err);
    });
}
function updateMerchandiseDetail() {
    merchandiseDetailsController.updateMerchandisedetail(req.body).then((Response) => {
        res.send(Response);
    }).catch((err) => {
        res.send(err);
    });
}