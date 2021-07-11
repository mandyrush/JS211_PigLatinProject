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

const displayResult = (result) => {
  let para = document.getElementById('translatorResult');
  para.innerHTML = result;
}

const translateUserInput = () => {
  let userInput = document.getElementById('translatorInput').value;

  if(userInput !== '') {
    let translation = pigLatin(userInput);
    displayResult(translation);
    document.getElementById('translatorInput').value = '';
  } else {
    displayResult('Please enter a word to translate');
  }
}
