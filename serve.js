var express = require('express');
var bodyParser = require('body-parser');
var multiparty = require('multiparty');

var cors = require('cors');
var app = express();
var fileUpload = require('express-fileupload');
var config = require('./config');

app.use(fileUpload());
app.use(cors());//cấp quyền cho phép sử dụng api 
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/public', express.static('public'))

//Api--
app.use('/user', require('./routes/user.route')());
app.use('/auth', require('./routes/auth.route')());
app.use('/cart',require('./routes/cart.route')());
app.use('/company',require('./routes/company.route')());
app.use('/merchandise',require('./routes/merchandise.route')());
app.use('/product',require('./routes/product.route')());
app.use('/statiscs',require('./routes/statistics.route')());
app.use('/catalog',require('./routes/catalog.route')());
app.listen(config.PORT);
console.log('serve is listening port ' + config.PORT);
