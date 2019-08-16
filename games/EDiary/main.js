// questions = [
//     "how are u",
//     "how you doin'",
//     "what did you do today",
//     "how do you like"
// ]
// function question(){
// var x = document.getElementById('qotd');
// x.innerHTML = Math.floor((Math.random() * questions) + 1);
// }

var display = document.getElementById("questions");
var questions = ['What color is the sky?',
                'What sound does a cow make?',
                'How many stars are on the US flag?',
                'How mad is Max?',
                'Is this another question?'];

var questionTracker = [];
var questionAmount = 3;

// Iterate however many times
for (var i = 0; i < questionAmount; i++) {
  // Keep creating random numbers until the number is unique
  do {
    var randomQuestion = Math.floor(Math.random() * questions.length);
  } while (existingQuestions());

  display.innerHTML += questions[randomQuestion] + '<br>';
  // Add the question to the tracker
  questionTracker.push(randomQuestion);
}

// If the current random number already exists in the tracker, return true
function existingQuestions() {
  for (var i = 0; i < questionTracker.length; i++) {
    if (questionTracker[i] === randomQuestion) {
      return true;
    }
  }
  return false;
}


