const mongoose=require("mongoose");

//Creating a book schema
const PulicationSchema=mongoose.Schema({
    id:Number,
    name:String,
    books:[String],
});

//Create a book model
const PulicationModel=mongoose.model(PulicationSchema);

module.exports=PulicationModel;