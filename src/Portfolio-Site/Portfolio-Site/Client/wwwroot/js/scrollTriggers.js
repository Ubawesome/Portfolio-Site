
gsap.registerPlugin(ScrollTrigger);


function setUpNavTriggers() {
    const nav = document.querySelector('#primary-nav');
    const toggle = document.querySelector('#toggle-capsule');

    gsap.to(nav, {
        scrollTrigger: {
            trigger: '#home',
            start: '-1px top',
            end: () => {
                return 'bottom+=' + (nav.offsetHeight * -1) + ' top';
            },
            markers: true,
            scrub: true
        },
        ease: 'linear',
        top: 0
    });

    ScrollTrigger.create({
        trigger: '#home',
        start: '-1px top',
        end: 'bottom top',
        markers: false,
        scrub: true,
        onEnter: () => {
            if (!window.matchMedia('(min-width: 1329px)').matches)
                return;

            nav.classList.add('active');
            toggle.classList.add('active');

            nav.classList.add('locked');
            toggle.classList.add('locked');
        },
        onEnterBack: () => {
            if (!window.matchMedia('(min-width: 1329px)').matches)
                return;

            nav.classList.add('active');
            toggle.classList.add('active');

            nav.classList.add('locked');
            toggle.classList.add('locked');
        },
        onLeave: () => {
            if (!window.matchMedia('(min-width: 1329px)').matches)
                return;

            nav.classList.remove('locked');
            toggle.classList.remove('locked');
        },
        onLeaveBack: () => {
            if (!window.matchMedia('(min-width: 1329px)').matches)
                return;

            nav.classList.remove('locked');
            toggle.classList.remove('locked');
        }
    });
}

function setUpSectionTriggers() {
    const sections = document.querySelectorAll('section');

    sections.forEach((section) => {
        const id = section.getAttribute('id');
        const item = document.querySelector("nav ul li a[data-scroll-to='" + id + "']")

        if (item !== null) {
            ScrollTrigger.create({
                trigger: section,
                start: 'top 25%',
                end: 'bottom 25%',
                toggleClass: { targets: item, className: 'active' }
            });
        }
    });
}

function setUpScrollableTriggers() {

    const scrollableList = document.querySelectorAll('.scrollable');

    scrollableList.forEach((scrollable) => {
        const height = scrollable.offsetHeight;

        let children = scrollable.childNodes;
        children.forEach((child) => {

            gsap.to(child, {
                scrollTrigger: {
                    trigger: scrollable,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true
                },
                translateY: (index, target, targets) => {
                    let scrollSpeed = 1;
                    if (target.hasAttribute('data-scroll-speed')) {
                        scrollSpeed = target.getAttribute('data-scroll-speed');
                    }

                    return String(height * scrollSpeed) + 'px';
                },
                ease: 'linear'
            });
        });
    });
}

