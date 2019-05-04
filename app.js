const dotenv = require('dotenv').config();

const express = require('express')
const app = express()

var Twitter = require('twitter');
var config = require('./public/scripts/config.js');
var T = new Twitter(config);

var OAuth = require('oauth');

var twitter_application_consumer_key = process.env.TWITTER_KEY
var twitter_application_secret = process.env.TWITTER_SECRET
var twitter_user_access_token = process.env.TWITTER_ACCESS_TOKEN
var twitter_user_secret = process.env.TWITTER_ACCESS_TOKEN_SECRET

var oauth = new OAuth.OAuth(
	'https://api.twitter.com/oauth/request_token',
	'https://api.twitter.com/oauth/access_token',
	twitter_application_consumer_key,
	twitter_application_secret,
	'1.0A',
	null,
	'HMAC-SHA1'
);

app.use(express.static('public'));

var exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/rotten-potatoes');

const fs = require("fs");

const generator = require('./public/scripts/tweet.js');

const port = process.env.PORT || 13000;

var tweet_Grimm;
var tweet_Poe;
var tweet_Wilde;
var tweet_Woolf;
var tweet_Carroll;
var tweet_Shakespeare;
var tweet_Lovecraft;

var status;

 app.get('/', (req, res) => {

     tweet_Grimm = generator.run(0);
     tweet_Poe = generator.run(1);
     tweet_Wilde = generator.run(2);
     tweet_Woolf = generator.run(3);
     tweet_Carroll = generator.run(4);
     tweet_Shakespeare = generator.run(5);
     tweet_Lovecraft = generator.run(6);

     res.render('tweet', { msg1: tweet_Grimm, msg2: tweet_Poe, msg3: tweet_Wilde, msg4: tweet_Woolf, msg5: tweet_Carroll, msg6: tweet_Shakespeare, msg7: tweet_Lovecraft});
 });

// ------------ https://gist.github.com/jaredpalmer/138f17a142d2d8770a1d752b0e00bd31

// status = 'hello'
//
// var postBody = {
// 	'status': status
// };
//
// // console.log('Ready to Tweet article:\n\t', postBody.status);
// oauth.post('https://api.twitter.com/1.1/statuses/update.json',
// 	twitter_user_access_token,  // oauth_token (user access token)
//     twitter_user_secret,  // oauth_secret (user secret)
//     postBody,  // post body
//     '',  // post content type ?
// 	function(err, data, res) {
// 		if (err) {
// 			console.log(err);
// 		}
// 	});
//
// // -- https://gist.github.com/jaredpalmer/138f17a142d2d8770a1d752b0e00bd31

app.listen(port);
