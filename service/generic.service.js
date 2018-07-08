var message = require('./../utils/message');
var connection = require('./../db/index');
module.exports = {
    getAll: getAll,
    deleteById: deleteById,
    getById: getById,
    getAllByValue: getAllByValue
}
async function getAllByValue(req, Model) {
    var a = Object.getOwnPropertyNames(req);
    if (a.length) {
        return new Promise((resolve, reject) => {
            if (a.length === 1) {
                var value = req[Object.keys(req)[0]];
                connection.query('SELECT * FROM ' + Model + ' WHERE ' + a[0] + '=' + value, function (err, response) {
                    if (err) {
                        reject(err)
                    } else {
                        if (response != "") {
                            resolve(response)
                        } else {
                            reject({
                                statusCode: message.GENERICSTATUS.NOTFOUND,
                                message: message.GENERIC.QUERY_NO_VALID
                            });
                        }
                    }
                });
            } else if (a.length === 2) {
                var value = req[Object.keys(req)[0]];
                var value1 = req[Object.keys(req)[1]];
                connection.query('SELECT * FROM ' + Model + ' WHERE ' + a[0] + '=' + value + ' and ' + a[1] + '=' + value1, function (err, response) {
                    if (err) {
                        reject(err)
                    } else {
                        if (response != "") {
                            resolve(response)
                        } else {
                            reject({
                                statusCode: message.GENERICSTATUS.NOTFOUND,
                                message: message.GENERIC.QUERY_NO_VALID
                            });
                        }
                    }
                });
            } else if (a.length === 3) {
                var value = req[Object.keys(req)[0]];
                var value1 = req[Object.keys(req)[1]];
                var value2 = req[Object.keys(req)[2]];
                connection.query('SELECT * FROM ' + Model + ' WHERE ' + a[0] + '=' + value + ' and ' + a[1] + '=' + value1 + ' and ' + a[2] + '=' + value2, function (err, response) {
                    if (err) {
                        reject(err)
                    } else {
                        if (response != "") {
                            resolve(response)
                        } else {
                            reject({
                                statusCode: message.GENERICSTATUS.NOTFOUND,
                                message: message.GENERIC.QUERY_NO_VALID
                            });
                        }
                    }
                });
            } else if (a.length === 4) {
                var value = req[Object.keys(req)[0]];
                var value1 = req[Object.keys(req)[1]];
                var value2 = req[Object.keys(req)[2]];
                var value3 = req[Object.keys(req)[3]];
                connection.query('SELECT * FROM ' + Model + ' WHERE ' + a[0] + '=' + value + ' and ' + a[1] + '=' + value1 + ' and ' + a[2] + '=' + value2 + ' and ' + a[3] + '=' + value3, function (err, response) {
                    if (err) {
                        reject(err)
                    } else {
                        if (response != "") {
                            resolve(response)
                        } else {
                            reject({
                                statusCode: message.GENERICSTATUS.NOTFOUND,
                                message: message.GENERIC.QUERY_NO_VALID
                            });
                        }
                    }
                });
            } else if (a.length === 5) {
                var value = req[Object.keys(req)[0]];
                var value1 = req[Object.keys(req)[1]];
                var value2 = req[Object.keys(req)[2]];
                var value3 = req[Object.keys(req)[3]];
                var value4 = req[Object.keys(req)[4]];
                connection.query('SELECT * FROM ' + Model + ' WHERE ' + a[0] + '=' + value + ' and ' + a[1] + '=' + value1 + ' and ' + a[2] + '=' + value2 + ' and ' + a[3] + '=' + value3 + ' and ' + a[4] + '=' + value4, function (err, response) {
                    if (err) {
                        reject(err)
                    } else {
                        if (response != "") {
                            resolve(response)
                        } else {
                            reject({
                                statusCode: message.GENERICSTATUS.NOTFOUND,
                                message: message.GENERIC.QUERY_NO_VALID
                            });
                        }
                    }
                });
            } else {
                reject({
                    statusCode: message.GENERICSTATUS.ERROR,
                    message: message.GENERIC.QUERY_MUST_BE_LESS_THAN_6
                })
            }
        })
    }

}

function getAll(Model) {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM ' + Model, function (err, response) {
            if (err) {
                reject(err)
            } else {
                resolve(response)
            }
        });

    });
}

function getById(id, Model) {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM ' + Model + ' WHERE id=' + id, function (err, response) {
            if (err) {
                reject(err)
            } else {
                if (response.length > 0) {
                    resolve(response[0])
                } else {
                    reject({
                        message: message.GENERIC.NOTFOUND,
                        statusCode: message.GENERICSTATUS.NOTFOUND
                    })
                }
            }
        })
    })

}

function deleteById(id, Model) {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM ' + Model + ' WHERE id=' + id, function (err, response) {
            if (err) {
                reject(err)
            } else {
                console.log(response);
                
                if (response.length > 0) {
                    connection.query('DELETE FROM ' + Model + ' WHERE id=' + id, function (err, response) {
                        if (err) {
                            reject(err)
                        } else {
                            resolve({
                                statusCode: message.GENERICSTATUS.DELETED,
                                message: message.GENERIC.DELETED
                            });
                        }
                    });
                } else {
                    reject({
                        statusCode: message.GENERICSTATUS.NOTFOUND,
                        message: message.GENERIC.NOTFOUND
                    })
                }
            }
        });
    });
}