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
  const parsedStory = rawStory.split(" ");
  const processedStory= parsedStory.map((word)=>{
    //const nounRex =/\[.]/g;
    //const verbRex =/\[.]/g;
    //const adjRex =/\[.]/g;
    const rex = /\[.]/g;
   // let posRe = rawStory.match(nounRex);
    //console.log(posRe)
   // const wordOnly = word.replace(word.match(rex), "")
   // console.log(wordOnly)
    let wordsArr=[];
    if (word.match(rex) == "[n]") {
      wordsArr.push(` {word : "${word}, pos: "noun"} `) ;
    } else if(word.match(rex) == "[v]"){
      wordsArr.push(` {word : "${word}, pos: "verb"} `) ;
    } else if(word.match(rex) == "[a]") {
      wordsArr.push(` {word : "${word}, pos: "adjective"} `) ;
    } else {
      wordsArr.push(` {word : "${word}"} `) ;
    }
    console.log(wordsArr)     
  })
  const processedStorypos=parsedStory.map((word)=>{
    const testNoun =new RegExp(/[n]$/);
    const testVerb =/"[v]"$/;
    const testAdj =/"[a]"$/;
     return word.match(testNoun)
                             
  })

  const procesksedStoryPos = processedStorypos.map((word)=>{


   })
   const testNoun =(/[n]$/)
   const testVerb =/"[v]"$/;
   const testAdj =/"[a]"$/;
   const matches = processedStorypos.filter((word) => testNoun.test(word));

  
//processedStorypos();
  console.log(parsedStory)
  console.log(processedStory)
  console.log(processedStorypos)
  console.log(matches)

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