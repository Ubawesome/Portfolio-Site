const clamp = (num, min, max) => Math.min(Math.max(num, min), max);
const map_range = (value, low1, high1, low2, high2) => low2 + (high2 - low2) * (value - low1) / (high1 - low1);


// Current scroll position
var current = 0
// Target scroll position
var target = 0
// Ease or speed for moving from `current` to `target`
var ease = 0.075
// Utility variables for `requestAnimationFrame`
var rafId = undefined
var rafActive = false


let backgroundScrollRatio = 0.5
let backgroundScaleRatio = 0.001
let foregroundScrollRatio = 0.8
let titleScrollRatio = -0.4

// Container element
//var splash = document.querySelector('.splash')

// Variables for storing dimmensions
var windowWidth, containerHeight, imageHeight


// Set CSS `tranform` property for an element
function setTransform(el, transform) {
    el.style.transform = transform
    el.style.WebkitTransform = transform
}

function setTop(element, top) {
    element.style.top = top;
}

function setScroll(element, scroll) {
    //element.dataset.scroll = scroll;
    element.setAttribute('data-scroll', scroll);
}


function updateNavScroll() {
    let primaryNav = document.querySelector('#primary-nav');
    let scroll = (window.scrollY || window.pageYOffset);

    setTop(primaryNav, 'max(0px, 100vh - 10rem - ' + scroll + 'px)');
}

// Update scroll `target`, and start the animation if it is not running already
function updateScroll() {

    let backgroundList = document.querySelectorAll('.scrollable > .scrollable-background');
    let titleList = document.querySelectorAll('.scrollable > .scrollable-title');


    // scroll 0, 100vh - 8rem
    // scrol 100vh, 0
    //setTop(primaryNav, 'clamp(0, ' + scroll + 'px + 100vh - 10rem, 100vh - 10rem)');
    setTop(primaryNav, 'max(0px, 100vh - 10rem - ' + scroll + 'px)');

    if (backgroundList !== null) {
        backgroundList.forEach(function (background) {
            let currentScroll = scroll - background.getBoundingClientRect().top;

            //console.log('background scroll is ' + currentScroll + ', scroll is ' + scroll)

            let backgroundScroll = 'translateY(' + currentScroll * backgroundScrollRatio + 'px)';
            let backgroundScale = 'translateZ(' + ((currentScroll * backgroundScaleRatio) - 10) + 'px) scale(2)';

            let backgroundTransform = backgroundScroll + ' ' + backgroundScale;


            setTransform(background, backgroundTransform);
        });
    }

    if (titleList !== null) {
        titleList.forEach(function (title) {
            let currentScroll = scroll - title.getBoundingClientRect().top;
            let titleScroll = 'translateY(' + currentScroll * titleScrollRatio + 'px)';

            setTransform(title, titleScroll);
        });
    }


//    let backgroundScroll = 'translateY(' + currentScroll * backgroundScrollRatio + 'px)';
//    let backgroundScale = 'translateZ(' + map_range(currentScroll * backgroundScaleRatio, 0, 1000, -10, 1000) + 'px) scale(2)';

//    let backgroundTransform = backgroundScroll + ' ' + backgroundScale;

//    let titleScroll = 'translateY(' + currentScroll * titleScrollRatio + 'px)';

//    if (backgroundList !== null) {
//        backgroundList.forEach(function (background) {
//            setTransform(background, backgroundTransform);
//        });

//    }

//    if (titleList !== null) {
//        titleList.forEach(function (title) {
//            setTransform(title, titleScroll);
//        });
//    }
}

// Listen for `scroll` event to update `target` scroll position
window.addEventListener('scroll', updateScroll)
window.addEventListener('scroll', updateNavScroll)

// Start the animation, if it is not running already
//function startAnimation() {
//    if (!rafActive) {
//        rafActive = true
//        rafId = requestAnimationFrame(updateAnimation)
//    }
//}


//// Do calculations and apply CSS `transform`s accordingly
//function updateAnimation() {
//    var diff = target - current
//    var delta = Math.abs(diff) < 0.1 ? 0 : diff * ease

//    if (delta) {
//        current += delta
//        current = parseFloat(current.toFixed(2))
//        rafId = requestAnimationFrame(updateAnimation)
//    } else {
//        current = target
//        rafActive = false
//        cancelAnimationFrame(rafId)
//    }

//    // Set the CSS `transform` corresponding to the custom scroll effect
//    setTransform(scroller, 'translateY(' + -current + 'px)')
//}
