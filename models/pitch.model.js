var mongoose = require('mongoose');
var PitchSchema= new mongoose.Schema({
   name:{
       type: String,
       required: true
   },
   email:{
       type: String,
       required:true
   },
   phone:[{
        numberPhone:{
           type: Number,
           require:true
       }
   }],
   listImg:[{
       img:String
   }],
   numberOfPitch:{
       type:Number,
       required:true
   },
   price:{
       type:Number,
       price:true
   },
   sellPrice:Number,
   
   lag:Number,

   long:Number,

   location:{
       type:String,
       required: true
   },
   rate:Number, 

   spam:Number,

   updateAt:Date,

   createAt:{
       type:Date,
       required:true
   },
});

var Pitch = mongoose.model('pitch',PitchSchema);
module.exports= Pitch;