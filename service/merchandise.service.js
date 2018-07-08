var connection = require('./../db/index');
var genericService = require('./../service/generic.service');
module.exports = {
    createMerchandise: createMerchandise,
    updateMerchandise: updateMerchandise,
    getAllMerchandise: getAllMerchandise,
    getMerchandiseById:getMerchandiseById
}
function getAllMerchandise() {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM merchandises', function (err, response) {
            if (err) {
                reject(err)
            } else {
                var res = [];
                response.forEach(item => {
                    connection.query('SELECT * FROM merchandisedetails WHERE idMerchandise=' + item.id, function (err, details) {
                        if (err) {
                            reject(err);
                        } else {
                            item.MerchandiseDetail = details;
                            res.push(item);
                            if (response.length === res.length) {
                                resolve(res);
                            }
                        }
                    });
                });
            }
        });
    });
}
function getMerchandiseById(id) {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM carts  merchandises id=' + id, function (err, response) {
            if (err) {
                reject(err)
            } else {
                var data = response[0];
                connection.query('SELECT * FROM merchandisedetails WHERE idMerchandise=' + id, function (err, details) {
                    if (err) {
                        reject(err);
                    } else {
                        data.Merchandise = details;
                        resolve(data)
                    }
                })
            }
        })
    })

}
function createMerchandise(req) {
    return new Promise((resolve, reject) => {
        var records = [null, req.idcompany, req.discount, req.userMerchandise,new Date()]
        connection.query("INSERT INTO merchandises(id,idcompany, discount,userMerchandise,createAt) VALUES (?)", [records], function (err, result) {
            if (err) {
                reject(err);
            } else {
                if (result.insertId) {
                    req.Product.forEach(element => {
                        genericService.getById(element.id, 'products').then((product) => {
                            var records = [null, element.id, product.name, element.quantity, product.price, product.price * element.quantity, result.insertId]
                            connection.query("INSERT INTO merchandiseDetails(id,idProduct,nameProduct,quantity,price,totalPrice,idMerchandise) VALUES (?)", [records], function (err, cartdetail) {
                                if (err) {
                                    reject(err)
                                }
                            });
                        });
                    });
                    connection.query('SELECT * FROM merchandises WHERE id=' + result.insertId, function (err, merchandises) {
                        if (err) {
                            reject(err)
                        } else {
                            connection.query('SELECT * FROM merchandiseDetails where idMerchandise=' + result.insertId, function (err, response) {
                                if (err) {
                                    reject(err)
                                } else {
                                    if (response) {
                                        connection.query('SELECT SUM(totalPrice) as totalPrice  FROM merchandiseDetails WHERE idMerchandise=' + result.insertId, function (err, totalPrice) {
                                            if (err) {
                                                reject(err)
                                            } else {
                                                var ob = {
                                                    id: merchandises[0].id,
                                                    idcompany:merchandises[0].idcompany,
                                                    discount:merchandises[0].discount,
                                                    totalPrice: merchandises[0].totalPrice,
                                                    userMerchandise:merchandises[0].userMerchandise,
                                                    createAt:merchandises[0].createAt,
                                                    product: response
                                                }
                                                resolve(ob);
                                                setTotalPriceCart(totalPrice[0].totalPrice, result.insertId);
                                            }
                                        })
                                    }
                                }
                            })
                        }
                    })
                }
                else {
                    reject({
                        statusCode: mesage.STATUS_CODE.ERROR,
                        mesage: mesage.ERROR_MESSAGE.CART.CART_ERROR
                    })
                }
            }
        });

    })
}
function updateMerchandise(id, req) {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM carts WHERE id=' + id, function (err, response) {
            if (err) {
                reject(err);
            } else {
                if (response) {
                    var NewData = {
                        totalPrice: req.totalPrice || response[0].totalPrice,
                        userCreate: req.userCreate || response[0].userCreate,
                        idstatistics: req.idstatistics || response[0].idstatistics,
                    }
                    connection.query('UPDATE `carts` SET `totalPrice`=' + NewData.totalPrice + ', `userCreate`=' + NewData.userCreate + ',`idstatistics`=' + NewData.idstatistics + ' WHERE id=' + id, function (err, result) {
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

function setTotalPriceCart(totalPrice, id) {
    connection.query('UPDATE merchandises set totalPrice=' + totalPrice + ' WHERE id=' + id,function(err,response){
        console.log(response);
        
    })
}