var video = document.getElementById("myVideo");
video.playbackRate = 1;

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
}

// var c = document.slides[slideIndex].children

button_9.addEventListener('click', function(e){
    location.href='https://twitter.com/writers_dead';
})

button_10.addEventListener('click', function(e){
    if (slideIndex+1 > slides.length) {slideIndex = 1};
    let number = slides[slideIndex+1].children[2].innerHTML;
    console.log(number)
    // let number = 0;
    storeSlideIndex = slideIndex;
    setEmptySlide();
    video.setAttribute("src", shocks[Math.floor(Math.random() * Math.floor(shocks.length))]);
    video.setAttribute("src", shocks[number]);
    video.playbackRate = 1.5;
    video.loop = false;
})

video.onended = function(e) {
    plusSlides(storeSlideIndex+1)
    video.setAttribute("src", clip);
    video.load();
    video.playbackRate = 1.3;
    video.loop = true;
};

button_11.addEventListener('click', function(e){
    location.href='https://github.com/jamiejamiebobamie/tweet-gen-js';
})

var $video  = $('video'),
    $window = $(window);

// Size dependent on height
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
