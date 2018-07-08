var connection = require('./../db/index');
module.exports = {
    createStatistics:createStatistics,
    updateStatistics:updateStatistics,
}

function createStatistics(req) {
    return new Promise((resolve, reject) => {
        var records = [null, req.totalPrice, req.userCreate, new Date(), new Date(), req.idstatistics]
        connection.query("INSERT INTO carts(id,totalPrice, userCreate,createAt,updateAt,idstatistics) VALUES (?)", [records], function (err, result) {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    })
}

function updateStatistics(id, req) {

    return new Promise((resolve, reject) => {
        connection.query('SELECT  FROM carts WHERE id='+id,function(err,response){
            console.log(response[0].id);
            
            if(err){
                reject(err);
            }else{
                if(response){
                    var NewData={
                        totalPrice: req.totalPrice || response[0].totalPrice,
                        userCreate: req.userCreate || response[0].userCreate,
                        idstatistics: req.idstatistics || response[0].idstatistics,
                        updateAt: req.updateAt

                    }
                    connection.query('UPDATE `carts` SET `totalPrice`=' + NewData.totalPrice + ', `userCreate`=' + NewData.userCreate + ',`updateAt`=' + NewData.updateAt + ',`idstatistics`=' + NewData.idstatistics + ' WHERE id=' + id, function (err, result) {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(result);
                        }
                    });
                }else{
                    reject({
                        statusCode:1212
                    });
                }
            }
        })
       
    })
}