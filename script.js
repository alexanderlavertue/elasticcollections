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
//where main text is stored
var mtext="";


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
   // gets all the phrases from airtable and put it in mtext varriable 
   //also adds a space between each phrase 
  record.forEach((record, index, array) => {
    if (index === array.length - 1) {
    
      mtext += record.fields.phrase;
    } else {

   
      mtext += `${record.fields.phrase} `;
      
      //Changes opacity of images.
var imgword = document.querySelectorAll('.wordimg') //change this to new class
var test = document.getElementById('button'); //route to new button
test.onclick = function myfunction() {
    imgword.forEach((img, i) => {
        img.style.opacity = "1";

    })
};
//Makes images positon random on page load
var numbers = ['10%', '20', '30%', '40%', '50%', '60%', '70%', '80%', '0%', '5%']
var body = document.querySelector("body")
imgword.forEach((img, i) => {
  img.style.left = numbers[Math.floor(Math.random() * 10 + 1)];
});
//changes backround color and images position on button click
var colors = ['#0033B7', '#000000', '#5c5b5b'];
var button = document.getElementById('button2'); 
var numbers = ['5%','10%','15%','20%','25%','30%','35%','40%','45%','50%','55%', '65%','70%','75%','80%']
var text = document.querySelector(".maintext");
button.onclick = function() {
    document.body.style.background = colors[Math.floor(Math.random() * colors.length)];
    imgword.forEach((img, i) => {
        img.style.left = numbers[Math.floor((Math.random() * 15) + 1)];
    })
};


      }
  });
 //sets the length of the typewritter effect by equating the integer to length of the main text  
 //sets how fast the letters will be typed out with the setTimeout funtion 
    for(var i=0; i<mtext.length; i++){
      setTimeout(addLetter,50*i,mtext[i])
   }
  //selects inner html of main text and gets every single letter 
    function addLetter(letter){
      document.querySelector(".maintext").innerHTML +=letter;
    }
}




