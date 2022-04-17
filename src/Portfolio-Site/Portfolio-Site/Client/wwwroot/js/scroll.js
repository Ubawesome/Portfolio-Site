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
function setTransform(element, transform) {
    element.style.transform = transform
    element.style.WebkitTransform = transform
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
    let scrollableList = document.querySelectorAll('.scrollable');
    let backgroundList = document.querySelectorAll('.scrollable > .scrollable-background');
    let titleList = document.querySelectorAll('.scrollable > .scrollable-title');

    let scroll = (window.scrollY || window.pageYOffset);

    if (scrollableList !== null) {
        scrollableList.forEach(function (scrollable) {
            let currentScroll = scrollable.getBoundingClientRect().top;

            if (scrollable.hasAttribute('data-scroll-speed')) {
                currentScroll = currentScroll * scrollable.getAttribute('data-scroll-speed');
            }

            currentScroll = Math.min(currentScroll, 0);

            let children = scrollable.childNodes;
            children.forEach(function (child) {
                let scrollSpeed = 1;

                if (child.hasAttribute('data-scroll-speed')) {
                    scrollSpeed = child.getAttribute('data-scroll-speed');
                }

                let scrollAmount = currentScroll * scrollSpeed;
                //let scrollAmount = Math.min((currentScroll * scrollSpeed), 0);

                let scrollTransform = 'translateY(' + scrollAmount + 'px)' // translateZ(-10px) scale(2)';

                setTransform(child, scrollTransform);
            });
        });
    }



    //if (backgroundList !== null) {
    //    backgroundList.forEach(function (background) {
    //        let currentScroll = scroll - background.getBoundingClientRect().top;
    //        //console.log('background scroll is ' + currentScroll + ', scroll is ' + scroll)

    //        let backgroundScroll = 'translateY(' + currentScroll * backgroundScrollRatio + 'px)';
    //        let backgroundScale = 'translateZ(' + ((currentScroll * backgroundScaleRatio) - 10) + 'px) scale(2)';

    //        let backgroundTransform = backgroundScroll + ' ' + backgroundScale;


    //        setTransform(background, backgroundTransform);
    //    });
    //}

    //if (titleList !== null) {
    //    titleList.forEach(function (title) {
    //        let currentScroll = scroll - title.getBoundingClientRect().top;
    //        let titleScroll = 'translateY(' + currentScroll * titleScrollRatio + 'px)';

    //        setTransform(title, titleScroll);
    //    });
    //}




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
window.addEventListener('scroll', updateNavScroll);
window.addEventListener('scroll', updateScroll);

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
