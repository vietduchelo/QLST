var mongoose = require('mongoose');
var teamSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    img: {
        type: String
    },
    lag: {
        type: Number
    },
    long: {
        type: Number
    },
    status:{
        type: String
    },
    win: {
        type: Number
    },
    los: {
        type: Number
    },
    rate: {
        type: Number
    },
    spam: {
        type: Number
    },
    user: [{
        _id: String,
    }],
    updateAt: {
        type: Date,
        require: true
    },
    createAt: {
        type: Date,
        require: true
    },
    userCreate:{
        type: Number,
        required: true
    }

});
var Team = mongoose.model('team', teamSchema);
module.exports = Team;