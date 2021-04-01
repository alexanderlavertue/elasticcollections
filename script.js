var wordimg = document.querySelectorAll('.wordimg')
var numbers = ['10%','20','30%', '40%', '50%', '60%', '70%', '80%', '0%', '5%'] 

//Makes images positon random on page load
var body = document.querySelector("body")
body.onload = function(){
   wordimg.forEach((img, i)=>{
      img.style.left = numbers[Math.floor((Math.random() * 10) + 1)];
   })
};

 
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
  showinfo();
}

// just loop through the books and console.log them
function consoleLogBooks() {
  console.log("consoleLogBooks()");
  record.forEach((record) => {
    console.log("record:", record.fields);
  });
}

//funtion works but is only bringing in one line from phrases. I need all of them.
function showinfo() {
 record.forEach((record) => {
 document.querySelector(".maintext").innerHTML = record.fields.phrase;
 document.querySelector(".word").innerHTML = record.fields.word;
   });
}


//funtion works but makes seperate p tags for each phrase. I want them to be in one big paragraph.
// function showinfo() {
//   console.log("showinfo()");
//   record.forEach((record) => {
//     const p = document.createElement("p");
//     p.innerText = record.fields.phrase;
//     document.body.appendChild(p);
//     p.classList.add("u")
//   });
// }