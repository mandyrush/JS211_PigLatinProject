'use strict';

// brings in the assert module for unit testing
const assert = require('assert');
// brings in the readline module to access the command line
const readline = require('readline');
// use the readline module to print out to the command line
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const translate = (word) => {
  let vowelPosition = positionOfFirstVowel(word);

  if (vowelPosition === -1) {
    // If the word doesn't have a vowel add ay to the end of it
    return noVowels(word);
  } else if (vowelPosition === 0) {
    // If the first letter is a vowel add yay to the end
    return beginsWithVowel(word);
  } 
  // If the first letter is a constanant find the fist vowel.
  // split the word at the vowel and swap sides. Add ay to the end of it
  return beginsWithConsonant(word, vowelPosition);
}

const positionOfFirstVowel = (word) => {
  for (let i = 0; i < word.length; i++) {
    const vowels = 'aeiou';
    let letter = word[i];

    if (vowels.includes(letter)) {
      return i;
    }
  }
  return -1;
}

const noVowels = (word) => {
  return word += 'ay';
}

const beginsWithVowel = (word) => {
  return word += 'yay';
}

const beginsWithConsonant = (word, position) => {
  let firstString = word.substr(0, position);
  let secondString = word.substr(position);
  return secondString += firstString += 'ay';
}

const stringToArrayFormatted = (string) => {
  return string.trim().toLowerCase().split(' ');
}

const pigLatin = (string) => {
  let wordArray = stringToArrayFormatted(string);
  
  // Check for multiple words in string
  if(wordArray.length > 1) {
    let newString = '';
    for(let i = 0; i < wordArray.length; i++) {
      newString += translate(wordArray[i]) + ' ';
    }
    return newString.trim();
  } 

  return translate(wordArray[0]);
}

// the first function called in the program to get an input from the user
// to run the function use the command: node main.js
// to close it ctrl + C
const getPrompt = () => {
  rl.question('word ', (answer) => {
    console.log( pigLatin(answer) );
    getPrompt();
  });
}

// Unit Tests
// to use them run the command: npm test main.js
// to close them ctrl + C
if (typeof describe === 'function') {

  describe('#pigLatin()', () => {
    it('should translate a simple word', () => {
      assert.equal(pigLatin('car'), 'arcay');
      assert.equal(pigLatin('dog'), 'ogday');
    });
    it('should translate a complex word', () => {
      assert.equal(pigLatin('create'), 'eatecray');
      assert.equal(pigLatin('valley'), 'alleyvay');
    });
    it('should attach "yay" if word begins with vowel', () => {
      assert.equal(pigLatin('egg'), 'eggyay');
      assert.equal(pigLatin('emission'), 'emissionyay');
    });
    it('should lowercase and trim word before translation', () => {
      assert.equal(pigLatin('HeLlO '), 'ellohay');
      assert.equal(pigLatin(' RoCkEt'), 'ocketray');
    });
    it('should accept multiple words', () => {
      assert.equal(pigLatin('car dog'), 'arcay ogday');
      assert.equal(pigLatin('create valley'), 'eatecray alleyvay');
      assert.equal(pigLatin('egg emission'), 'eggyay emissionyay');
      assert.equal(pigLatin('HeLlO RoCkEt'), 'ellohay ocketray');
    });
  });
} else {

  getPrompt();

}


// **********
//   HINTS
// **********

// break your code into pieces and focus on one piece at a time...
// 1. if word begins with a vowel send to one function: adds "yay"
// 2. if word begins with a consonant send to another function: splices off beginning, returns word with new ending.
// 3. if multiple words, create array of words, loop over them, sending them to different functions and creating a new array with the new words.
