var connection = require('./../db/index');
var message = require('./../utils/message');
var crypto = require('./../utils/crypto');
module.exports = {
    createUser: createUser,
    updateUser: updateUser,
}

function createUser(req) {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM user WHERE email="' + req.email + '"', function (err, response) {
            if (err) {
                reject(err)
            } else {
                if (response.length > 0) {
                    resolve({
                        message: message.ERROR_MESSAGE.USER.EMAIL_EXIST,
                        statusCode: message.STATUS_CODE.ERROR
                    })
                } else {
                    var salt = crypto.genSalt();
                    var pass = crypto.hashWithSalt(req.password, salt);
                    console.log(pass);
                    
                    var records = [null, req.name, req.email, pass, salt, new Date()]
                    connection.query("INSERT INTO user (id,name,email,password,salt,createAt) VALUES (?)", [records], function (err, result) {
                        if (err) {
                            reject(err);
                        } else {
                            if (result.insertId) {
                                resolve({
                                    mesage: message.GENERIC.CREATED,
                                    statusCode: message.GENERICSTATUS.CREATED
                                })
                            } else {
                                reject({
                                    mesage: message.GENERIC.CREATE_ERROR,
                                    statusCode: message.GENERICSTATUS.ERROR
                                })
                            }
                        }
                    });
                }
            }
        })
    })
}

function updateUser() {

}