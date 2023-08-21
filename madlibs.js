// RE:Codede 202306-NEA-DZ-FEW BootCamp
// First Group Project: MadLib
// Theme : Mad Hatter Birthday Party (Inspired From Alice in Wonderland)
// Team Memeber :
// Hachem Bouhahdede
// Zohir kioukiou
// Halla
// Youssaf Sergama
// Katia Ghazali
// Mounia Belkhir

/* INITIAL FORM STORY : 
This function takes a raw story as input, splits it into words and processes each word to extract its nature(Noun, Verb, Adjective)
and word content. The processed words are stored in an array called "objOfWords" which is returned  */
function parseStory(rawStory) { //This is the declaration of a function named parseStory, which takes one parameter: rawStory, representing the unprocessed story text.
  const storyWords = rawStory.split(" "); //This line splits the rawStory string into an array of words using the space character (" ") as the delimiter. It stores the array in the storyWords variable.
  // console.log(storyWords) // just checking
  const rex = /\[(Noun|Verb|Adjective)\]/; 
  // This line defines a regular expression named rex. This regex is designed to match strings that have the format [Noun], [Verb], or [Adjective]. These placeholders are used in the story text to indicate where the user should input certain types of words.
  const objOfWords = storyWords.map((word) => { 
    //Here, the map function is used to iterate over each word in the storyWords array. The purpose of this iteration is to process each word.
    const match = word.match(rex); 
    //This line attempts to match the current word against the regular expression rex. If the word matches one of the placeholders like [Noun], [Verb], or [Adjective], the match variable will store an object containing information about the match.
    const nature = match ? match[1] : undefined; 
     // This line uses a ternary conditional operator to check if match exists. If there is a match, nature is assigned the value of the captured group within the match (either "Noun", "Verb", or "Adjective"). If there's no match, nature is set to undefined.
    const wordOnly = word.replace(rex, "").replace(/[.,\n]/g, ""); 
    // Here, wordOnly is assigned a new string after performing two replacements. First, the regex rex is used to remove the placeholder tags like [Noun], [Verb], or [Adjective]. Then, another replacement removes common punctuation and new lines from the word.
    const result = { word: wordOnly, pos: nature };
     //result of our paraphrasing : A new object called result is created with two properties: word, which holds the processed wordOnly, and pos, which holds the extracted nature.
    if (!result.pos) delete result.pos; 
    //when there is no nature (pos = undefiend) : This if statement checks if the pos property in the result object is undefined. If it is, the pos property is deleted from the result object. This is done to ensure that words without a defined nature are not cluttered with an unnecessary property.
    return result;
    // The result object, which contains the processed word and its nature, is returned for each word in the storyWords array.
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


 /* HOTKEYS FUNCTION :
  This function defines a hotkey behaviour to move focus to the next input field when the enter key is pressed. 
  It listens for the keyup event on specific input fields and handles the behavior accordingly    */
 function hotKeys (){
    const allInputs= document.querySelectorAll(".input");
    // This line uses document.querySelectorAll to retrieve all elements with the class name "input" in the document. It then stores these elements in the allInputs variable.
    console.log(allInputs)
    // This line logs the allInputs array to the console. It's used for debugging purposes to see what elements are being selected.
    for(let i=0;i < allInputs.length -1;i++){
      // This line starts a for loop that iterates through each element in the allInputs array. The loop runs until i is less than the length of allInputs minus 1.
      allInputs[i].addEventListener("keyup",function(e){
        // Here, an event listener is added to the current input element (allInputs[i]) for the "keyup" event. This means that when a key is released while the input element has focus, the attached function will be executed
        if(e.keyCode === 13 ){
          // Inside the event listener function, this line checks if the key code of the released key is 13. The key code 13 corresponds to the "Enter" key.
          console.log(e.keyCode)
         e.preventDefault();
         // This line prevents the default behavior of the "Enter" key, which is often to submit a form or create a new line in a text area.
         if(allInputs[i].nodeName === 'INPUT', i=i+1){
          // This line checks if the current input element's node name is "INPUT". If it is, the comma operator is used to evaluate both conditions. The second part of the condition (i = i + 1) increments the value of i by 1.
          console.log(allInputs[i].nodeName) // This line logs the node name of the current input element to the console.
          allInputs[i].focus()}
          // This line gives focus to the next input element (allInputs[i + 1]) in the array. This means that if the current input is an <input> element, the focus will move to the next input element.
       }
       })
    }
}
//Enter to move to next button
/* Add hotkeys function to Madlibzedit div :  
This attaches the hotKeys function to the keydown event of the madLibsEdit div, 
so the hotkeys functionality will be applied to the input fields within this div.*/
const madLibsEdit = document.getElementById("madLibsEdit");
madLibsEdit.addEventListener("keydown",hotKeys)

/* FINAL FORM STORY :
This code fetches a raw story from the 'story.txt' file using the getRawStory function, then processes it using the 'parseStory'
function. The processed story is then used to dynamically generate input fields or preview elements based on the nature of each 
word. The elements are added to the 'madLibsEdit' and 'madLibsPreview' divs */
getRawStory()
  .then(parseStory)
  .then((processedStory) => {
    const madLibsEdit = document.getElementById("madLibsEdit");
    const madLibsPreview = document.getElementById("madLibsPreview");
    processedStory.forEach((w) => {
      /* The .forEach() loop iterates through each element (w) in the processedStory array,
       which contains the processed words and their associated natures (if applicable). */
      let element;
      let elementPreview;
      if (w.pos) {
        element = document.createElement("input");
        element.setAttribute("placeholder", w.pos);
        element.className="input"
        elementPreview = document.createElement("p");
        elementPreview.id ="posPreview";
        elementPreview.className=w.pos
        elementPreview.style.display = "inline"
        elementPreview.textContent = `(${ w.pos}) `;
        element.addEventListener("keypress",function(e){
          if(e.key == "Enter" && element.textContent == "") {
            console.log(e.key)
            elementPreview.textContent = `(${ w.pos}) `;
          }else {
            element.onkeyup = element.onkeypress = function(){
              elementPreview.innerHTML = element.value + " ";
          }

          }
        })
      } else {
      //  element = document.createTextNode(w.word + " ");
        element = document.createElement("p");
        element.id ="element";
        element.style.display = "inline"
        element.textContent = " " + w.word + " ";
      //  elementPreview = document.createTextNode(w.word + " ")
      elementPreview = document.createElement("p");
      elementPreview.id ="elementPreview";
      elementPreview.style.display = "inline"
      elementPreview.textContent = (w.word) + " ";
      }
      /* Within the loop, the code checks whether the current w (processed word) has a pos property (nature). If it does, it creates an <input> element with
       a placeholder attribute corresponding to the nature, and an associated <p> element for preview. If it doesn't have a pos property,
      it creates <p> elements for the word content and preview.*/
      madLibsEdit.appendChild(element);
      madLibsPreview.appendChild(elementPreview)
      /* After processing each word, the code appends the element (input or paragraph) to the 
      madLibsEdit element and the elementPreview (paragraph) to the madLibsPreview element. 
      This effectively displays the processed story elements on the webpage.*/

    });
  });

// Get DOM elements
const volumeButton = document.getElementById("volumeButton");
const volumeSlider = document.getElementById("volumeSlider");
const audioPlayer = document.getElementById("audioPlayer");

/* Add event listeners : 
These lines add event listeners to the volume button and volume slider. When the button is 
clicked, the toggleMute function is called, and when the slider's value changes (input event),
the adjustVolume function is called.*/
volumeButton.addEventListener("click", toggleMute);
volumeSlider.addEventListener("input", adjustVolume);

// Function to toggle mute/unmute : This function toggles the audio player's mute state and updates the button text accordingly.
function toggleMute() {
  if (audioPlayer.muted) {
    // Unmute audio
    audioPlayer.muted = false;
    volumeButton.innerText = "Mute";
  } else {
    // Mute audio
    audioPlayer.muted = true;
    volumeButton.innerText = "Unmute";
  }
}

/* Function to adjust volume : This function adjusts the volume of the audio player based on the value of the volume slider. 
It also handles unmuting the audio player if the slider is adjusted while the audio is muted.*/
function adjustVolume() {
  const volume = volumeSlider.value / 100;
  audioPlayer.volume = volume;

  // If audio was muted, unmute it
  if (audioPlayer.muted) {
    audioPlayer.muted = false;
    volumeButton.innerText = "Mute";
  }
}
/* Add Reset function  : create a function called clearInputs that clears the content of input fields and resets placeholders.
The clearButton element is retrieved, and an event listener is added to it to trigger the clearInputs function when the button
 is clicked. */
const clearButton = document.getElementById("clearButton");
// This line retrieves the DOM element with the ID "clearButton" and assigns it to the clearButton variable. This button is used to trigger the clearing of inputs.
const clearInputs = function(){
  // These lines use document.querySelectorAll to select multiple elements on the page  :
allInputs = document.querySelectorAll(".input"); // selects all elements with the class "input" and assigns them to the allInputs variable.
allPos= document.querySelectorAll("#posPreview"); //  selects all elements with the ID "posPreview" and assigns them to the allPos variable.

allInputs.forEach(input=>{ // uses the forEach loop to iterate through each element in the allInputs array
  const inputPlaceholder=input.placeholder  // Stores the current input field's placeholder in the inputPlaceholder variable.
  console.log(inputPlaceholder) // Logs the placeholder text to the console.
  input.value =""  // Clears the input field's value by setting it to an empty string.
  input.setAttribute("placeholder", inputPlaceholder); // Sets the input field's placeholder back to its original value using the stored inputPlaceholder.
});

allPos.forEach(pos=>{ // uses the forEach loop to iterate through each element in the allInputs array 
  const posContent=pos.className ; //Stores the current placeholder's class name in the posContent variable.
  console.log(posContent)  // Logs the class name to the console.

  pos.innerText = `(${posContent}) ` // Sets the inner text of the placeholder element to a formatted string containing the posContent.
});

}


// Add Reset function to the clearbutton
clearButton.addEventListener("click", clearInputs);