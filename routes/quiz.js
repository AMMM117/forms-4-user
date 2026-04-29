const express = require('express');
const router = express.Router(); 

const {readFile, writeFile} = require('fs').promises;



router.route('/').get(async (req, res) =>{
    //shuffle the array
    let chosenWords = await getWords();
    console.log('Choice Array: ', chosenWords);
    res.render('quiz', {chosenWords})
}).post(async (req, res) =>{
    console.log(req.body)
    let {userChoice, totalQuestions, totalCorrect, correctWord, correctDef} = req.body;
    let userWasCorrect = false;
    console.log(`Current score is ${totalCorrect} / ${totalQuestions}`);
    console.log(`The user chose: ${userChoice}, the correct answer was ${correctWord}`);
    if (userChoice === correctWord)
    {
        console.log('They chose correct!')
        userWasCorrect = true;
        totalCorrect++;
        console.log(`Total Correct increased: ${totalCorrect}`);
    }
    totalQuestions++;
    let chosenWords = await getWords();
    res.render('quiz', {userWasCorrect, totalCorrect, totalQuestions, chosenWords, userWasCorrect, correctWord, actualDef:correctDef})
});
let getWords = async ()=>{
    // console.log("Starting getwords function");
    //Choose a random part of Speech
    let chosenPart = getRandomPart();
    // console.log('Random part chosen in getWords: ', chosenPart)
    //readwords and shuffle
    let allWords = await readFile('resources/allwords.txt', 'utf8');
    let wordArray = allWords.split('\n');
    shuffle(wordArray);
    
    
    let choices = [];
    while(choices.length <5){
        // console.log('Building Choices, current size: '+choices.length);
        //remove lines from the array
        let line = wordArray.pop();
        // console.log('Line chosen: ', line);
        //break it up
        let [word, part, defn] = line.split('\t');
        // console.log('This words part: ', part);
        //if it has a part we match, add it to our choices
        if(part === chosenPart){
            // console.log('This part matches! adding the line...')
            choices.push(line);
        }
        
    }
    // console.log('Array is full, returning.: ', choices);
    return choices;
};
let shuffle = (array)=>{ //Fisher-Yates algorithm
    //Start by looping through the array from end to beginning
    for(let i = array.length-1;i > 0;i--)
    {
        //Generate a random number from end to beginning
        let randomNumber = Math.floor(Math.random()*(i+1));
        //swap the elements
        [array[i], array[randomNumber]] = [array[randomNumber], array[i]];
    }
    // console.log('Array has been shuffled!');
};
let getRandomPart = ()=>{
    let partsOfSpeech = ['verb', 'noun', 'adjective'];
    shuffle(partsOfSpeech);
    let randomPart = partsOfSpeech.pop();
    // console.log('Random part chosen: ', randomPart);
    return randomPart;
}
module.exports = router;
