var genericService = require('./../service/generic.service');
var catalogDetail = require('./../service/catalog.service');
module.exports = {
    getAllCatalog: getAllCatalog,
    createCatalog: createCatalog,
    updateCatalog: updateCatalog,
    getCatalogById: getCatalogById,
    deleteCatalogById: deleteCatalogById
}
var Model = 'catalogs'
function getAllCatalog(req, res) {
    if (Object.keys(req.query).length>0) {
        genericService.getAllByValue(req.query, Model).then((Response) => {
            res.send(Response);
        }).catch((err) => {
            res.send(err);
        })
    } else {
        genericService.getAll(Model).then((Response) => {
            res.send(Response);
        }).catch((err) => {
            res.send(err);
        })
    }
}
function getCatalogById(req, res) {
    genericService.getById(req.params.id, Model).then((Response) => {
        res.send(Response);
    }).catch((err) => {
        res.send(err);
    })
}
function deleteCatalogById(req, res) {
    genericService.deleteById(req.params.id, Model).then((Response) => {
        res.send(Response);
    }).catch((err) => {
        res.send(err);
    })
}
function createCatalog(req, res) {
    catalogDetail.createCatalog(req.body).then((Response) => {
        res.send(Response);
    }).catch((err) => {
        res.send(err);
    })
}
function updateCatalog(req, res) {
    
    catalogDetail.updateCatalog(req.params.id,req.body).then((Response) => {
        res.send(Response);
    }).catch((err) => {
        res.send(err);
    })
}