var router = require('express').Router();
var companyController = require('./../controller/company.controller');
module.exports = function () {
    router.get('/', companyController.getAllCompany);
    router.get('/:id', companyController.getCompanyById);
    router.put('/:id', companyController.updateCompany);
    router.delete('/:id', companyController.deleteCompanyById);
    router.post('/', companyController.createCompany);
    return router;
}