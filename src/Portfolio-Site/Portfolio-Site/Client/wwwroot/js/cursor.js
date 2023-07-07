function registerCursor(cursor) {
    let xTo = gsap.quickTo(cursor, "x", { duration: 2, ease: "power3" }),
        yTo = gsap.quickTo(cursor, "y", { duration: 1.5, ease: "power3" });

    gsap.set(cursor, { xPercent: -50, yPercent: -50 });

    window.addEventListener("mousemove", e => {
        xTo(e.clientX);
        yTo(e.clientY);
    });
}