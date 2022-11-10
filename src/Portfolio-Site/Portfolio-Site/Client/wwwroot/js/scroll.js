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
    let toggle = document.querySelector('#toggle-capsule');
    let scroll = (window.scrollY || window.pageYOffset);

    if (scroll <= window.innerHeight) {
        primaryNav.classList.remove('active');
        toggle.classList.remove('active');
        toggle.classList.add('hide');
    } else {
        toggle.classList.remove('hide');
    }

    setTop(primaryNav, 'max(0px, 100vh - 5rem - ' + scroll + 'px)');
}


function updateSectionScroll() {
    let sections = document.querySelectorAll('section');
    let menuItems = document.querySelectorAll('nav ul li a');

    sections.forEach((s) => {
        let id = s.getAttribute('id');

        let top = window.scrollY;
        let offset = s.offsetTop;
        let height = s.offsetHeight;

        if (top >= offset && top < offset + height) {
            console.log('in section ' + id);
            menuItems.forEach((item) => {
                item.classList.remove('active');
                let href = item.getAttribute('data-scroll-to');
                if (href === id) {
                    item.classList.add('active');
                }
            })
        }
    });
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

                let scrollTransform = 'translateY(' + scrollAmount + 'px)' // translateZ(-10px) scale(2)';

                setTransform(child, scrollTransform);
            });
        });
    }
}

// Listen for `scroll` event to update `target` scroll position
window.addEventListener('scroll', updateNavScroll);
window.addEventListener('scroll', updateSectionScroll);
window.addEventListener('scroll', updateScroll);
