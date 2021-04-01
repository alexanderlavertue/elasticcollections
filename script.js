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
  showword();
}

// just loop through the books and console.log them
function consoleLogBooks() {
  console.log("consoleLogBooks()");
  record.forEach((record) => {
    console.log("record:", record.fields);
  });
}

// creates div container to hold pictures and words which is appended to the .contain div
var wordImage = document.createElement("div");
wordImage.classList.add("wordimg");
document.querySelector(".contain").appendChild(wordImage);
//p tag for all the words which is appended to wordimage div
var word = document.createElement("p");
word.classList.add("word");
wordImage.appendChild("word");
word.innerHtML = record.get('word');
//img tag for all the images which is appended to word image div
var images = document.createElement("img")
images.classList.add("img1")
wordImage.appendChild("images")
images.innerHtML = record.get('Image');


// Puts all the phrases in the .maintext class 
function showinfo() {
  record.forEach((record, index, array) => {
    if (index === array.length - 1) {
      // if it is the last sentence, don't add a space
      document.querySelector(".maintext").innerHTML += record.fields.phrase;
    } else {
      // if it is NOT the last sentence, add a space after the sentence
      document.querySelector(".maintext").innerHTML += `${record.fields.phrase} `;
    }
  });
}


//funtion works but makes seperate p tags for each phrase. I want them to be in one big paragraph.
// function showword() {
//   console.log("showword()");
//   record.forEach((record) => {
//     const h1 = document.createElement("h1") 
//     h1.innerText = record.fields.word;
//     document.body.appendChild(h1);
//     h1.classList.add("word")
    
//   });
// }

