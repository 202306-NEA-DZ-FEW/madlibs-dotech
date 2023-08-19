// Create the header element
const header = document.createElement("header");

// Create the text node
const headerText = document.createTextNode("Mad Lib Hatter");

// Append the text node to the header element
// header.appendChild(headerText);

// Add the header to the document body
// document.body.appendChild(header);
// Create the parent container element
const container = document.createElement("div");
container.id = "container";

// Get the existing div elements
const div1 = document.querySelector('.madLibsEdit');
const div2 = document.querySelector('.madLibsPreview');

// Append the div elements to the container
container.appendChild(div1);
container.appendChild(div2);

// Add the container to the document body
document.body.appendChild(container);

// Create the footer element
const footer = document.createElement("footer");

// Create the play button
const playButton = document.createElement("button");
playButton.className = "btn"
playButton.textContent = "Play";

// Create the reset button
const resetButton = document.createElement("button");
resetButton.className = "btn"
resetButton.textContent = "Clear";


// Create the music button
const musicButton = document.createElement("button");
musicButton.className = "btn"
musicButton.textContent = "Music";

// Append the buttons to the footer
footer.appendChild(playButton);
footer.appendChild(resetButton);
footer.appendChild(musicButton);

// Add the footer to the document body
document.body.appendChild(footer);