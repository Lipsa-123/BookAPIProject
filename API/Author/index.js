const Router=require("express").Router();

const AuthorModel=require("../../Databse/author");

/* To Get all authors*/

Router.get("/", async(req, res) => {
    const getAllAuthors=await AuthorModel.find();
    return res.json(getAllAuthors);
});

/* To get specific AUTHORS */


Router.get("/:authorsname", async(req, res) =>{

    const getSpecificAuthor=await AuthorModel.findOne({name:req.params.authorsname});

    if(!getSpecificAuthor){
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


Router.get("/a/:isbn", async(req, res) => {

    const getSpecificAuthors=await AuthorModel.find({books:req.params.isbn});

    if(getSpecificAuthors.length===0){
        return res.json({error: `No author found for the book ${getISBN}`});
    }

    return res.json({ authors: getSpecificAuthors});
});

/*
Route              /authors/new
Description        add new author
Access             PUBLIC
Parameters         NONE
Method             POST
*/

Router.post("/new" , async(req, res) =>{
    const {newAuthor}=req.body;
    const addNewAuthor=await AuthorModel.create(newAuthor);
    return res.json({ authors:addNewAuthor, message:"author was added"});
});


/*
Route              /author/delete
Description        delete an author 
Access             PUBLIC
Parameters         author id
Method             DELETE
*/

Router.delete("/delete/:authorId", (req, res) => {
    const updateAuthorList= database.authors.filter((author) => author.id !== parseInt(req.params.authorId));

    database.authors=updateAuthorList;

    return res.json({author:database.authors});
});

module.exports=Router;