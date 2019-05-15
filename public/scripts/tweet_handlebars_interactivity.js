// screen.orientation.lock('landscape');

// var orientation = window.screen.orientation;

// console.log(orientation, window.matchMedia("(orientation: portrait)").matches, window.matchMedia("(orientation: landscape)").matches)

var video = document.getElementById("myVideo");
video.playbackRate = 1;

let firstTweetGenerated = false;
let tweetThis = false;

// let slideShow_container = document.getElementById('slideShow_container');

const button_9 = document.getElementById("Tweet");
const button_10 = document.getElementById("Jar");
const button_11 = document.getElementById("Github");

var clip = "/videos/idle1.mp4";
const clips = ["/videos/jar1-final.mp4", "/videos/jar2-final-C.mp4", "/videos/jar3-final-D.mp4", "/videos/jar4-final-F.mp4", "/videos/jar5-final-F.mp4", "/videos/jar6-final-B.mp4", "/videos/jar7-final-B.mp4", "/videos/1door-closed-A.mp4"]
const shocks = ["/videos/jar1-final.mp4", "/videos/jar2-final-C.mp4", "/videos/jar3-final-D.mp4", "/videos/jar4-final-F.mp4", "/videos/jar5-final-F.mp4", "/videos/jar6-final-B.mp4", "/videos/jar7-final-B.mp4"]

var slides = document.getElementsByClassName("mySlides");

let storeSlideIndex;
var slideIndex = 1;

showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function setEmptySlide(){
    showSlides(slideIndex = 1);
}

function showSlides(n) {
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  slides[slideIndex-1].style.display = "block";
  // slides[slideIndex-1].style.display = "block";
}

button_9.addEventListener('click', function(e){
    if (slideIndex-1 < 2) {slideIndex = slides.length-1}
    tweet = slides[slideIndex-1].children[0].innerHTML
    author = slides[slideIndex-1].children[1].innerHTML
    location.href='/new_tweet/' + tweet.toString() + " " + author.toString()
})

button_10.addEventListener('click', function(e){
    if (slideIndex > slides.length) {slideIndex = 1};
    console.log(slideIndex, slides[slideIndex].children[0].innerHTML)
    let number = slides[slideIndex].children[2].innerHTML;
    // console.log(slides[slideIndex+1].children[2].innerHTML)
    storeSlideIndex = slideIndex;
    setEmptySlide();
    // slideShow_container.style.backgroundColor = 'transparent';
    video.setAttribute("src", shocks[Math.floor(Math.random() * Math.floor(shocks.length))]);
    video.setAttribute("src", shocks[number]);
    video.playbackRate = 1.5;
    video.loop = false;
})

video.onended = function(e) {
    slideIndex = storeSlideIndex
    plusSlides(1)
    // slideShow_container.style.backgroundColor = 'black';
    video.setAttribute("src", clip);
    video.load();
    video.playbackRate = 1.3;
    video.loop = true;
    // console.log(slideIndex+1,slides[slideIndex].children[2].innerHTML)
};

button_11.addEventListener('click', function(e){
    location.href='https://github.com/jamiejamiebobamie/tweet-gen-js';
})

var $video  = $('video'),
    $window = $(window);

// if (firstTweetGenerated){
//
//
//     // someElement.classList.add('notransition'); // Disable transitions
//     // doWhateverCssChangesYouWant(someElement);
//     // someElement.offsetHeight; // Trigger a reflow, flushing the CSS changes
//     // someElement.classList.remove('notransition'); // Re-enable transitions
//     // Code for Chrome, Safari, and Opera
// document.getElementById("tweet_image").style.WebkitAnimationPlayState = "paused";
//
// // Standard syntax
// document.getElementById("tweet_image").style.animationPlayState = "paused";
//
// } else{
//
//
// // Code for Chrome, Safari, and Opera
// document.getElementById("tweet_image").style.WebkitAnimationPlayState = "paused";
//
// // Standard syntax
// document.getElementById("tweet_image").style.animationPlayState = "paused";
//
// }

// if (window.matchMedia("(orientation: portrait)").matches){
// // Size dependent on height
// $(window).resize(function(){
//     var height = $window.height();
//     $video.css('height', height);
//
//     var videoWidth = $video.width(),
//         windowWidth = $window.width(),
//     marginLeftAdjust =   (windowWidth - videoWidth) / 2;
//
//     $video.css({
//         'height': height,
//         'marginLeft' : marginLeftAdjust
//     });
// }).resize();
// } else {
// Size dependent on width
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

// }
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
