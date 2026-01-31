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
            scrub: true,
            invalidateOnRefresh: true
        },
        ease: 'linear',
        top: 0
    });

    ScrollTrigger.create({
        trigger: '#home',
        start: '-1px top',
        end: 'bottom top',
        scrub: true,
        invalidateOnRefresh: true,
        onEnter: () => {
            if (window.matchMedia('(width <= 1400px)').matches)
                return;

            nav.classList.add('active');
            toggle.classList.add('active');

            nav.classList.add('locked');
            toggle.classList.add('locked');
        },
        onEnterBack: () => {
            if (window.matchMedia('(width <= 1400px)').matches)
                return;

            nav.classList.add('active');
            toggle.classList.add('active');

            nav.classList.add('locked');
            toggle.classList.add('locked');
        },
        onLeave: () => {
            if (window.matchMedia('(width <= 1400px)').matches)
                return;

            nav.classList.remove('locked');
            toggle.classList.remove('locked');
        },
        onLeaveBack: () => {
            if (window.matchMedia('(width <= 1400px)').matches)
                return;

            nav.classList.remove('locked');
            toggle.classList.remove('locked');
        }
    });
}

function setUpSectionTriggers() {
    const sections = document.querySelectorAll('section');
    const indicator = document.querySelector('.section-indicator');

    let leftTo = gsap.quickTo(indicator, "left", { duration: 0.5, ease: "power3" }),
        topTo = gsap.quickTo(indicator, "top", { duration: 0.5, ease: "power3" }),
        widthTo = gsap.quickTo(indicator, "width", { duration: 0.5, ease: "power3" });

    const windowSizeMatch = window.matchMedia('(width <= 1400px)');

    function listener({ matches, media }) {
        if (!matches) {
            return;
        }

        updateCurrentSection(null, leftTo, topTo, widthTo);
    }

    sections.forEach((section) => {

        // Navbar updates
        const id = section.getAttribute('id');
        const item = document.querySelector("nav ul li a[data-scroll-to='" + id + "']")

        if (item !== null) {
            ScrollTrigger.create({
                trigger: section,
                start: 'top 10%',
                end: 'bottom 10%',
                markers: false,
                invalidateOnRefresh: true,
                toggleClass: { targets: item, className: 'active' },
                onToggle: ({ progress, direction, isActive }) => isActive ? updateCurrentSection(item, leftTo, topTo, widthTo) : null,
            });
        }

        let sectionScrollers = section.querySelectorAll('.section-scroller');

        if (sectionScrollers !== null) {
            sectionScrollers.forEach((scroller) => {
                let sticky = false;
                if (scroller.hasAttribute('data-sticky')) {
                    sticky = scroller.getAttribute('data-sticky');
                }

                ScrollTrigger.create({
                    trigger: section,
                    start: 'top top-=100%',
                    end: 'bottom center',
                    pin: scroller,
                    pinSpacing: false,
                    invalidateOnRefresh: true,
                    toggleClass: { targets: scroller, className: 'active' }
                });

                gsap.fromTo(scroller, {
                    letterSpacing: "0.15em",
                    fontWeight: "100",
                    margin: "4rem 1rem",
                }, {
                    scrollTrigger: {
                        trigger: section,
                        start: 'top top-=100%',
                        end: 'bottom center',
                        scrub: 2,
                        invalidateOnRefresh: true,
                    },
                    letterSpacing: "0.5em",
                    fontWeight: "700",
                    margin: "4rem 1rem",
                    ease: 'linear'
                });
            });
        }
    });

    windowSizeMatch.addEventListener('change', listener);
}

function updateCurrentSection(item, leftTo, topTo, widthTo) {
    if (item === null) {
        item = document.querySelector("nav .nav-link.active");
    }
    const bounds = item.getBoundingClientRect();

    if (window.matchMedia('(width <= 1400px)').matches) {
        leftTo(0);
        topTo(item.offsetTop + item.offsetHeight);
    } else {
        leftTo(item.offsetLeft);
        topTo(item.offsetHeight);
    }
    widthTo(item.offsetWidth);
    //    gsap.quickTo(indicator, { left: item.offsetLeft, width: item.offsetWidth, duration: 0.5, ease: 'power3' });
}

function setUpScrollableTriggers() {

    const scrollableList = document.querySelectorAll('.scrollable');

    scrollableList.forEach((scrollable) => {
        const height = scrollable.offsetHeight;

        let children = scrollable.childNodes;
        children.forEach((child) => {
            let scrollSpeed = 1;
            if (child.hasAttribute('data-scroll-speed')) {
                scrollSpeed = child.getAttribute('data-scroll-speed');
            }
            let scrollOffset = 0;
            if (child.hasAttribute('data-scroll-offset')) {
                scrollOffset = child.getAttribute('data-scroll-offset');
            }
            let sticky = false;
            if (child.hasAttribute('data-sticky')) {
                sticky = child.getAttribute('data-sticky');
            }

            gsap.set(child, {
                translateY: (index, target, targets) => String(height * scrollOffset) + 'px',
            })

            gsap.fromTo(child, {
                translateY: (index, target, targets) => String(height * scrollOffset) + 'px',
            }, {
                scrollTrigger: {
                    trigger: scrollable,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: 2,
                    pin: sticky,
                    invalidateOnRefresh: true,
                },
                translateY: (index, target, targets) => String((height * scrollOffset) + (height * scrollSpeed)) + 'px',
                ease: 'linear'
            });
        });
    });
}

function setUpGlideTrigger(container, element, animationSpeed = 1, triggerStart = 'top bottom', triggerEnd = 'bottom top') {

    const glideTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: (container !== null) ? container : element,
            start: triggerStart,
            end: triggerEnd,
            scrub: 1,
            toggleActions: 'play none reverse none',
            invalidateOnRefresh: true
        },
    });

    glideTimeline.from(element, {
            duration: 5,
            y: () => (100 * animationSpeed) + '%',
            opacity: 0,
            ease: 'linear'
    })
        .fromTo(element, {
            y: () => (10 * animationSpeed) + '%',
            opacity: 1,
        }, {
            y: 0,
            duration: 1,
            ease: 'linear'
        })
        .to(element, {
            duration: 1,
            y: () => (-20 * animationSpeed) + '%',
            opacity: 1,
            ease: 'linear'
        })
        .to(element, {
            duration: 5,
            y: () => (-100 * animationSpeed) + '%',
            opacity: 0,
            ease: 'linear'
        });
}

function setUpSliderTrigger(slider) {
    const sliderContent = slider.querySelector('.slider-content');
    const sliderControls = slider.querySelector('.slider-controls');

    if (sliderContent == null)
        return;

    const children = sliderContent.children;

    Array.from(children).forEach((child) => {
        gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
                scroller: sliderContent,
                horizontal: true,
                trigger: child,
                start: "left right",
                end: "right left",
                scrub: true,
            }
        }).from(child, {
            //scale: 0.75,
            opacity: 0.5
        }).to(child, {
            //scale: 0.75,
            opacity: 0.5
        });

        const id = child.getAttribute('id');
        const itemButton = sliderControls.querySelector("[data-item='" + id + "']")

        let classTargets = [];

        if (itemButton !== null) {
            classTargets = [child, itemButton];
        } else {
            classTargets = [child];
        }

        ScrollTrigger.create({
            scroller: sliderContent,
            horizontal: true,
            trigger: child,
            start: 'center right',
            end: 'center left',
            toggleClass: { targets: classTargets, className: 'active' }
        });
    });


}

