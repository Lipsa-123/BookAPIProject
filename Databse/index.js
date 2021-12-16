const books=[{
    ISBN: "12345ONE",
    title: "Getting started with MERN",
    authors:[1, 2],
    language: "en",
    pubDate: "2021-07-07",
    numOfPage:225,
    category: ["fiction", "programming", "tech", "web dev"],
    publications: 1,
},
{
    ISBN: "12345TWO",
    title: "Getting started with PYTHON",
    authors:[2],
    language: "en",
    pubDate: "2021-07-07",
    numOfPage:225,
    category: ["fiction", "tech", "web dev"],
    publications: 1,
},
];

const authors=[{
    id:1,
    name:"pavan",
    books:["12345ONE", "12345TWO"],
},
{
    id:2,
    name:"Deepak",
    books:["12345ONE"],
}];

const publications=[{
    id:1,
    name: "Chakra",
    books:["12345ONE"],
},
{
    id:2,
    name: "Waska",
    books:[],
}];

module.exports={books, authors, publications};


// {
//     "NewBook": {
//     "ISBN": "12345NEW",
//     "title": "Getting started with HTML",
//     "authors":1,
//     "language": "en",
//     "pubDate": "2021-07-07",
//     "numOfPage":200,
//     "category": ["fiction", "programming", "tech", "web dev"],
//     "publications": 1
// }
// }

// {
//     "newAuthor":5
// }