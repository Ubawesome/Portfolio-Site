const setFocus = (element) => {
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
