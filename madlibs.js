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
  const rex = /\[(Noun|Verb|Adjective)\]/; // Regular expression to match [n], [v], or [a]
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

// Clear Input Button Function
function clearInputs() {
  const inputs = document.querySelectorAll("input");

  inputs.forEach((input) => {
    input.value = "";
  });
}
const clearButton = document.getElementById("clearButton");
clearButton.addEventListener("click", clearInputs);

 ////////// Hotkeys Function
 function hotKeys (){
    const allInputs= document.querySelectorAll(".input");
    console.log(allInputs)
    for(let i=0;i < allInputs.length -1;i++){
      allInputs[i].addEventListener("keyup",function(e){
        if(e.keyCode === 13 ){
          console.log(e.keyCode)
         e.preventDefault();
         if(allInputs[i].nodeName === 'INPUT', i=i+1){
          console.log(allInputs[i].nodeName)
          allInputs[i].focus()}
       }
       })
    }
}
//Enter to move to next button
// Add hotkeys function to Madlibzedit div
const madLibsEdit = document.getElementById("madLibsEdit");
madLibsEdit.addEventListener("keydown",hotKeys)

// Final Form Story
getRawStory()
  .then(parseStory)
  .then((processedStory) => {
    const madLibsEdit = document.getElementById("madLibsEdit");
    const madLibsPreview = document.getElementById("madLibsPreview");
    processedStory.forEach((w) => {
      let element;
      let elementPreview;
      if (w.pos) {
        element = document.createElement("input");
        element.setAttribute("placeholder", w.pos);
        element.className="input"
        elementPreview = document.createElement("p");
        elementPreview.id ="elementPreview";
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
      madLibsEdit.appendChild(element);
      madLibsPreview.appendChild(elementPreview)

    });
  });


