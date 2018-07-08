var jwt = require('./../utils/jwt');
var connection = require('./../db/index');
var message = require('./../utils/message');
var crypto = require('./../utils/crypto');
module.exports = {
    login: login,
    getUserByToken: getUserByToken,
    getUserByEmail: getUserByEmail
}
function getUserByEmail(email) {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM user WHERE email=' + email, function (err, response) {
            if (err) {
                reject(err)
            } else {
                if (response.length == 0) {
                    reject({
                        statusCode: message.ERROR_MESSAGE.AUTH.NOT_AUTHORIZED,
                        message: message.ERROR_MESSAGE.AUTH.NOT_AUTHORIZED
                    });
                } else {
                    resolve(response[0])
                }
            }
        });
    });

}
function getUserByToken(token) {
    return new Promise((resolve, reject) => {
        if (token) {
            jwt.verify(token, function (err, decodeData) {
                if (err) {
                    reject(err);
                } else {
                    var email = decodeData[0].email;
                    connection.query('SELECT * FROM user WHERE email="' + email + '"', function (err, response) {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(response[0]);
                        }
                    })
                }
            })
        }
    });
}
function login(req) {
    console.log(req);
    
    return new Promise((resolve, reject) => {
        connection.query('SELECT * from user where email="' + req.email + '"', function (err, response) {
            if (err) {
                reject(err)
            } else {
                if (response.length > 0) {
                    var pass = crypto.hashWithSalt(req.password, response[0].salt);
                    connection.query('SELECT * from user where email="' + req.email + '" and password="' + pass + '"', function (err, response) {
                        if (err) {
                            reject(err)
                        } else {
                            if (response.length > 0) {
                                jwt.sign(JSON.stringify(response), function (err, token) {
                                    if (err) {
                                        reject(err);
                                    } else {
                                        resolve({token:token})
                                    }
                                });

                            } else {
                                reject({
                                    message: message.ERROR_MESSAGE.USER.PASS_WRONG,
                                    statusCode: message.STATUS_CODE.ERROR

                                });
                            }
                        }
                    });
                } else {
                    reject({
                        message: message.ERROR_MESSAGE.USER.EMAIL_EXIST,
                        statusCode: message.STATUS_CODE.ERROR
                    })
                }
            }
        });
    })
}