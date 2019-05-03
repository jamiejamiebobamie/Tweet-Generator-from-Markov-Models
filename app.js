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

const generator = require('./public/scripts/tweet.js');
// console.log(generator.chooseRandomFile())

const port = process.env.PORT || 13000;

var tGrimm;
var tPoe;
var tWilde;
var tWoolf;
var tCarroll;
var tShakespeare;
var tLovecraft;
var status;

 app.get('/', (req, res) => {
     var num;
     tGrimm = run(0);
     tPoe = run(1);
     tWilde = run(2);
     tWoolf = run(3);
     tCarroll = run(4);
     tShakespeare = run(5);
     tLovecraft = run(6);
     res.render('tweet', { msg1: tGrimm, msg2: tPoe, msg3: tWilde, msg4: tWoolf, msg5: tCarroll, msg6: tShakespeare, msg7: tLovecraft});

     status = [tGrimm, tPoe, tWilde, tWoolf, tCarroll, tShakespeare, tLovecraft];
 });

 app.get('/tweet2', (req, res) => {
     var num;
     tGrimm = run(0);
     tPoe = run(1);
     tWilde = run(2);
     tWoolf = run(3);
     tCarroll = run(4);
     tShakespeare = run(5);
     tLovecraft = run(6);
     status = [tGrimm, tPoe, tWilde, tWoolf, tCarroll, tShakespeare, tLovecraft];
     res.render('tweet2', { msg1: tGrimm, msg2: tPoe, msg3: tWilde, msg4: tWoolf, msg5: tCarroll, msg6: tShakespeare, msg7: tLovecraft});
 });

// ------------ https://gist.github.com/jaredpalmer/138f17a142d2d8770a1d752b0e00bd31


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
