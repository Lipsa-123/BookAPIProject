const Router=require("express").Router();

const BookModel=require("../../Databse/book");

/*
Route              /
Description        get all books
Access             PUBLIC
Parameters         NONE
Method             GET
 */


Router.get("/", async(req, res) => {
    const getAllbooks=await BookModel.find();
    return res.json(getAllbooks);
});


/*
Route              /
Description        get specific books based on ISBN
Access             PUBLIC
Parameters         ISBN
Method             GET
 */

Router.get("/:isbn", async(req, res) => {

    const getSpecificBook=await BookModel.findOne({ISBN: req.params.isbn});
    // above function will return null if there is no book in database
    if(!getSpecificBook){
        return res.json({error: `No book found for the ISBN of ${req.params.isbn}`});
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

Router.get("/c/:category", async(req, res) => {
    const getSpecificBooks=await BookModel.findOne({category:req.params.category});

    if(!getSpecificBooks){
        return res.json({error: `No book found for the CATEGORY of ${req.params.category}`});
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

// 🔥🔥
Router.get("/a/:author", async(req, res) => {

    // const getAUTHOR=req.params.author;
    const authorID=database.authors.filter((author) => author.name=== req.params.author);
    // const authorID=await AuthorModel.findOne({name:req.params.author});
    const getSpecificBooks=await BookModel.find({authors:authorID.id});
    // console.log(authorID[0].id);
    // const getSpecificBooks= database.books.filter((book) => book.authors.includes(authorID[0].id));

    if(getSpecificBooks.length===0){
        return res.json({error: `No book found for the AUTHOR name of ${getAUTHOR}`});
    }

    return res.json({book: getSpecificBooks});
});

/*
Route              /books/new
Description        add new book
Access             PUBLIC
Parameters         NONE
Method             POST
*/

Router.post("/new" ,async(req, res) =>{
    const {newBook}=req.body;
    const addNewBook= await BookModel.create(newBook);
    return res.json({ books:addNewBook, message:"book was added"});
});

/*
Route              /book/update
Description        add new author
Access             PUBLIC
Parameters         isbn
Method             PUT
*/

Router.put("/update/:isbn", async (req,res) => {
    const updateBookTitle= await BookModel.findOneAndUpdate({
        ISBN: req.params.isbn
    },
    {
        title:req.body.newTitle
    },
    {
        new:true
    });
    return res.json({books: updateBookTitle});
})

/*
Route              /book/author/update
Description        add new author
Access             PUBLIC
Parameters         isbn
Method             PUT
*/
Router.put("/author/update/:isbn", async(req,res) => {
      //update the book database
    const updatedBook= await BookModel.findOneAndUpdate(
        {
            ISBN:req.params.isbn,
        },
        {
            $addToSet:{
                authors:req.body.newAuthor,
            }
        },
        {
            new:true,
        }
    );
   //update the author database

    const updateAuthor= await AuthorModel.findOneAndUpdate(
        {
            id:req.body.newAuthor,
        },
        {
            $addToSet:{
                books:req.params.isbn,
            }
        },
        {
            new:true
        }
    )

    return res.json({books: updatedBook, authors: updateAuthor, message: "New author was added"});
});

/*
Route              /book/delete/:isbn
Description        delete a book
Access             PUBLIC
Parameters         isbn
Method             DELETE
*/

Router.delete("/delete/:isbn", async(req,res) => {
    const updateBookDatabase=await BookModel.findOneAndDelete(
        {
            ISBN:req.params.isbn,
        }
    )
  return res.json({books: updateBookDatabase});

});


/*
Route              /book/delete/author
Description        delete an author from a book
Access             PUBLIC
Parameters         isbn, author id
Method             DELETE
*/

Router.delete("/delete/author/:isbn/:authorId", async(req,res) => {
  //update the book databse 
  const updatedBook=await BookModel.findOneAndUpdate(
      {
          ISBN:req.params.isbn,
      },
      {
          $pull:{
              authors:parseInt(req.params.authorId),
          }
      },
      {
          new:true
      }
  )

  //update the author database
   const updateAuthor= await AuthorModel.findOneAndUpdate(
       {
           id:parseInt(req.params.authorId)
       },
       {
           $pull:{
               books:req.params.isbn,
           }
       },
       {new:true}
   )
  
  return res.json({
      books:updatedBook,
      authors:updateAuthor,
      message:"We deleted an author from a book and updated author database"
  });

});
module.exports=Router;