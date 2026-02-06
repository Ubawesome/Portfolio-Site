
let currentBackground = 1;

function setupBackgroundSVGs() {
}

function morphBackground() {
    MorphSVGPlugin.convertToPath("#bg-pattern-one, #bg-pattern-two");
    if (currentBackground === 1) {
        currentBackground = 2;

        gsap.to('#bg-output', { duration: 0.5, morphSVG: '#bg-pattern-two' });
    } else if (currentBackground === 2) {
        currentBackground = 1;

        gsap.to('#bg-output', { duration: 0.5, morphSVG: '#bg-pattern-one' });
    }
}

window.setTimeout(setupBackgroundSVGs(), 100);
window.setInterval(morphBackground, 3000);
