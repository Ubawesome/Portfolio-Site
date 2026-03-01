const registry = [];

function registerObserverCallback(callback) {
    registry.push(callback);

    callback();
}

const observer = new MutationObserver(() => {
    registry.forEach((callback) => {
        callback();
    });
});

observer.observe(document.body, { childList: true, subtree: true });
