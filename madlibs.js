/**
 * Complete the implementation of parseStory.
 * 
 * parseStory retrieves the story as a single string from story.txt
 * (I have written this part for you).
 * 
 * In your code, you are required (please read this carefully):
 * - to return a list of objects
 * - each object should definitely have a field, `word`
 * - each object should maybe have a field, `pos` (part of speech)
 * 
 * So for example, the return value of this for the example story.txt
 * will be an object that looks like so (note the comma! periods should
 * be handled in the same way).
 * 
 * Input: "Louis[n] went[v] to the store[n], and it was fun[a]."
 * Output: [
 *  { word: "Louis", pos: "noun" },
 *  { word: "went", pos: "verb", },
 *  { word: "to", },
 *  { word: "the", },
 *  { word: "store", pos: "noun" }
 *  { word: "," }
 *  ....
 * 
 * There are multiple ways to do this, but you may want to use regular expressions.
 * Please go through this lesson: https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/regular-expressions/
 */
function parseStory(rawStory) {
  // Your code here.
  return {}; // This line is currently wrong :)
}

/**
 * All your other JavaScript code goes here, inside the function. Don't worry about
 * the `then` and `async` syntax for now.
 * 
 * You'll want to use the results of parseStory() to display the story on the page.
 */
getRawStory().then(parseStory).then((processedStory) => {
  console.log(processedStory);
});


// 1. PARSING THE STORY :
    
   //Inial Form Story
function parseStory(rawStory) {
 
  // console.log(storyWords) // just checking
  const rex = /\[(n|v|a)\]/; // Regular expression to match [n], [v], or [a]
  const objOfWords = storyWords.map((word) => {
    //the map function work on each word(element) from the storyWords Array
    const match = word.match(rex); // match gives an object containing the word(element) that match our rex
    //console.log(match) just checking
    const nature = match ? match[1] : undefined; //=> if there is a match, set nature as index1(element2) of the object, if there isn't set it as undefiend
    const wordOnly = word.replace(rex, "").replace(/[.,\n]/g, ""); // Remove [n], [v], [a] and punctuation and new lines
    const result = { word: wordOnly, pos: nature }; //result of our paraphrasing
    if (!result.pos) delete result.pos; //when there is no nature (pos = undefiend)
    return result;
  });

  // console.log(objOfWords); // just testing

  return objOfWords;
}

// Max Character Per Input Function
function InputMaxLength() {
  const inputs = document.querySelectorAll("input");

  inputs.forEach((input) => {
    input.addEventListener("input", function () {
      if (input.value.length > 20) {
        input.value = input.value.substring(0, 20);
      }
    });
  });
}







// 2. HOTKEYS : JUMPING TO NEXT INPUT WHEN 'ENTER' :
document.addEventListener('keydown', event => { // adds an event listener to the whole document, waiting for a key to be pressed(works with input, textarea nad summary)
  if (event.key === 'Enter' && event.target.classList.contains('madLibsInput')) { // 2 conditions : the key pressed is enter and the class of the element has the class : madLibInput
    const currentIndex = parseInt(event.target.getAttribute('data-index'));  // takes the 'data-index' attribute from the input that called the event(where we are typing) and using parseInt it transforms into a string
    const nextInput = document.querySelector(`[data-index="${currentIndex + 1}"]`); // it searches fot the input in the next position 
    if (nextInput) {
      nextInput.focus(); //if the next input exists(we are not in the last input), it focuses on it.
    }
  }``
});
/* The Document method querySelector() 
returns the first Element within the document that matches the
 specified selector, or group of selectors. If no matches are found, null is returned. */   


 // 3. THE 'CLEAR' BUTTON :

 const clearButton = document.getElementById('clearInputs');  // calling the element with the id 'clearInputs' and storing what it returns in the new declared variable 'clearButton'
document.addEventListener('click' , () => {  //  Adding an event listener that applies changes when 'clicking' on something
      const inputs = document.querySelectorAll('madLibsInput') // finding all the elements with the class 'madlibInput' (because they are the one that we want to clear), and assigning them to the new variable 'inputs'
      inputs.forEach(input => {
        input.value = '';        // each input gets the new value '' (empty)
        updatePreview(); // place to call the function that would match the value in the 2nd text box
      })
})


// 4. THE PREVIEW : 


const fetchedStory = "Today is the Mad Hatter`s birthday, and he is throwing a [adjective] tea party for his friends. He has invited the March Hare, the Dormouse, Alice, and the [noun]. He has prepared a lot of [noun] and [noun] for them to eat and drink. He has also decorated his hat with [adjective] ribbons and [noun]. However, things don’t go as planned. The [noun] arrives late and brings a [adjective] gift. The Dormouse falls asleep on the [noun] and spills the tea. The March Hare starts a [noun] fight with Alice. And the Mad Hatter forgets his own name and starts singing a [adjective] song. Will the Mad Hatter have a happy birthday? Or will his tea party turn into a [adjective] disaster? You decide!";
const userInputs = [];


const inputElements = document.querySelectorAll('.userInput');

inputElements.forEach((inputElement, index) => {  // Attach event listeners to each input element
  inputElement.addEventListener('input', (event) => {
    const userInput = event.target.value;
    userInputs[index] = userInput;
    updatePreview(); // Call the function to update the preview
  });
});

const generatePreview = (parseStory, userInputs) => {
  let previewText = parseStory;

  for (let i = 0; i < userInputs.length; i++) {
    const placeholder = `[${i}]`; // Placeholder format in parseStory
    const userInput = userInputs[i];

    previewText = previewText.replace(placeholder, userInput);
  }

  return previewText;
};

// Function to update the preview div with generated preview text
const updatePreview = () => {
  const previewText = generatePreview(fetchedStory, userInputs);
  const previewDiv = document.querySelector('.madLibsPreview');
  previewDiv.textContent = previewText;
};

// Final Form Story
getRawStory()
  .then(parseStory)
  .then((processedStory) => {
    const madLibsEdit = document.getElementById("madLibsEdit");
    processedStory.forEach((w) => {
      let element;
      if (w.pos) {
        element = document.createElement("input");
        element.setAttribute("placeholder", w.pos);
      } else {
        element = document.createTextNode(w.word + " ");
      }

      madLibsEdit.appendChild(element);
    });
  });