//Frame work
const express= require('express');
const shapeAI= express();

shapeAI.use(express.json());

//Database
const database=require("./Databse/index");

//Intialiazing express

/*
Route              /
Description        get all books
Access             PUBLIC
Parameters         NONE
Method             GET
 */


shapeAI.get("/books", (req, res) => {
    return res.json({books:database.books});
});


/*
Route              /
Description        get specific books based on ISBN
Access             PUBLIC
Parameters         ISBN
Method             GET
 */

shapeAI.get("/books/:isbn", (req, res) => {
    const getISBN=req.params.isbn;
    const getSpecificBook= database.books.filter((book) => book.ISBN === getISBN);

    if(getSpecificBook.length===0){
        return res.json({error: `No book found for the ISBN of ${getISBN}`});
    }

    return res.json({book: getSpecificBook});
});

/*
Route              /c
Description        get specific books based on Category
Access             PUBLIC
Parameters         NONE
Method             GET
 */

shapeAI.get("/books/c/:category", (req, res) => {
    const getCATEGORY=req.params.category;
    const getSpecificBooks= database.books.filter((book) => book.category.includes(getCATEGORY));

    if(getSpecificBooks.length===0){
        return res.json({error: `No book found for the CATEGORY of ${getCATEGORY}`});
    }

    return res.json({book: getSpecificBooks});
});

/*
Route              /books/a
Description        get specific books based on Author
Access             PUBLIC
Parameters         AUTHOR
Method             GET
*/

shapeAI.get("/books/a/:author", (req, res) => {
    const getAUTHOR=req.params.author;
    const authorID=database.authors.filter((author) => author.name=== getAUTHOR);
    // console.log(authorID[0].id);
    const getSpecificBooks= database.books.filter((book) => book.authors.includes(authorID[0].id));

    if(getSpecificBooks.length===0){
        return res.json({error: `No book found for the AUTHOR name of ${getAUTHOR}`});
    }

    return res.json({book: getSpecificBooks});
});


/* To Get all authors*/

shapeAI.get("/authors", (req, res) => {
    return res.json({authors:database.authors});
});

/* To get specific AUTHORS */

shapeAI.get("/authors/:authorsname", (req, res) =>{
    const getAuthorname=req.params.authorsname;
    const getSpecificAuthor= database.authors.filter((author) => author.name === getAuthorname);

    if(getSpecificAuthor.length===0){
        return res.json({error: `No author is found of name ${getAuthorname}`})
    }

    return res.json({authors: getSpecificAuthor});
});


/* To get specific authors based on a book' ISBN */
/*
Route              /authors/a
Description        get a list of authors based on a books's ISBN
Access             PUBLIC
Parameters         isbn
Method             GET
*/
shapeAI.get("/authors/a/:isbn", (req, res) => {
    const getISBN=req.params.isbn;
    const getSpecificAuthors= database.authors.filter((author) => author.books.includes(getISBN));

    if(getSpecificAuthors.length===0){
        return res.json({error: `No author found for the book ${getISBN}`});
    }

    return res.json({ authors: getSpecificAuthors});
});


/*
Route              /publications
Description        get all publications
Access             PUBLIC
Parameters         NONE
Method             GET
*/

shapeAI.get("/publications", (req, res) => {
    return res.json({pubications:database.publications});
});

/*
Route              /publications
Description        get all publications
Access             PUBLIC
Parameters         PUBLICATIONNAME
Method             GET
*/

shapeAI.get("/publications/:publicationname", (req, res) =>{
    const getPublicationname=req.params.publicationname;
    const getSpecificPublication= database.publications.filter((publication) => publication.name === getPublicationname);

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

shapeAI.get("/publications/p/:isbn", (req, res) => {
    const getISBN=req.params.isbn;
    const getSpecificPublications= database.publications.filter((publication) => publication.books.includes(getISBN));

    if(getSpecificPublications.length===0){
        return res.json({error: `No author found for the book ${getISBN}`});
    }

    return res.json({ authors: getSpecificPublications});
});

/*
Route              /books/new
Description        add new book
Access             PUBLIC
Parameters         NONE
Method             POST
*/

shapeAI.post("/book/new" ,(req, res, next) =>{
    database.books.push(req.body);
    return res.json({ books:database.books, message:"book was added"});
});


/*
Route              /authors/new
Description        add new author
Access             PUBLIC
Parameters         NONE
Method             POST
*/

shapeAI.post("/author/new" , (req, res) =>{
    database.authors.push(req.body);
    return res.json({ authors:database.authors, message:"author was added"});
});


/*
Route              /book/update
Description        add new author
Access             PUBLIC
Parameters         isbn
Method             PUT
*/

shapeAI.put("/book/update/:isbn", (req,res) => {
    database.books.forEach((book) => {
        if(book.ISBN === req.params.isbn) {
            book.title = req.body.bookTitle;
            return;
        }
    });

    return res.json({books: database.books});
})


/*
Route              /book/author/update
Description        add new author
Access             PUBLIC
Parameters         isbn
Method             PUT
*/
shapeAI.put("/book/author/update/:isbn", (req,res) => {
   //update the book database
   database.books.forEach((book) => {
    if(book.ISBN === req.params.isbn) 
        return book.authors.push(req.body.newAuthor);
    });


   //update the author database
   database.authors.forEach((author) => {
    if(author.id === req.body.newAuthor) 
        return author.books.push(req.params.isbn);
    });


    return res.json({books: database.books, authors: database.authors, message: "New author was added"});
});


/*
Route              /publication/update/book
Description        update or add new book to publication
Access             PUBLIC
Parameters         isbn
Method             PUT
*/

shapeAI.put("/publication/update/book/:isbn" , (req,res) => {
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

shapeAI.listen(3000, () => console.log("Server is running!! 😎"));