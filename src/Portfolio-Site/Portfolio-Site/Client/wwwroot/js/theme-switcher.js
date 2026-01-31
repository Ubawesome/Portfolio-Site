const DEFAULT_DARK = '(prefers-color-scheme: dark)';
const DEFAULT_LIGHT = '(prefers-color-scheme: light)';
gsap.registerPlugin(MorphSVGPlugin);

function morphSVG(element, duration, morphElement) {
    gsap.to(element, { duration: duration, morphSVG: morphElement, });
}

function updateToggle(checked) {
    const themeSelect = document.querySelector("#theme-switcher");

    themeSelect.checked = checked;

    if (checked) {
        morphSVG('#light-theme-icon', 0.25, '#light-theme-icon');
    } else {
        morphSVG('#light-theme-icon', 0.25, '#dark-theme-icon');
    }
}

function updateClass(checked) {
    if (checked) {
        document.documentElement.classList.remove('dark');
        document.documentElement.classList.add('light');
    } else {
        document.documentElement.classList.remove('light');
        document.documentElement.classList.add('dark');
    }
}

function switchTheme(checked) {
    themeSwitcherChanged(checked);
}

function themeSwitcherChanged(checked) {
    if (!document.startViewTransition) {
        updateTheme(checked);
        return;
    }

    document.startViewTransition(() => {
        updateTheme(checked);
    });
}

function updateTheme(checked) {
    if (checked) {
        morphSVG('#light-theme-icon', 0.25, '#light-theme-icon');
        document.documentElement.style.setProperty('color-scheme', 'light');
        updateClass(checked);
    } else {
        morphSVG('#light-theme-icon', 0.25, '#dark-theme-icon');
        document.documentElement.style.setProperty('color-scheme', 'dark');
        updateClass(checked);
    }
}

function detectPreference() {
    if (!window.matchMedia) {
        return;
    }

    if (window.matchMedia(DEFAULT_DARK).matches) {
        updateToggle(false);
        updateClass(false);
    } else if (window.matchMedia(DEFAULT_LIGHT).matches) {
        updateToggle(true);
        updateClass(true);
    }
}

function detectPreferenceChanges() {
    if (!window.matchMedia) {
        return;
    }

    function listener({ matches, media }) {
        if (!matches) {
            return;
        }

        if (media === DEFAULT_DARK) {
            // Dark theme.
            switchTheme(false);
            updateToggle(false);
        } else if (media === DEFAULT_LIGHT) {
            // Light theme.
            switchTheme(true);
            updateToggle(true);
        }
    }

    const matchDark = window.matchMedia(DEFAULT_DARK);
    matchDark.addEventListener('change', listener);

    const matchLight = window.matchMedia(DEFAULT_LIGHT);
    matchLight.addEventListener('change', listener);
}
