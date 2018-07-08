var connection = require('./../db/index');
var genericService = require('./generic.service');
var mesage = require('./../utils/message');
module.exports = {
    createCart: createCart,
    updateCart: updateCart,
    getcartById: getcartById,
    getAllcart: getAllcart
}
function getAllcart() {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM carts', function (err, response) {
            if (err) {
                reject(err)
            } else { 
                var res=[];
                response.forEach(item => {
                    connection.query('SELECT * FROM cartdetails WHERE idCart=' + item.id, function (err, details) {
                        if (err) {
                            reject(err);
                        } else {
                            item.idProduct = details;
                             res.push(item);
                             if(response.length === res.length){
                                 resolve(res);
                             }
                        }
                    });
                });
            }
        });
    });
}
function getcartById(id) {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM carts  WHERE id=' + id, function (err, response) {
            if (err) {
                reject(err)
            } else {
                var data = response[0];
                connection.query('SELECT * FROM cartdetails WHERE idCart=' + id, function (err, details) {
                    if (err) {
                        reject(err);
                    } else {
                        data.idProduct = details;
                        resolve(data)
                    }
                })
            }
        })
    })

}
function createCart(req) {
    return new Promise((resolve, reject) => {
        var records = [null, req.totalPrice, req.userCreate, new Date(), new Date(), req.idstatistics]
        connection.query("INSERT INTO carts(id,totalPrice, userCreate,createAt,updateAt,idstatistics) VALUES (?)", [records], function (err, result) {
            if (err) {
                reject(err);
            } else {
                if (result.insertId) {
                    req.Product.forEach(element => {
                        genericService.getById(element.id, 'products').then((product) => {
                            var records = [null, element.id, product.name, element.quantitys, product.price, product.price * element.quantitys, result.insertId]
                            connection.query("INSERT INTO cartdetails(id,idProduct,nameProduct,quantitys,price,totalPrice,idCart) VALUES (?)", [records], function (err, cartdetail) {
                                if (err) {
                                    reject(err)
                                }
                            });
                        });
                    });
                    connection.query('SELECT * FROM carts WHERE id=' + result.insertId, function (err, cart) {
                        if (err) {
                            reject(err)
                        } else {
                            connection.query('SELECT * FROM cartdetails where idCart=' + result.insertId, function (err, response) {
                                if (err) {
                                    reject(err)
                                } else {
                                    if (response) {
                                        // connection.query('SELECT SUM() ')
                                        connection.query('SELECT SUM(totalPrice) as totalPrice  FROM cartdetails WHERE idCart=' + result.insertId, function (err, totalPrice) {

                                            if (err) {
                                                reject(err)
                                            } else {
                                                var ob = {
                                                    id: cart[0].id,
                                                    totalPrice: totalPrice[0].totalPrice,
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
function updateCart(id, req) {
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
    connection.query('UPDATE carts set totalPrice=' + totalPrice + ' WHERE id=' + id)
}