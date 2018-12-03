const express = require('express')
const app = express()

var Twitter = require('twitter');
var config = require('./config.js');
var T = new Twitter(config);
// const tweet = require('./tweet.js');

var exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(express.static('views/finals'));
app.use(express.static('views/public'));

var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/rotten-potatoes');


var fs = require("fs");

function chooseRandomFile(){
    var files = ["Wilde.md", "Shakespeare.md", "Grimm.md", "Carroll.md", "Lovecraft.md", "Woolf.md", "Poe.md"];
    return files[Math.floor(Math.random() * Math.floor(files.length))];
}

function fileToArray(file){
    var text = fs.readFileSync(file).toString('utf-8');
    var words = text.split(" ")
    return words
}

function writetoFile(data){
fs.writeFile('tweets.txt', data, function(err, data){
    if (err) console.log(err);
    console.log("Successfully Written to File.");
});
};

 function arrayToString(array){
     var string = ""
     var i;
     for (i = 0; i < array.length; i++) {
         string += array[i].toString('utf-8') + " "}
     return string;
}

function wordBeforeAfter(array, word, n) {
   var instances = []
   for (var i = 0; i < array.length; i++) {
       if (array[i] == word){
           var x = i - 1;
           var beforeWords = [];
           while (x > i - n) {
            beforeWords.push(array[x]);
                x -= 1;
                }
                var myInstance = [word, beforeWords, array[i+1]];
                instances.push(myInstance)
                }
             }
             return instances
           }

function nextWords(instances) {
    var lenInt = 0
    var next = {};
    for (var i = 0; i < instances.length; i++) {
        if (instances[i][2] in next) {
            next[instances[i][2]] += 1;
        } else {
            next[instances[i][2]] = 1
        }
        if (lenInt < next[instances[i][2]]){
            lenInt = next[instances[i][2]]
        };
    }
    return ([next, lenInt])
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
    var max = nexts[1];
    var newDict = {}
    var arrKeys = Object.keys(nexts[0])
    var arrValues = Object.values(nexts[0])
    for (var i = 0; i < arrValues.length; i++){
        if (arrValues[i] in newDict) {
        newDict[arrValues[i]].push(arrKeys[i]);
    } else {
        newDict[arrValues[i]] = [arrKeys[i]]
    }
    }
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
                console.log(tweet[i])
        // } else if (i == (tweet.length-1) && punc.includes(tweet[i]) ){
            //
        // } else if (i == (tweet.length-1) && punc.includes(tweet[i]) ){
            // tweet = tweet.charAt(0).toUpperCase() + tweet.slice(1);
            // tweet = tweet + "."
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

function run(authorNum){
var n = 6;
// var file = chooseRandomFile();


var files = ["Grimm.md", "Poe.md", "Wilde.md", "Woolf.md" , "Carroll.md", "Shakespeare.md", "Lovecraft.md"];

var fileArray = fileToArray(files[authorNum]);
var word = fileArray[Math.floor(Math.random() * Math.floor(fileArray.length))]
var tweet = word

while (tweet.length < 110) {
    var wBA = wordBeforeAfter(fileArray, word, n); // file to array of words
    var nexts = nextWords(wBA); // next words
    var max = nexts[1] // max frequency (the frequency of the most likely next word)
    var vTK = valuestoKeys(nexts); // dictionary of frequencies and arrays of words
    var keysvTK = Object.keys(vTK) // array of keys of frequencies
    var v = Math.floor(Math.random() * Math.floor(keysvTK.length)); // random index out of the array of keys of frequencies
    word = vTK[keysvTK[v]][Math.floor(Math.random() * Math.floor(vTK[keysvTK[v]].length - 1))] // random index out of the array of words for frequency 'v'
    tweet = tweet + " " + word // 'word' NOT WEIGHTED -- HOW TO IMPLEMENT??
};




// attempts at adding a period at the end, but only if there isn't one...

    // if (tweet[(tweet.length) - 1] in punc) { //doesn't work...
        // tweet = tweet + "-" + file;
        // } else {
        // tweet = tweet + "." + " -" + file;
        // };

        // if (tweet.charAt((tweet.length) - 1) in punc) { // doesn't work...
        // tweet = tweet + "-" + file;
        // } else {
        // tweet = tweet + "." + " -" + file;
        // }

//

var author = files[authorNum].slice(0, -3);

var thing = check(tweet)
var odd = thing[1]
tweet = thing[0]

if (odd){
    tweet = tweet + "\"" + " -" + myAuthors[author];
} else {
    tweet = tweet + " -" + myAuthors[author];
}

 tweet = tweet.charAt(0).toUpperCase() + tweet.slice(1);

return tweet.toString()
}


//generating an array of tweets


// var titleElement = document.getElementById('title');
// var tweet = run()




// app.listen(8000, () => {
  // console.log('App listening on port 7000!')
// })

const port = process.env.PORT || 10000;
// var server = app.listen(process.env.PORT || 8000, function () {
  // var port = server.address().port;
  // console.log("Express is working on port " + port);
// });


 app.get('/', (req, res) => {
     var tGrimm = run(0);
     var tPoe = run(1);
     var tWilde = run(2);
     var tWoolf = run(3);
     var tCarroll = run(4);
     var tShakespeare = run(5);
     var tLovecraft = run(6);
     res.render('tweet', { msg1: tGrimm, msg2: tPoe, msg3: tWilde, msg4: tWoolf, msg5: tCarroll, msg6: tShakespeare, msg7: tLovecraft});
 })


// app.get('/generate', (req, res) => {
  // res.render('gen', { msg: run() });
// })


// var status = "Hello"
//
// T.post('/tweet', status, function(err, response){
    // if(err){
        // console.log(err);
      // } else {
        // console.log(screen_name, ': **FOLLOWED**');
      // }
// });





// ------------ https://gist.github.com/jaredpalmer/138f17a142d2d8770a1d752b0e00bd31

/*
*	Code snippet for posting tweets to your own twitter account from node.js.
*	You must first create an app through twitter, grab the apps key/secret,
*	and generate your access token/secret (should be same page that you get the
*	app key/secret).
* 	Uses oauth package found below:
*		https://github.com/ciaranj/node-oauth
*		npm install oauth
*	For additional usage beyond status updates, refer to twitter api
*		https://dev.twitter.com/docs/api/1.1
*/

var OAuth = require('oauth');




var twitter_application_consumer_key = 'Ze8QiQyYoAah0dkgCaWqvrFpL';  // API Key
var twitter_application_secret = '1g5sA5MQt9LXHaFcItiggDAcagk1KlaGXBvRS98umagSMv0m3d';  // API Secret
var twitter_user_access_token = '1069115051166990337-1pjQ2NxkzUmbgnqGtqEN267FCh2lxV';  // Access Token
var twitter_user_secret = 'x5aBwX6zx2dN18kzOjeTCDbNxjHdZRuW6gpxIYmJt5rDy';  // Access Token Secret

var oauth = new OAuth.OAuth(
	'https://api.twitter.com/oauth/request_token',
	'https://api.twitter.com/oauth/access_token',
	twitter_application_consumer_key,
	twitter_application_secret,
	'1.0A',
	null,
	'HMAC-SHA1'
);

var status = run(6);  // This is the tweet (ie status)

var postBody = {
	'status': status
};

// console.log('Ready to Tweet article:\n\t', postBody.status);
oauth.post('https://api.twitter.com/1.1/statuses/update.json',
	twitter_user_access_token,  // oauth_token (user access token)
    twitter_user_secret,  // oauth_secret (user secret)
    postBody,  // post body
    '',  // post content type ?
	function(err, data, res) {
		if (err) {
			console.log(err);
		} else {
			// console.log(data);
		}
	});

// -- https://gist.github.com/jaredpalmer/138f17a142d2d8770a1d752b0e00bd31

app.listen(port);

// Hope you locked the fisherman, ‘how dreadful storm was so he put him so she jumped for a while, and the king, that. -The Brothers Grimm
