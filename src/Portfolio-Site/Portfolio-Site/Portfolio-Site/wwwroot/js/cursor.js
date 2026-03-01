const initializedCursors = new WeakSet();

let cursorRef;

function registerCursor(cursor, duration) {
    cursorRef = cursor;

    let xTo = gsap.quickTo("#" + cursor.id, "x", { duration: duration, ease: "back" }),
        yTo = gsap.quickTo("#" + cursor.id, "y", { duration: duration, ease: "back" });

    let cursorShow = gsap.quickTo(cursor, "opacity", { duration: 0.5, ease: "ease" }),
        cursorHide = gsap.quickTo(cursor, "opacity", { duration: 0.5, ease: "ease", delay: 3.0 });

    gsap.set(cursor, { xPercent: -50, yPercent: -50 });
    gsap.set(cursor, { opacity: 1 });

    window.addEventListener("mousemove", e => {
        xTo(e.clientX);
        yTo(e.clientY);

    //    cursorShow(1);
    //    cursorHide(0);
    });

    initializedCursors.add(cursor);
}

function registerCursors() {
    const cursors = document.querySelectorAll('.cursor');
    cursors.forEach(cursor => {
        if (!initializedCursors.has(cursor)) {
            registerCursor(cursor, cursor.getAttribute('data-duration'));
        }
    });
}
