// const app = require('../app.js')
var video = document.getElementById("myVideo");
video.playbackRate = 1;

const button_1 = document.getElementById("Grimm");
const button_2 = document.getElementById("Poe");
const button_3 = document.getElementById("Wilde");
const button_4 = document.getElementById("Woolf");
const button_5 = document.getElementById("Carroll");
const button_6 = document.getElementById("Shakespeare");
const button_7 = document.getElementById("Lovecraft");
const button_8 = document.getElementById("Tweet");

const button_11 = document.getElementById("github");

const button_10 = document.getElementById("jar");

var titleElement = document.getElementById('title');
var open = false;
var tweet;

var clip = "/videos/idle1.mp4";
const clips = ["/videos/jar1-final.mp4", "/videos/jar2-final-C.mp4", "/videos/jar3-final-D.mp4", "/videos/jar4-final-F.mp4", "/videos/jar5-final-F.mp4", "/videos/jar6-final-B.mp4", "/videos/jar7-final-B.mp4", "/videos/1door-closed-A.mp4"]
const shocks = ["/videos/jar1-final.mp4", "/videos/jar2-final-C.mp4", "/videos/jar3-final-D.mp4", "/videos/jar4-final-F.mp4", "/videos/jar5-final-F.mp4", "/videos/jar6-final-B.mp4", "/videos/jar7-final-B.mp4"]

var grimmBool = false;
var poeBool = false;
var wildeBool = false;
var woolfBool = false;
var carrollBool = false;
var shakespeareBool = false;
var lovecraftBool = false;

var grimmPop = document.getElementById("myPopup1")
var poePop = document.getElementById("myPopup2")
var wildePop = document.getElementById("myPopup3")
var woolfPop = document.getElementById("myPopup4")
var carrollPop = document.getElementById("myPopup5")
var shakespearePop = document.getElementById("myPopup6")
var lovecraftPop = document.getElementById("myPopup7")


button_1.addEventListener('click', function(e){
    video.setAttribute("src", clips[0]);
    video.load();
    video.playbackRate = 1.2;
    video.loop = false;

})

button_2.addEventListener('click', function(e){
    video.setAttribute("src", clips[1]);
    video.load();
    video.playbackRate = 1.7;
    video.loop = false;
})

button_3.addEventListener('click', function(e){
    video.setAttribute("src", clips[2]);
    video.load();
    video.playbackRate = 1.4;
    video.loop = false;
})

button_4.addEventListener('click', function(e){
    video.setAttribute("src", clips[3]);
    video.load();
    video.playbackRate = 1.5;
    video.loop = false;
})

button_5.addEventListener('click', function(e){
    video.setAttribute("src", clips[4]);
    video.load();
    video.playbackRate = 1.4;
    video.loop = false;
})

button_6.addEventListener('click', function(e){
    video.setAttribute("src", clips[5]);
    video.load();
    video.playbackRate = 1.7;
    video.loop = false;
})

button_7.addEventListener('click', function(e){
    video.setAttribute("src", clips[6]);
    video.load();
    video.playbackRate = 1.7;
    video.loop = false;
})

button_8.addEventListener('click', function(e){
    location.href='https://twitter.com/writers_dead';
})

button_10.addEventListener('click', function(e){
    video.setAttribute("src", shocks[Math.floor(Math.random() * Math.floor(shocks.length))]);
    video.playbackRate = 1.5;
    video.loop = false;
    setTimeout(goHere,1000);
})

video.onended = function(e) {
    video.setAttribute("src", clip);
    video.load();
    video.playbackRate = 1.3;
    video.loop = true;
};

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
    marginLeftAdjust =   (windowHeight - videoHeight) / 2;

    $video.css({
        'width': width,
        'marginLeft' : marginLeftAdjust
    });
}).resize();

button_11.addEventListener('click', function(e){
    location.href='https://github.com/jamiejamiebobamie/tweet-gen-js';
})


// When the user clicks on <div>, open the popup
function myFunction1() {
    if (grimmBool == false) {
    let popup = document.getElementById("myPopup1");
    popup.classList.toggle("show");
    grimmBool = true;
    showHide("grimm");
}
};

function myFunction2() {
    if (poeBool == false) {
    let popup = document.getElementById("myPopup2");
    popup.classList.toggle("show");
    poeBool = true;
    showHide("poe");
}
};

function myFunction3() {
    if (wildeBool == false) {
    let popup = document.getElementById("myPopup3");
    popup.classList.toggle("show");
    wildeBool = true;
    showHide("wilde");
}
};

function myFunction4() {
    if (woolfBool == false) {
    let popup = document.getElementById("myPopup4");
    popup.classList.toggle("show");
    woolfBool = true;
    showHide("woolf");
}
};

function myFunction5() {
    if (carrollBool == false) {
    let popup = document.getElementById("myPopup5");
    popup.classList.toggle("show");
    carrollBool = true;
    showHide("carroll");
}
};

function myFunction6() {
    if (shakespeareBool == false) {
    let popup = document.getElementById("myPopup6");
    popup.classList.toggle("show");
    shakespeareBool = true;
    showHide("shakespeare");
}
};

function myFunction7() {
    if (lovecraftBool == false) {
    let popup = document.getElementById("myPopup7");
    popup.classList.toggle("show");
    lovecraftBool = true;
    showHide("lovecraft");
}
};


function showHide(on) {
if ("grimm" != on && grimmBool == true){
    grimmPop.classList.toggle("show");
    grimmBool = false;
}

if ("poe" != on && poeBool == true){
    poePop.classList.toggle("show");
    poeBool = false;
}

if ("wilde" != on && wildeBool == true){
    wildePop.classList.toggle("show");
    wildeBool = false;
}

if ("woolf" != on && woolfBool == true){
    woolfPop.classList.toggle("show");
    woolfBool = false;
}

if ("carroll" != on && carrollBool == true){
    carrollPop.classList.toggle("show");
    carrollBool = false;
}

if ("shakespeare" != on && shakespeareBool == true){
    shakespearePop.classList.toggle("show");
    shakespeareBool = false;
}

if ("lovecraft" != on && lovecraftBool == true){
    lovecraftPop.classList.toggle("show");
    lovecraftBool = false;
}

}

// $( function() {
// 		$( ".jar_image" ).mgGlitch({
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

function goHere(){
        // location.href='/tweet';
        // location.href='new_tweet/:msg';
        // location.href='https://twitter.com/writers_dead';
        location.href='/';
}
