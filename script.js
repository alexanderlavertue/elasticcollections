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
base("ai").select({maxRecords: 100}).eachPage(gotPageOfBooks, gotAllBooks);

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
  try {
    showinfo();
  } catch (error) {
    console.error(error);
  }
}

// just loop through the books and console.log them
function consoleLogBooks() {
  console.log("consoleLogBooks()");
  record.forEach((record) => {
    console.log("record:", record.fields);
  });
}



// Puts all the phrases in the .maintext class 
function showinfo() {
  record.forEach((record) => {
    // creates div container to hold pictures and words which is appended to the .contain div
    var wordImage = document.createElement('div');
    wordImage.classList.add('wordimg');
    document.querySelector(".contain").appendChild(wordImage);
    //p tag for all the words which is appended to wordimage div
    var images = document.createElement('img')
    images.classList.add('img1')
    images.src = record.fields.Image[0].url;
    wordImage.appendChild(images)
    //img tag for all the images which is appended to word image div
    var word = document.createElement('p');
    word.classList.add('word');
    wordImage.appendChild(word);
    word.innerHTML = record.get('word');
    });
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


//Changes opacity of images.
var imgword = document.querySelectorAll('.wordimg') //change this to new class
var test = document.getElementById('button'); //route to new button
test.onclick = function myfunction() {
    imgword.forEach((img, i) => {
        img.style.opacity = "1";
    })
};

