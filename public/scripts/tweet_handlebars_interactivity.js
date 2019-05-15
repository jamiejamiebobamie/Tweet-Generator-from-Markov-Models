var video = document.getElementById("myVideo");
video.playbackRate = 1;

var $video  = $('video'),
    $window = $(window);

// jQuery function to make the video size dependent on the window width
$(window).resize(function(){
    var width = $window.width();
    $video.css('width', width);

    var videoHeight = $video.height(),
        windowHeight = $window.height(),
    marginRightAdjust =   (windowHeight - videoHeight) / 2;

    $video.css({
        'width': width,
        'marginRight' : marginRightAdjust
    });
}).resize();

// NOT IMPLEMENTED: Booleans to control the CSS animations to guide UX.
let firstTweetGenerated = false;
let tweetThis = false;

// Buttons from the navbar/'hud'
const button_tweet = document.getElementById("Tweet");
const button_jar = document.getElementById("Jar");
const button_github = document.getElementById("Github");

// Idle clip and shock clips, shocks in order from left to right.
var clip = "/videos/idle1.mp4";
const shocks = ["/videos/jar1-final.mp4", "/videos/jar2-final-C.mp4", "/videos/jar3-final-D.mp4", "/videos/jar4-final-F.mp4", "/videos/jar5-final-F.mp4", "/videos/jar6-final-B.mp4", "/videos/jar7-final-B.mp4"]

//Tweets are sent to html div mySlides through node.js and handlebars {{each}} method.
var slides = document.getElementsByClassName("mySlides");

//slideIndex and a variable to store the current slideIndex when it gets reset to 1 (the empty slide)
let storeSlideIndex;
var slideIndex = 1;

// Boolean to stop the storeSlideIndex from being set to 1 between tweets.
// A 'true' value lets the program set the storeSlideIndex.
let storeSlideIndexBoolean = true;

//Slide functions not my own. Found off line
showSlides(slideIndex);
// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}
// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}
// I wrote this :D.
function setEmptySlide(){
    showSlides(slideIndex = 1);
}
// Not this though.
function showSlides(n) {
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  slides[slideIndex-1].style.display = "block";
}

// Tweet button functionality. Tweets the currently displayed tweet.
button_tweet.addEventListener('click', function(e){
    tweet = slides[slideIndex-1].children[0].innerHTML
    author = slides[slideIndex-1].children[1].innerHTML
    location.href='/new_tweet/' + tweet.toString() + " " + author.toString()
})

// Jar button functionality. Cycles through the tweets/slides and picks the correct shock to play.
button_jar.addEventListener('click', function(e){
    if (slideIndex > slides.length - 1 ) {slideIndex = 1};
    console.log(slideIndex)
    let number = slides[slideIndex].children[2].innerHTML;
    if (storeSlideIndexBoolean){
        storeSlideIndex = slideIndex; // store the current slide index.
        storeSlideIndexBoolean = false;
    }
    setEmptySlide(); // hide the slide to show the shock.
    video.setAttribute("src", shocks[number]);
    video.playbackRate = 1.5;
    video.loop = false;
})

// Once the shock clip is finished playing...
video.onended = function(e) {
    slideIndex = storeSlideIndex // Reset the slideIndex
    storeSlideIndexBoolean = true; // Allow the storeSlideIndex to be set to the current slideIndex
    plusSlides(1) // Increment the slideIndex
    video.setAttribute("src", clip); // Reset the video clip to idle.
    video.load();
    video.playbackRate = 1.3;
    video.loop = true;
};

// Github button functionality. Links to my Github.
button_github.addEventListener('click', function(e){
    location.href='https://github.com/jamiejamiebobamie/tweet-gen-js';
})


//NOT IMPLEMENTED. Glitch effect for text.
// $( function() {
// 		$( ".glitch" ).mgGlitch({
//           // set 'true' to stop the plugin
// 		  destroy : false,
//           // set 'false' to stop glitching
//           glitch: true,
//           // set 'false' to stop scaling
//           scale: true,
//           // set 'false' to stop glitch blending
//           blend : true,
//           // select blend mode type
//           blendModeType : 'hue',
//           // set min time for glitch 1 elem
//           glitch1TimeMin : 200,
//           // set max time for glitch 1 elem
//           glitch1TimeMax : 400,
//           // set min time for glitch 2 elem
//           glitch2TimeMin : 10,
//           // set max time for glitch 2 elem
//           glitch2TimeMax : 100,
// 		});
// });
