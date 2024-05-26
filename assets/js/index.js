import { getRandomWords } from "./components/functions.js";

const mode = document.querySelectorAll('.mode');
const numberList = document.getElementById('numbers');

mode.forEach((item) => {
  // when the user clicks a mode add the active class
  item.addEventListener('click', () => {
    const element = document.getElementById(`${item.innerHTML}`);
    const alreadyActive = document.querySelector('.active');
    if (alreadyActive) {
      // if alreadyActive exists, remove that class from the element
      alreadyActive.classList.remove('active');
    }
    // add the active class to the element
    element.classList.add('active');

    // check if the mode 'custom' or 'sentance' has the active class, if so remove the numbers list
    if (element.innerHTML == 'custom' || element.innerHTML == 'sentences') {
      // remove the list
      numberList.style.display = 'none';
    } else {
      // make sure the list is visible
      numberList.style.display = 'flex';
    }

    // check if the mode 'timed' or 'words' is selected
    if (element.innerHTML == 'timed' || element.innerHTML == 'words') {
      // request the random amount of words
      const data = getRandomWords(10); // TODO: set the active numbers and request whichever one is active here
      // data returns a promise
      data.then((wordList) => {
        // check if any li that has the id word exists
        if (document.querySelector('#word') === null) {
          // if not, loop through the words in wordList and create the li with the id word
          for (let i = 0; i < wordList.length; i++) {
            const word = wordList[i];
            const gameContainer = document.querySelector('.game-container');

            const li = document.createElement('li');
            li.id = 'word';
            li.innerHTML = word;
            gameContainer.appendChild(li);
          }
        } else {
          // if so, delete them all and then fetch a new list
          const liExists = document.querySelectorAll('#word');
          for (let i = 0; i < liExists.length; i++) {
            const wordElement = document.getElementById('word');
            wordElement.remove();
          }
          // TODO: Fetch and display a new list of words
        }
      })
    }
    // end if
  })
})

