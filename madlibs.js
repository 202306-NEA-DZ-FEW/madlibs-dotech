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

//Inial Form Story
function parseStory(rawStory) {
  const storyWords = rawStory.split(" ");
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

/* 2. HOTKEYS : JUMPING TO NEXT INPUT WHEN 'ENTER' :
document.addEventListener('keydown', event => { // adds an event listener to the whole document, waiting for a key to be pressed(works with input, textarea nad summary)
  if (event.key === 'Enter' && event.target.classList.contains('madLibsEdit')) { // 2 conditions : the key pressed is enter and the class of the element has the class : madLibInput
    const currentIndex = parseInt(event.target.getAttribute('data-index'));  // takes the 'data-index' attribute from the input that called the event(where we are typing) and using parseInt it transforms into a string
    const nextInput = document.querySelector(`[data-index="${currentIndex + 1}"]`); // it searches fot the input in the next position 
    if (nextInput) {
      nextInput.focus(); //if the next input exists(we are not in the last input), it focuses on it.
    }
  }``
});    
*/  

document.addEventListener('keydown', event => {
  if (event.key === 'Enter' && event.target.classList.contains('madLibsEdit')) {
    const currentIndex = parseInt(event.target.getAttribute('data-index'));

    // Look for the next input by incrementing the index
    const nextInput = document.querySelector(`[data-index="${currentIndex + 1}"]`);

    if (nextInput) {
      // Add a small delay to ensure that the next input receives focus properly
      setTimeout(() => {
        nextInput.focus();
      }, 10);
    }

    // Prevent the default Enter key behavior (e.g., submitting forms)
    event.preventDefault();
  }
});

document.addEventListener('keydown', event => {
  console.log('Key pressed:', event.key);
  if (event.key === 'Enter' && event.target.classList.contains('madLibsEdit')) {
    const currentIndex = parseInt(event.target.getAttribute('data-index'));
    console.log('Current Index:', currentIndex);

    const nextInput = document.querySelector(`[data-index="${currentIndex + 1}"]`);
    console.log('Next Input:', nextInput);

    if (nextInput) {
      setTimeout(() => {
        nextInput.focus();
      }, 10);
    }

    event.preventDefault();
  }
});


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

// Clear Input Button Function
function clearInputs() {
  const inputs = document.querySelectorAll("input");

  inputs.forEach((input) => {
    input.value = "";
  });
}
const clearButton = document.getElementById("clearButton");
clearButton.addEventListener("click", clearInputs);

//Enter to move to next button

// Final Form Story
getRawStory()
  .then(parseStory)
  .then((processedStory) => {
    const madLibsEdit = document.getElementById("madLibsEdit");
    processedStory.forEach((w, index) => {
      let element;
      if (w.pos) {
        element = document.createElement("input");
        element.setAttribute("placeholder", w.pos);
        element.setAttribute("data-index", index); // Set the data-index attribute
      } else {
        element = document.createTextNode(w.word + " ");
      }

      madLibsEdit.appendChild(element);
    });
  });