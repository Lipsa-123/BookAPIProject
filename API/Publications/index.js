const Router=require("express").Router();

const PublicationModel=require("../../Databse/publication");

/*
Route              /publications
Description        get all publications
Access             PUBLIC
Parameters         NONE
Method             GET
*/
Router.get("/", async(req, res) => {
    const getAllpublications=await PublicationModel.find();
    return res.json(getAllpublications);
});

/*
Route              /publications
Description        get all publications
Access             PUBLIC
Parameters         PUBLICATIONNAME
Method             GET
*/

Router.get("/:publicationname", async(req, res) =>{

    const getSpecificPublication=await PublicationModel.findOne({name:req.params.publicationname});
  
    if(getSpecificPublication.length===0){
        return res.json({error: `No author is found of name ${getPublicationname}`})
    }

    return res.json({publications: getSpecificPublication});
});

/*
Route              /publications/p
Description        get a list of publication based on a book
Access             PUBLIC
Parameters         isbn
Method             GET
*/

Router.get("/p/:isbn", async(req, res) => {
    const getSpecificPublications=await PublicationModel.find({books:req.params.isbn});
 
    if(getSpecificPublications.length===0){
        return res.json({error: `No author found for the book ${getISBN}`});
    }

    return res.json({ authors: getSpecificPublications});
});



/*
Route              /authors/new
Description        add new author
Access             PUBLIC
Parameters         NONE
Method             POST
*/

Router.post("/new" , async(req, res) =>{
    const {newPublication}=req.body;
    const addNewPublication=await PublicationModel.create(newPublication);
    return res.json({ publications:addNewPublication, message:"publication was added"});
});


/*
Route              /publication/update/book
Description        update or add new book to publication
Access             PUBLIC
Parameters         isbn
Method             PUT
*/

Router.put("/update/book/:isbn" , (req,res) => {
    // update the publication database

    database.publications.forEach((publication) =>{
        if(publication.id===req.body.pubId){
            return publication.books.push(req.params.isbn);
        }
    });

    //update the book datbase
    database.books.forEach((book) => {
        if(book.ISBN === req.params.isbn){
            // return book.publications.push(req.body.pubId);

            book.publications=req.body.pubId;
            return;
        }
    });

    return res.json({
        books:database.books,
        publications: database.publications,
        message:"Successfully updated publication........YEAHHHHHHHHHHHHH",
    });

});





/*
Route              /publication/delete/book
Description        delete a book from publications
Access             PUBLIC
Parameters         isbn, publication id
Method             DELETE
*/

Router.delete("/delete/book/:isbn/:pubId", (req,res) => {

    //update publication databse
database.publications.forEach((publication)=>{
    if(publication.id===parseInt(req.params.pubId)){
        const newBookList= publication.books.filter((book) => book!== req.params.isbn);
        publication.books=newBookList;
        return;
    }
    
})

//update book database
database.books.forEach((book)=>{
    if(book.ISBN===req.params.isbn){
        book.publications=0; // no publication available
        return;
    }
})

return res.json({publication:database.publications, book: database.books , 
    message: "Updated the publication database"});
})

/*
Route              /publication/delete
Description        delete an author 
Access             PUBLIC
Parameters         publication id
Method             DELETE
*/

Router.delete("/delete/:pubId", (req, res) => {
    const updatePublicationList= database.publications.filter((publication) => publication.id !== parseInt(req.params.pubId));
    database.publications=updatePublicationList;

    return res.json({publication:database.publications, message:"deleted succesfully"});
});


module.exports=Router;