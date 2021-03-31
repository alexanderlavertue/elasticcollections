

//gets info from airtable
var Airtable = require('airtable');
Airtable.configure({
    endpointUrl: 'https://api.airtable.com',
    apiKey: 'keyAp5mElEZBzvzF9'
});

// use the airtable librar to get a variable that represents one of our bases
var base = new Airtable({ apiKey: "keyAp5mElEZBzvzF9" }).base(
  "appsvJW4wdukn0eeh"
);

//get the "books" table from the base, select ALL the records, and specify the functions that will receive the data
base("ai").select({}).eachPage(gotPageOfBooks, gotAllBooks);

// an empty array to hold our book data
const record = [];

// callback function that receives our data
function gotPageOfBooks(records, fetchNextPage) {
  console.log("gotPageOfBooks()");
  // add the records from this page to our books array
  record.push(...records);
  // request more pages
  fetchNextPage();
}

// call back function that is called when all pages are loaded
function gotAllBooks(err) {
  console.log("gotAllBooks()");

  // report an error, you'd want to do something better than this in production
  if (err) {
    console.log("error loading books");
    console.error(err);
    return;
  }

  // call functions to log and show the books
  consoleLogBooks();
  showBooks();
}

// just loop through the books and console.log them
function consoleLogBooks() {
  console.log("consoleLogBooks()");
  record.forEach((record) => {
    console.log("record:", record.fields);
  });
}

function showBooks() {
  record.forEach((record) => {
  document.querySelector(".u").innerHTML = record.fields.phrase;
    //const p = document.innerHTML("p");
   // p.innerText = record.fields.phrase;
    //document.body.appendChild(p);
   // p.classList.add("u");
  });
}
