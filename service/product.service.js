var connection = require('./../db/index');
var mesage = require('./../utils/message');
module.exports = {
    createProduct: createProduct,
    updateProduct: updateProduct,
}

function createProduct(req) {
    return new Promise((resolve, reject) => {
        var records = [null, req.name, req.price, req.sellPrice, req.inputPrice, req.description, req.purchases, req.idCatalog, req.idCompany, new Date(), req.userCreate]
        connection.query("INSERT INTO products (id,name, price,sellPrice,inputPrice,description,purchases,idCatalog,idCompany,createAt,userCreate) VALUES (?)", [records], function (err, result) {
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

function updateProduct(id, req) {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM products WHERE id=' + id, function (err, response) {
            if (err) {
                reject(err);
            } else {
                if (response) {
                    var NewData = {
                        name: req.name || response[0].name,
                        price: req.price || response[0].price,
                        sellPrice: req.sellPrice || response[0].sellPrice,
                        inputPrice: req.inputPrice || response[0].inputPrice,
                        description: req.description || response[0].description,
                        purchases: req.purchases || response[0].purchases,
                        idCatalog: req.idCatalog || response[0].idCatalog,
                        idCompany: req.idCompany || response[0].idCompany,
                        userCreate: req.userCreate || response[0].userCreate


                    }
                    connection.query('UPDATE `products` SET `name`="' + NewData.name + '", `price`=' + NewData.price + ',`inputPrice`=' + NewData.inputPrice +
                        ',`purchases`=' + NewData.purchases + ',`idCatalog`=' + NewData.idCatalog + ',`idCompany`=' + NewData.idCompany + ',`userCreate`=' + NewData.userCreate + ' WHERE id=' + id,
                        function (err, result) {
                            if (err) {
                                reject(err);
                            } else {
                                if (changedRows) {
                                    resolve({
                                        mesage: mesage.GENERIC.UPDATED,
                                        statusCode: mesage.GENERICSTATUS.UPDATED
                                    });
                                } else {
                                    reject({
                                        mesage: mesage.GENERIC.NOTFOUND,
                                        statusCode: mesage.GENERICSTATUS.NOTFOUND
                                    })
                                }
                            }
                        });
                } else {
                    reject({
                        mesage: mesage.GENERIC.NOTFOUND,
                        statusCode: mesage.GENERICSTATUS.NOTFOUND
                    })
                }
            }
        })

    })
}