const fs = require("fs");

function chooseRandomFile(){
    let files = ["Wilde.md", "Shakespeare.md", "Grimm.md", "Carroll.md", "Lovecraft.md", "Woolf.md", "Poe.md"];
    return files[Math.floor(Math.random() * Math.floor(files.length))];
}

function fileToArray(file){
    file = __dirname + "/corpi/" + file
    var text = fs.readFileSync(file).toString('utf-8');
    var words = text.split(" ")
    return words
}

// function fileToArray(file){
//     //for testing...
//     file = "/Users/jamesmccrory/Documents/dev/tweet-gen-js/public/scripts/corpi/" + file
//     let text = fs.readFileSync(file).toString('utf-8');
//     let words = text.split(" ")
//     return words
// }

 function arrayToString(array){
     let string = ""
     for (let i = 0; i < array.length; i++) {
         string += array[i].toString('utf-8') + " "}
     return string;
}

function wordBeforeAfter(array, word, n) {
// Takes in an array of words in order from a text, a target word, and an integer of how many words to look before the target
   let instances = []
   for (let i = 0; i < array.length; i++) {
       if (array[i] == word){
           let x = i - 1; //the first word before the target word
           let beforeWords = [];//the array of words to come before the target
           if (x > 0){ // in case x is greater than the first index of the input array
               while (x > i - n) {// n == number of words to look back "in time"
                    beforeWords.push(array[x]);//push 'n' number of words into the array
                    x -= 1;//increment x
                }
            }
            let myInstance = [word, beforeWords, array[i+1]]; //creates an entry into instances.
            // an entry in instances consists of a target word:
            // myInstance[0] == a target word
            // myInstance[1] == 'n' words that come before the target
            // myInstance[2] == the next word that comes after the target
            instances.push(myInstance)
        }
    }
    return instances
}

function nextWords(instances) {
    let next = {};
    for (let i = 0; i < instances.length; i++) {
        if (instances[i][2] in next) {
            next[instances[i][2]] += 1;
        } else {
            next[instances[i][2]] = 1
        }
    }
    return next
};

function pickRand(nexts){
    var rand = Math.floor(Math.random() * Math.floor(nexts[1]));
    if (rand != 0){
        return rand;
    } else {
        return 1;
    }
}

function valuestoKeys(nexts){
    var newDict = {}
    var arrKeys = Object.keys(nexts)
    var arrValues = Object.values(nexts)
    for (var i = 0; i < arrValues.length; i++){
        if (arrValues[i] in newDict) {
        newDict[arrValues[i]].push(arrKeys[i]);
    } else {
        newDict[arrValues[i]] = [arrKeys[i]]
    }
    }
    // console.log(newDict)
    return newDict
}

var punc = [".", "!", "?", ";", ","]

var myAuthors = {
    "Poe": "Edgar Allan Poe",
    "Lovecraft": "HP Lovecraft",
    "Woolf": "Virginia Woolf",
    "Shakespeare": "William Shakespeare",
    "Carroll": "Lewis Carroll",
    "Wilde": "Oscar Wilde",
    "Grimm": "The Brothers Grimm",
}

function check(tweet){ //slows it down like crazy and all of the if statements don't work properly...
    var even = false;
    var count = 0;

    for (var i=0; i < (tweet.length); i++) {

        if (i == 0 && tweet[i] == " ") {
            tweet = tweet.substring(1, tweet.length);
        }

        if (tweet[i] == "\"") {
            count++;
        }
        if (tweet.substring(tweet.length-3, tweet.length-1) == "and") {
            tweet = tweet + "...";
        }
        if (i == (tweet.length-1) && tweet[i] == ",") {
                tweet = tweet.substring(0, tweet.length-1);
                // console.log(tweet[i])
        } else if (i == (tweet.length-1) && punc.includes(tweet[i])) {
            tweet = tweet;
        } else {
            tweet = tweet.charAt(0).toUpperCase() + tweet.slice(1);
            tweet = tweet + ".";
        }

    if (count%2 != 0 && count != 0) {
        even = true;
    } else {
        even = false;
    }
    return [tweet, even]
}}

module.exports.run = function (notRandom){
    let n = 4;
    let files = ["Grimm.md", "Poe.md", "Wilde.md", "Woolf.md", "Carroll.md", "Shakespeare.md", "Lovecraft.md"];
    let file = files[notRandom]

    let fileArray = fileToArray(file);
    let word = fileArray[Math.floor(Math.random() * Math.floor(fileArray.length))]
    let tweet = word

    while (tweet.length < 110) {
        let arrayOfInstances = wordBeforeAfter(fileArray, word, n); // file to array of words
        let nexts = nextWords(arrayOfInstances); // next words
        let valuesDictionary = valuestoKeys(nexts); // dictionary of key: frequencies and value: arrays of words
        let values = Object.keys(valuesDictionary) // array of keys of frequencies
        let frequentWords = []
        if (values.length >= 10){// if there's 10 or more options, pick the most frequent words...
            let i = 0;
            while (i < 10){
                // console.log(values, values[values.length-i-1], valuesDictionary[values[values.length-i-1]])
                frequentWords = frequentWords.concat(valuesDictionary[values[values.length-i-1]])
                // console.log(frequentWords)
                i+=1
            }
            let random_index_into_frequentWords = Math.floor(Math.random() * Math.floor(frequentWords.length)); // random index out of the array of keys of frequencies
            word = frequentWords[random_index_into_frequentWords]
            // console.log(word)
        } else { // if the frequency is '1', pick a word from that frequency array...
            let random_index_into_values = Math.floor(Math.random() * Math.floor(values.length)); // random index out of the array of keys of frequencies
            word = valuesDictionary[values[random_index_into_values]][Math.floor(Math.random() * Math.floor(valuesDictionary[values[random_index_into_values]].length - 1))] // random index out of the array of words for frequency 'v'
        }
        tweet = tweet + " " + word
    }

    let author = file.slice(0, -3)
    if (tweet[tweet.length-1]!="."){
    tweet = tweet.charAt(0).toUpperCase() + tweet.slice(1) + "." + " -" + myAuthors[author];
} else {
    tweet = tweet.charAt(0).toUpperCase() + tweet.slice(1) + " -" + myAuthors[author];
}
    return tweet
}

// function run(notRandom){
// let n = 4;
// let options = 10;
// let files = ["Grimm.md", "Poe.md", "Wilde.md", "Woolf.md", "Carroll.md", "Shakespeare.md", "Lovecraft.md"];
// let file = files[notRandom]
//
// let fileArray = fileToArray(file);
// let word = fileArray[Math.floor(Math.random() * Math.floor(fileArray.length))]
// let tweet = word
//
// while (tweet.length < 110) {
//     let arrayOfInstances = wordBeforeAfter(fileArray, word, n); // file to array of words
//     let nexts = nextWords(arrayOfInstances); // next words
//     let valuesDictionary = valuestoKeys(nexts); // dictionary of key: frequencies and value: arrays of words
//     let values = Object.keys(valuesDictionary) // array of keys of frequencies
//     let frequentWords = []
//     if (values.length >= options){// if there's 5 or more options, pick the most frequent words...
//         let i = 0;
//         while (i < options){
//             // console.log(values, values[values.length-i-1], valuesDictionary[values[values.length-i-1]])
//             frequentWords = frequentWords.concat(valuesDictionary[values[values.length-i-1]])
//             // console.log(frequentWords)
//             i+=1
//         }
//         let random_index_into_frequentWords = Math.floor(Math.random() * Math.floor(frequentWords.length)); // random index out of the array of keys of frequencies
//         word = frequentWords[random_index_into_frequentWords]
//         // console.log(word)
//     } else { // if the frequency is '1', pick a word from that frequency array...
//         let random_index_into_values = Math.floor(Math.random() * Math.floor(values.length)); // random index out of the array of keys of frequencies
//         word = valuesDictionary[values[random_index_into_values]][Math.floor(Math.random() * Math.floor(valuesDictionary[values[random_index_into_values]].length - 1))] // random index out of the array of words for frequency 'v'
//     }
//     tweet = tweet + " " + word
// }
//
// var author = file.slice(0, -3)
// tweet = tweet.charAt(0).toUpperCase() + tweet.slice(1)+ "." + " -" + myAuthors[author];
// return tweet
// }
//
//
// console.log(run(3))
