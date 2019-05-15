// initializing npm module: dotenv
const dotenv = require('dotenv').config();

// initializing express
const express = require('express')
const app = express()

// initializing Twitter API
let Twitter = require('twitter');
let config = require('./public/scripts/config.js');
let T = new Twitter(config);

// OAuth for the Twitter API
let OAuth = require('oauth');

// .env secrets and api keys
let twitter_application_consumer_key = process.env.TWITTER_KEY
let twitter_application_secret = process.env.TWITTER_SECRET
let twitter_user_access_token = process.env.TWITTER_ACCESS_TOKEN
let twitter_user_secret = process.env.TWITTER_ACCESS_TOKEN_SECRET

let oauth = new OAuth.OAuth(
	'https://api.twitter.com/oauth/request_token',
	'https://api.twitter.com/oauth/access_token',
	twitter_application_consumer_key,
	twitter_application_secret,
	'1.0A',
	null,
	'HMAC-SHA1'
);

// creating an entry point / reference to my public folder with media files.
app.use(express.static('public'));

// initializing handlebars
let exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// initializing mongoose.
// NOT IMPLEMENTED: meant to track user count / traffic to my site.
let mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/rotten-potatoes');

// Exported tweet generator from tweet.js
const generator = require('./public/scripts/tweet.js');

// initializing port
const port = process.env.PORT || 13000;

// GET route of the index page. generates the tweets and sends them to the views.
app.get('/', (req, res) => {
	 let tweets = []
	 let count = 0
	 while (count < 30){
	 	tweet = generator.run( Math.floor( Math.random() * Math.floor(6)))
		let msg = {
			 body: tweet[0],
			 author: tweet[1],
			 number: tweet[2] }
	 	 tweets.push(msg)
	 	 count+=1
 	}
    res.render('tweet', { tweets: tweets});
 });

// POST route wrapped in a GET route that tweets the displayed ('msg').
 app.get('/new_tweet/:msg', (req, res) => {
	 let status = req.params.msg

	 // ------------ https://gist.github.com/jaredpalmer/138f17a142d2d8770a1d752b0e00bd31
	 var postBody = {
	 	'status': status
	 };
	 oauth.post('https://api.twitter.com/1.1/statuses/update.json',
	 	twitter_user_access_token,  // oauth_token (user access token)
	     twitter_user_secret,  // oauth_secret (user secret)
	     postBody,  // post body
	     '',  // post content type ?
	 	function(err, data, res) {
	 		if (err) {
	 			console.log(err);
	 		}
	 	});
	res.redirect('https://twitter.com/writers_dead')
 });

// Listen on the port.
app.listen(port);

// Export the app for mocha tests.
module.exports = app;
