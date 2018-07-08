var connection = require('./../db/index');
var mesage= require('./../utils/message');
module.exports = {
    createCompany:createCompany,
    updateCompany:updateCompany,
}
function createCompany(req) {
    return new Promise((resolve, reject) => {
        var records = [null, req.name, req.logo,req.address, req.phone, new Date()]
        connection.query("INSERT INTO Companys (id,name, logo,address,phone,createAt) VALUES (?)", [records], function (err, result) {
            if (err) {
                reject(err);
            } else {
                if (result.insertId) {
                    resolve({
                        mesage: mesage.GENERIC.CREATED,
                        statusCode: mesage.GENERICSTATUS.CREATED
                    })
                } else {
                    reject({
                        mesage: mesage.GENERIC.CREATE_ERROR,
                        statusCode: mesage.GENERICSTATUS.ERROR
                    })
                }
            }
        });
    })
}
function updateCompany(id, req) {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM Companys WHERE id='+id,function(err,response){
            if(err){
                reject(err);
            }else{
                if(response){
                    var NewData={
                        name: req.name || response[0].name,
                        logo: req.logo || response[0].logo,
                        address: req.address || response[0].address
                    }
                    connection.query('UPDATE `Companys` SET `name`="' + NewData.name + '", `logo`="' + NewData.logo + '",`address`="' + NewData.address +'" WHERE id=' + id, function (err, result) {
                        if (err) {
                            reject(err);
                        } else {
                            if(result.changedRows){
                                resolve({
                                    mesage: mesage.GENERIC.UPDATED,
                                    statusCode: mesage.GENERICSTATUS.UPDATED
                                });
                            }else{
                                reject({
                                    mesage: mesage.GENERIC.UPDATE_ERROR,
                                    statusCode: mesage.GENERICSTATUS.UPDATE_ERROR
                                });
                            }
                        }
                    });
                }
            }
        })
       
    })
}