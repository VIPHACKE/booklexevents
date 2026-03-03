gsap.registerPlugin(ScrollTrigger);

// ----------------------------------------------------
// 1. OP 3D HERO ENTRANCE ANIMATION (THE FLEX)
// ----------------------------------------------------
const tl = gsap.timeline();
document.body.style.overflow = "hidden"; // Prevent scroll till intro is done

// Initial states for dramatic entry
gsap.set("#bg", { scale: 1.5, opacity: 0 });
gsap.set(["#decoration1", "#decoration2"], { y: -300, opacity: 0, rotationX: 45 });
gsap.set("#splash", { scale: 0, opacity: 0, rotationZ: -180 });
gsap.set("#holi-text", { z: 500, scale: 3, opacity: 0 });
gsap.set([".floating-item", "#color1", "#color2", "#watergun1", "#watergun2"], { y: 500, opacity: 0, scale: 0.5 });
gsap.set(".reveal-text", { y: 50, opacity: 0 });

// The massive explosive entrance sequence
tl.to("#bg", { scale: 1, opacity: 1, duration: 2, ease: "power2.out" })
    .to(["#decoration1", "#decoration2"], { y: 0, opacity: 1, rotationX: 0, duration: 1.5, stagger: 0.2, ease: "bounce.out" }, "-=1.5")
    .to("#splash", { scale: 1, opacity: 0.8, rotationZ: 0, duration: 1.5, ease: "elastic.out(1, 0.4)" }, "-=1.2")
    .to("#holi-text", { z: 0, scale: 1, opacity: 1, duration: 1.5, ease: "power4.out" }, "-=1")
    .to(["#baloon1", "#baloon2", "#baloon3"], { y: 0, opacity: 1, scale: 1, duration: 1.5, stagger: 0.2, ease: "elastic.out(1, 0.5)" }, "-=1.2")
    .to(["#color1", "#color2"], { y: 0, opacity: 1, scale: 1, duration: 1, stagger: 0.2, ease: "back.out(1.5)" }, "-=1")
    .to(["#watergun1", "#watergun2"], { y: 0, opacity: 1, scale: 1, rotation: (i) => i === 0 ? -15 : 15, duration: 1, stagger: 0.2, ease: "back.out(1.5)" }, "-=0.8")
    .to(".reveal-text", { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power3.out" }, "-=0.5")
    .to("body", { overflow: "auto", overflowX: "hidden", duration: 0.1 });

// ----------------------------------------------------
// 2. CONSTANT 3D FLOATING (The OP vibe)
// ----------------------------------------------------
// Loop balloons
gsap.to(".floating-item", {
    y: "-=40",
    x: "+=20",
    rotationZ: "10",
    rotationY: "20",
    duration: 3,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
    stagger: { each: 0.5, from: "random" }
});

// Loop colors & waterguns
gsap.to(["#color1", "#color2", "#watergun1", "#watergun2"], {
    y: "+=25",
    rotationZ: "-5",
    duration: 4,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
    stagger: 0.3
});

// Loop splash scaling
gsap.to("#splash", {
    scale: 1.05,
    rotation: 2,
    duration: 5,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
});

// ----------------------------------------------------
// 3. MASSIVE SCROLLTRIGGER PARALLAX (The flex on scroll)
// ----------------------------------------------------
const heroScrollTl = gsap.timeline({
    scrollTrigger: {
        trigger: ".parallax-wrapper",
        start: "top top",
        end: "bottom top",
        scrub: 1,
        pin: true // Pin the hero scene while scrolling past it
    }
});

heroScrollTl
    .to("#bg", { scale: 1.2, y: "10%", filter: "brightness(0.3)" }, 0)
    .to("#holi-text", { y: "-150%", scale: 1.5, opacity: 0, filter: "blur(20px)" }, 0)
    .to(".hero-content", { y: "-100%", opacity: 0, scale: 1.2 }, 0)
    .to("#splash", { y: "-50%", scale: 2, opacity: 0 }, 0)
    .to("#baloon1", { y: "-300%", x: "-50%", rotation: -45, scale: 1.5 }, 0)
    .to("#baloon2", { y: "-400%", x: "50%", rotation: 45, scale: 2 }, 0)
    .to("#color1", { y: "-200%", x: "-50%", rotation: -30, scale: 1.5 }, 0)
    .to("#color2", { y: "-250%", x: "50%", rotation: 30, scale: 1.5 }, 0)
    .to("#watergun1", { x: "-100%", y: "-100%", rotation: -60, scale: 0.5 }, 0)
    .to("#watergun2", { x: "100%", y: "-150%", rotation: 60, scale: 0.5 }, 0);


// ----------------------------------------------------
// 4. CONTENT SECTIONS 3D REVEALS
// ----------------------------------------------------

// Reveal titles and text in content sections
gsap.utils.toArray(".gs-reveal").forEach(elem => {
    gsap.fromTo(elem,
        { opacity: 0, y: 100, scale: 0.8, rotationX: 45 },
        {
            opacity: 1,
            y: 0,
            scale: 1,
            rotationX: 0,
            duration: 1.2,
            ease: "back.out(1.5)",
            scrollTrigger: {
                trigger: elem,
                start: "top 85%",
                toggleActions: "play none none reverse"
            }
        }
    );
});

// Vision Cards Stagger
gsap.fromTo(".gs-card",
    { opacity: 0, y: 100, rotationY: 45 },
    {
        opacity: 1, y: 0, rotationY: 0, duration: 1, stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
            trigger: ".vision-cards",
            start: "top 80%"
        }
    }
);

// ----------------------------------------------------
// 5. DECORATIVE ELEMENTS SCROLL PARALLAX (SECTION IMAGES)
// ----------------------------------------------------

// Define an array of decorative image objects mapping selector to [y-distance, rotation]
const decors = [
    { s: ".s-b1", y: -300, r: 45 },
    { s: ".s-c1", y: -400, r: -45 },
    { s: ".s-splash", y: 200, r: 20 },
    { s: ".s-w1", x: 300, y: -200, r: 90 },
    { s: ".s-w2", x: -300, y: -200, r: -90 },
    { s: ".s-b2", y: -500, r: -30 },
    { s: ".s-b3", y: -400, r: 60 },
    { s: ".s-c2", y: -300, r: -20 }
];

decors.forEach(decor => {
    gsap.to(decor.s, {
        y: decor.y,
        x: decor.x || 0,
        rotationZ: decor.r,
        ease: "none",
        scrollTrigger: {
            trigger: decor.s,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5
        }
    });

    // Add continuous float to decor images so they feel alive
    gsap.to(decor.s, {
        y: "+=30",
        rotationZ: "+=5",
        duration: "random(3, 5)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });
});
