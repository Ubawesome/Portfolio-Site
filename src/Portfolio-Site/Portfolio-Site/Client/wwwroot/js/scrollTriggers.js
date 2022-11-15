
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

        // Navbar updates
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

        // Background color effect

        const bgOverlay = section.querySelector('.section-bg-overlay');

        const sectionTimeline = gsap.timeline({
            scrollTrigger: {
                id: id,
                trigger: section,
                start: 'top top',
                end: 'bottom top',
                markers: true,
                scrub: true,
                toggleActions: "play none reverse none",
                invalidateOnRefresh: true
            },
        });

        sectionTimeline.to(bgOverlay, {
            opacity: 0
        }).to(bgOverlay, {
            opacity: 1
        }).to(bgOverlay, {
            opacity: 1
        }).to(bgOverlay, {
            opacity: 0
        });

        //gsap.to(bgOverlay, {
        //    scrollTrigger: {
        //        id: id,
        //        trigger: section,
        //        start: 'top top',
        //        end: 'top bottom',
        //        markers: true,
        //        scrub: true
        //    },
        //    ease: 'linear',
        //    keyFrames: [
        //        { opacity: 0 },
        //        { opacity: 100 },
        //        { opacity: 0 }

        //    ]
        //});
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
                    scrub: true,
                    invalidateOnRefresh: true
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

