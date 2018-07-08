var connection = require('./../db/index');
var mesage= require('./../utils/message');
module.exports = {

    createCatalog:createCatalog,
    updateCatalog:updateCatalog,
}

function createCatalog(req) {
    return new Promise((resolve, reject) => {
        var records = [null, req.name,req.userCreate,new Date()]
        connection.query("INSERT INTO catalogs(id,name,userCreate,createAt) VALUES (?)", [records], function (err, result) {
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

function updateCatalog(id, req) {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM catalogs WHERE id='+id,function(err,response){
            if(err){
                reject(err);
            }else{
                if(response){
                    var NewData={
                        name: req.name || response[0].name,
                    }
                    connection.query('UPDATE `carts` SET `totalPrice`="' + NewData.name+'" WHERE id=' + id, function (err, result) {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(result);
                        }
                    });
                }
            }
        })
       
    })
}