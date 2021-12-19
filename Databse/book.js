const mongoose=require("mongoose");

//Creating a book schema
const BoookSchema=mongoose.Schema({
    ISBN: String,
    title: String,
    authors:[Number],
    language: String,
    pubDate: String,
    numOfPage:Number,
    category: [String],
    publications: Number,
});

//Create a book model
const BookModel=mongoose.model("books",BoookSchema);

module.exports=BookModel;