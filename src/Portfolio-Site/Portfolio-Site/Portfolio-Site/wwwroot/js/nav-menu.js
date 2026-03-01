//gsap.registerPlugin(Observer);

const paths = new Map();
const initialized = new WeakSet();

let isFollowing = false,
    isExpanded = false;
let targetX = 0, targetY = 0;
let navWidth = 0;
let navHeight = 0;

const defaultYOffset = 32;
const yDistanceMaxMult = 5;

const legLengthDefault = 64;
const legHeightDefault = 32;
const capsuleWidth = 48;

const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

function init() {
    let nav = document.querySelector("#primary-nav");
    let bg = document.querySelector('#nav-bg');
    let bgPath = document.querySelector('#nav-bg-path');
    let navToggle = document.querySelector('.nav-toggle');

    const navHeight = nav.offsetHeight;

    targetX = nav.offsetWidth / 2;
    targetY = navHeight + defaultYOffset;

    ScrollTrigger.observe({
        target: navToggle,
        type: "touch,pointer",
        preventDefault: true,
        onChange: ({ isDragging, x, y }) => {
            if (isFollowing === true) {
                targetX = clampTargetX(x);
                targetY = clampTargetY(y);
                updatePath(bgPath);
                updateToggleButton();
            }
        },
        onPress: ({ x, y }) => {
            isFollowing = true;
            targetX = clampTargetX(x);
            targetY = clampTargetY(y);
            updatePath(bgPath);
            updateToggleButton();
        },
        onRelease: () => {
            cancelFollowing();
        //    targetY = navHeight + defaultYOffset;
        //    updatePath(bgPath);
        //    updateToggleButton();
        },
        onDragEnd: () => {
            cancelFollowing();
        //    targetY = navHeight + defaultYOffset;
        //    updatePath(bgPath);
        //    updateToggleButton();
        }
    });

    window.addEventListener("resize", e => {
        updateToggleButton();
        updatePath(bgPath);
    });

    updateToggleButton();
    updatePath(bgPath);
}

function clampTargetX(x) {
    let xClamped = clamp(x, capsuleWidth, navWidth - capsuleWidth);

    return xClamped;
}

function clampTargetY(y) {
    let yDistance = clamp(y - navHeight, 0, legHeightDefault * yDistanceMaxMult);

    return yDistance + navHeight;
}

function updateToggleButton() {
    let navToggle = document.querySelector('.nav-toggle');

    gsap.to(navToggle, {
        xPercent: -50,
        yPercent: -50,
        x: targetX,
        y: targetY,
        duration: 1.5,
        ease: "elastic"
    });
}

function updatePath(element) {
    let newPath = calculatePath();

    gsap.to(element,
        {
            morphSVG: newPath,
            duration: 1.5,
            ease: "elastic"
        });

    paths.set(element.id, newPath);
    //element.setAttribute('d', newPath);
}

function cancelFollowing() {
    const bgPath = document.querySelector('#nav-bg-path');

    isFollowing = false;
    targetY = navHeight + defaultYOffset;

    updatePath(bgPath);
    updateToggleButton();
}

function calculatePath() {
    let nav = document.querySelector("#primary-nav");
    navWidth = nav.offsetWidth;
    navHeight = nav.offsetHeight;

    let yDistance = targetY - navHeight; //clamp(targetY - navHeight, 0, legHeightDefault * yDistanceMaxMult);

    let legLengthMult = yDistance / legHeightDefault;

    let legLength = legLengthDefault * legLengthMult;
    let legHeight = yDistance;

    const bgPathStart = "M 0 0 H 0 L 0 " + navHeight + " ";
    const bgPathEnd = " L " + navWidth + " " + navHeight + " L " + navWidth + " 0 z";

    const leftLegPath = "L " + (targetX - (legLength + (capsuleWidth / 2))) + " " + navHeight + " q " + legLength + " 0 " + legLength + " " + legHeight;
    const capsulePath = "l " + capsuleWidth + " 0 ";
    const rightLegPath = "q 0 " + (legHeight * -1) + " " + legLength + " " + (legHeight * -1);


    let newPath = bgPathStart + leftLegPath + capsulePath + rightLegPath + "" + bgPathEnd;
    //let newPath = bgPathStart + bgPathEnd;


    return newPath;
}

registerObserverCallback(() => {
    const bgPath = document.querySelector('#nav-bg-path');

    if (!initialized.has(bgPath)) {
        initialized.add(bgPath);
        init();
    }
});

//const observer_navMenu = new MutationObserver(() => {
//    const bgPath = document.querySelector('#nav-bg-path');

//    if (!initialized.has(bgPath)) {
//        initialized.add(bgPath);
//        init();
//    }
//});

//observer_navMenu.observe(document.body, { childList: true, subtree: true });