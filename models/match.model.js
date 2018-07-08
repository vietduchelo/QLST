var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var matchSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    idMyteam:{
        type:String,
        required: true
    },
    idward:{
        type: String,
        required: true
    },
    timeStart:{
        type:String,
        require: true
    },
    date:{
        type: Date,
        require: true
    },
    scoreMyTeam:{
        type: Number
    },
    scoreWard:{
        type: Number
    }
});
var Match= mongoose.model('match',matchSchema);
module.exports = Match;