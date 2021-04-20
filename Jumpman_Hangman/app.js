// 1. Create a variable words with 3 strings to test
var words = [
  "jordan",
  "rings",
  "crossover",
  "basketball",
  "jumpshot",
  "layup",
  "fadeaway",
  "postup",
  "slamdunk",
  "boxout",
  "sixrings",
  "championships",
  "shrug",
  "trophies",
  "spacejam",
  "twentythree",
  "buckets"
]
// 2. Start defining things that will be used in the game, i.e., define answer, maxWrong, wrongGuesses, etc. 
let answer = '';
let maxWrong = 5;
let wrongGuesses  = 0;
let guessed = [];
let wordStatus = null;

// 3. Create a function that will pick a random word from the var words array. The Math.floor() function returns the largest integer less than or equal to a given number. Math.random() used with Math.floor() can be used to return random integers.
var randomWord = () => {
  answer = words[Math.floor(Math.random() * words.length)];

  // alert(answer);
}

//4. Create a function that will generate the buttons keyboard. Create a variable buttonsHTML and assign it to string of alphabet, use  .split to split into individual strings and return as array. The map() method creates a new array populated with the results of calling a provided function on every element in the calling array. Template literals are string literals allowing embedded expressions. You can use multi-line strings and string interpolation features with them. Assign buttonHTML to 'keyboard' id  using document.getElementById
// use .join to join all the elements of an array into a string, set it to empty quotes to remove separator. 

var createButtons = () => {
  let buttonsHTML = "abcdefghijklmnopqrstuvwxyz".split('').map(letter =>
    `
    <button
    class = "btn btn-lg btn-primary m-2"
    id = '` + letter + `'
    onCLick = "handleGuess('` + letter + `')"
    >
    `+ letter + `
    </button>
    `).join('');

    document.getElementById('keyboard').innerHTML = buttonsHTML;
}

// 6. Create handleGuess function with parameter of keyboard. Use indexOf to return the index of the first occurrence in the array. If it is strictly equal to -1, push keyboard into guessed array, else return null. Use document.getElementById and set attribute of disabled if true to keyboard. 
// if answer.indexOf keyboard is greater than zero , run the function guessedWord(). Else, if it is strictly, -1, increment wrongGuesses by 1 and run updateWrongGuesses function. 

var handleGuess = (keyboard) => {
  guessed.indexOf(keyboard) === -1 ? guessed.push(keyboard) : null;
  document.getElementById(keyboard).setAttribute('disabled', true);
  document.getElementById(keyboard).style.color = '#ba161a'

  if (answer.indexOf(keyboard) >= 0) {
    guessedWord();
    checkIfWon();
  } else if (answer.indexOf(keyboard) === -1){
    wrongGuesses++
    updateWrongGuesses();
    checkIfLost ();
    updateJordan();
  }
}

// 10. Create a function that will change photo of Jordan with each mistake. Use document.getElementById to select image Id and then concatenate folder with wrongGuesses variable and .jpg. 

var updateJordan = () =>{
  document.getElementById('jordan').src = './images/' + wrongGuesses + '.jpg'
}

// 8. Create functions to run if game has been won or lost. use doucment.getElementById to select wordHighlight, use .innerHTML to change text to dsiplay the answer.   
var checkIfWon = () => {
  if (wordStatus === answer){
    document.getElementById('rim').src = './images/win.jpg'
    document.getElementById('keyboard').innerHTML = 'You have won the NBA FINALS!'
    document.getElementById('jordan').src = './images/trophy.jpg'
  }
}

var checkIfLost = () => {
  if (wrongGuesses === maxWrong){
    document.getElementById('wordHighlight').innerHTML = 'The answer was: ' + answer;
    document.getElementById('keyboard').innerHTML = 'You choked! Better luck next time!';
    document.getElementById('rim').src = './images/loss.jpg';
  }
}

// 5. Create a function for the guessedWord. Using ? as a ternary operator in place of "If...Else" is as follows: 
//  Condition (to be tested) ? True(value if true) : False (value if false). Define wordStatus as null. Split string into substrings and return them as array. Use .map and then check if letter exists in the guessed array. If it exists, it will be greater than 0, else it will be -1. Letter will be displayed as underscores and use .join to remove commas. 
// Assign wordStatus to #wordSpotlight id. 
// Call the function
// Comes up with a different word to be guessed with each refresh. 

var guessedWord = () => {
  wordStatus = answer.split('').map(letter => (guessed.indexOf(letter) >=0 ? letter : " _ ")).join('');

  document.getElementById('wordHighlight').innerHTML = wordStatus;
  document.getElementById('wordHighlight').style.fontSize = "xx-large";
  document.getElementById('wordHighlight').style.fontFamily = 'cursive';
  document.getElementById('wordHighlight').style.color = 'black';
}

// 7. Create function UpdateWrongGuesses, use document.getElementById to assign wrongGuesses variable to #wrongGuesses, inner.HTML to show the counter increase.  

var updateWrongGuesses = () => {
  document.getElementById('wrongGuesses').innerHTML = wrongGuesses;
}

// 9.  Create function for reset button
var reset = () => {
  wrongGuesses = 0;
  guessed = [];
  document.getElementById('jordan').src = './images/0.jpg'
  document.getElementById('rim').src = './images/net.jpg'

  randomWord();
  guessedWord();
  updateWrongGuesses();
  createButtons();
}

document.getElementById('maxWrong').innerHTML = maxWrong;

randomWord();
createButtons();
guessedWord();