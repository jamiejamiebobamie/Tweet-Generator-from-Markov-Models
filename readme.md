# Dead Writer Tweet Generator

This a web app that generates new text from the works of dead writers.
There are currently 7 dead authors on the site:

* The Brother's Grimm
* Edgar Allan Poe
* Oscar Wilde
* Virginia Woolf
* Lewis Carroll
* William Shakespeare
* HP Lovecraft

The new text is generated using Markov model in **public/scripts/tweet.js** and can be tweeted from the web app to the 'dead-writers' Twitter account.

The original code was written in Python as part of a class project. The repo for the class can be found here: https://github.com/jamiejamiebobamie/tweet-generator.

This project is no longer in active development. If you have any questions or comments regarding the app, please contact me at jmccrory@vt.edu.

## Deployment

The live site: http://dead-tweet-gen.herokuapp.com contains the working Markov model. Please visit the site to playaround with the built model.

## Built With

* Javascript ES5
* Node.js/Express.js
* Bootstrap and Handlebars

## Authors

* **Jamie McCrory**

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Flaws

The text cleaning process that happens before the Markov model is built does not clean the text for newline characters: '/n' which end up as their own tokens within the histogram. To create a better Markov model, newline characters should have been removed and punctuation should have been tokenized. Right now punctuation is part of the words they appear next to. So for example: "girl" and "girl!" are two different tokens. These two changes would have greatly improved the quality of the tweets and remain the focus of future efforts.

![alt text](./public/imgs/icon_jar.png)
