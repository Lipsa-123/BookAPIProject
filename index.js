require("dotenv").config();

//Frame work
const express= require('express');
const mongoose =require("mongoose");

//Microservices ROutes
const Books=require("./API/Book");
const Authors=require("./API/Author");
const Publications=require("./API/Publications");

//Intialiazing express
const shapeAI= express();

shapeAI.use(express.json());

// //Database
// const database=require("./Databse/index");

// //Models
// const BookModel=require("./Databse/book");
// const AuthorModel=require("./Databse/author");
// const PublicationModel=require("./Databse/publication");
// const { findOneAndDelete } = require("./Databse/book");
//establish database connection

mongoose.connect(process.env.MONGO_URL).then(()=> console.log("connection established!!!!!!!!"));;

shapeAI.use("/book", Books);
shapeAI.use("/author", Authors);
shapeAI.use("/publication", Publications);


shapeAI.listen(3000, () => console.log("Server is running!! 😎"));