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

function executeAnimationOnce(elementInput, classInput) {

    if (elementInput instanceof HTMLElement && (typeof classInput === 'string' || classInput instanceof String)) {

        const callback = () => {
            elementInput.removeEventListener("animationend", callback, false);
            elementInput.classList.remove(classInput);
        };

        elementInput.addEventListener("animationend", callback, false);
        elementInput.classList.add(classInput);

    } else if (elementInput instanceof Array && classInput instanceof Array) {

        for (let i = 0; i < elementInput.length; i++) {
            const el = elementInput[i];
            const cl = classInput[i];

            if (el === null || cl === null) {
                continue;
            }

            const callback = () => {
                el.removeEventListener("animationend", callback, false);
                el.classList.remove(cl);
            };

            el.addEventListener("animationend", callback, false);
            el.classList.add(cl);
        }
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

function scrollToElementInContainer(element, container, direction) {
    if (element instanceof HTMLElement && container instanceof HTMLElement) {

        let elementPos = 0;
        if (direction === 'x') {
            elementPos = element.offsetLeft;
            container.scrollTo(elementPos, 0);
        } else if (direction === 'y') {
            elementPos = element.offsetTop;
            container.scrollTo(0, elementPos);
        }
    }
}

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

