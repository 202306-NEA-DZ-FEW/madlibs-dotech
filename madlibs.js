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
    
   const newStory =  getRawStory.split(/\[\w+\]/g);






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


 // 3. THE 'CLEAR; BUTTON :

 const clearButton = document.getElementById('clearInputs');  // calling the element with the id 'clearInputs' and storing what it returns in the new declared variable 'clearButton'
document.addEventListener('click' , () => {  //  Adding an event listener that applies changes when 'clicking' on something
      const inputs = document.querySelectorAll('madLibsInput') // finding all the elements with the class 'madlibInput' (because they are the one that we want to clear), and assigning them to the new variable 'inputs'
      inputs.forEach(input => {
        input.value = '';        // each input gets the new value '' (empty)
        // place to call the function that would match the value in the 2nd text box
      })
})