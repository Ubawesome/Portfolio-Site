function toggleElementClass(element, className) {
    if (element instanceof HTMLElement && (typeof className === 'string' || className instanceof String)) {
        if (element.classList.contains(className)) {
            element.classList.remove(className);
        } else {
            element.classList.add(className);
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
