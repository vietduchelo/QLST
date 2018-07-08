var genericService = require('./../service/generic.service');
var companyController = require('./../service/company.service')
module.exports = {
    getAllCompany: getAllCompany,
    createCompany: createCompany,
    updateCompany: updateCompany,
    getCompanyById: getCompanyById,
    deleteCompanyById: deleteCompanyById
}
var Model = 'companys'
function getAllCompany(req, res) {
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
function getCompanyById(req, res) {
    genericService.getById(req.params.id, Model).then((Response) => {
        res.send(Response);
    }).catch((err) => {
        res.send(err);
    })
}
function deleteCompanyById(req, res) {
    genericService.deleteById(req.params.id, Model).then((Response) => {
        res.send(Response);
    }).catch((err) => {
        res.send(err);
    })
}
function createCompany(req, res) {
    companyController.createCompany(req.body).then((Response) => {
        res.send(Response);
    }).catch((err) => {
        res.send(err);
    })
}
function updateCompany(req,res) {
    companyController.updateCompany(req.params.id, req.body).then((Response) => {
        res.send(Response);
    }).catch((err) => {
        res.send(err);
    })
}