function toggleElementClass(element, className) {
    if (element instanceof HTMLElement && (typeof className === 'string' || className instanceof String)) {
        if (element.classList.contains(className)) {
            element.classList.remove(className);
        } else {
            element.classList.add(className);
        }
    }
}

function addElementClass(element, className) {
    if (element instanceof HTMLElement && (typeof className === 'string' || className instanceof String)) {
        element.classList.add(className);
    }
}

function removeElementClass(element, className) {
    if (element instanceof HTMLElement && (typeof className === 'string' || className instanceof String)) {
        element.classList.remove(className);
    }
}

function restartAnimation(element, className) {
    if (element instanceof HTMLElement && (typeof className === 'string' || className instanceof String)) {
        element.classList.remove(className);
        element.offsetHeight;
        element.classList.add(className);
    }
}

function executeAnimationOnce(element, className) {
    if (element instanceof HTMLElement && (typeof className === 'string' || className instanceof String)) {

        const callback = () => {
            element.removeEventListener("animationend", callback, false);
            element.classList.remove(className);
        };

        element.addEventListener("animationend", callback, false);
        element.classList.add(className);
    }
}

function setFocus(element) {
    if (element instanceof HTMLElement) {
        element.focus();
    }
}

function scrollToElement(elementId) {
    const element = document.getElementById(elementId);

    if (element) {
        let elementPos = element.getBoundingClientRect().top;
        window.scrollBy(0, elementPos);
    }
};

function getTransformValues(element) {
    const transform = window.getComputedStyle(element).getPropertyValue('transform');
    if (transform != 'none') {
        const matrix = transform.replace(/[^0-9\-.,]/g, '').split(',');

        return matrix;
    }
}

function navDrag(element, dragX, dragY) {
    let offset = 0;
    if (element.classList.contains('active')) {
        const transformMatrix = getTransformValues(element);
        if (transformMatrix !== undefined && transformMatrix !== null) {
            const y = transformMatrix[13] || transformMatrix[5]; //translate y

            offset = y;
        }
    }

    const toggleButton = element.querySelector('.nav-toggle');
    let dragPosition = Number(dragY);
    dragPosition -= Number(offset);
    dragPosition -= (toggleButton.clientHeight / 2);

    const dragValue = 'clamp(var(--toggle-max-drag-neg), ' + dragPosition + 'px, var(--toggle-max-drag-pos))';

    element.style.setProperty('--toggle-drag-position', dragValue);

    const toggleTracker = document.querySelector('#toggle-tracker');

    toggleTracker.style.setProperty('--toggle-tracker-pos-x', dragX + 'px');
    toggleTracker.style.setProperty('--toggle-tracker-pos-y', dragY + 'px');
}

function navDragEnd(element) {
    element.style.setProperty('--toggle-drag-position', 0 + 'px');
}

