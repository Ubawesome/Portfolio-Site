function registerCursor(cursor, duration) {
    let xTo = gsap.quickTo(cursor, "x", { duration: duration, ease: "back" }),
        yTo = gsap.quickTo(cursor, "y", { duration: duration, ease: "back" });

    gsap.set(cursor, { xPercent: -50, yPercent: -50 });

    window.addEventListener("mousemove", e => {
        xTo(e.clientX);
        yTo(e.clientY);
    });
}

function registerCursors() {
    const cursors = document.querySelectorAll('.cursor');

    cursors.forEach((cursor) => {
        registerCursor(cursor, cursor.getAttribute('data-duration'));
    });
}

//window.addEventListener('DOMContentLoaded', registerCursors);
//registerCursors();