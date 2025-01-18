window.addEventListener('DOMContentLoaded', () => {
    // Audio initialization
    const bgMusic = document.getElementById('bgMusic');
    
    // Start playing on user interaction (required by most browsers)
    document.addEventListener('click', () => {
        bgMusic.play();
    }, { once: true });

    const textElement = document.querySelector('.split-text');
    let mouseX = 0;
    let mouseY = 0;

    if (textElement) {
        const splitText = new SplitType('.split-text', {
            types: 'chars, words, lines',
            absolute: false
        });

        const glitchTexts = gsap.utils.toArray('.background-text');
        glitchTexts.forEach(text => {
            gsap.to(text, {
                skewX: "random(-20, 20)",
                skewY: "random(-10, 10)",
                duration: 0.2,
                repeat: -1,
                yoyo: true,
                ease: "rough({ template: none, strength: 1, points: 20, taper: none, randomize: true, clamp: false})"
            });
            
            gsap.to(text, {
                color: 'random([#FF0000, #00FF00, #0000FF, #FF00FF, #FFFF00])',
                duration: 0.5,
                repeat: -1,
                ease: "steps(1)",
                stagger: 0.1
            });

            // Add magnetic effect to each background text
            text.addEventListener('mousemove', (e) => {
                const rect = text.getBoundingClientRect();
                const distanceX = e.clientX - (rect.left + rect.width / 2);
                const distanceY = e.clientY - (rect.top + rect.height / 2);

                gsap.to(text, {
                    duration: 0.5,
                    x: distanceX * 0.2,
                    y: distanceY * 0.2,
                    rotation: distanceX * 0.02,
                    ease: "power2.out"
                });
            });

            text.addEventListener('mouseleave', () => {
                gsap.to(text, {
                    duration: 1,
                    x: 0,
                    y: 0,
                    rotation: 0,
                    ease: "elastic.out(1, 0.3)"
                });
            });
        });

        const tl = gsap.timeline();

        tl.from(splitText.chars, {
            duration: 1,
            opacity: 0,
            scale: 0,
            y: "random(-200, 200)",
            rotationZ: "random(-90, 90)",
            stagger: {
                amount: 1,
                from: "random"
            }
        })
        .to(splitText.chars, {
            duration: 1,
            y: -20,
            stagger: {
                amount: 0.5,
                from: "center",
                ease: "sine.inOut"
            }
        })
        .to(splitText.words, {
            duration: 1.5,
            rotationY: 360,
            transformOrigin: "50% 50% -100",
            stagger: 0.1
        })
        .to(splitText.chars, {
            duration: 0.5,
            opacity: 0,
            y: "+=100",
            scale: 0,
            stagger: {
                amount: 0.5,
                from: "random"
            }
        })
        .to('.intro-container', {
            duration: 1,
            scale: 1.2,
            opacity: 0,
            onComplete: () => {
                window.location.href = 'cards.html'
            }
        });

        gsap.to('.text-top', {
            xPercent: -50,
            scale: "random(0.5, 2)",
            rotation: 360,
            duration: 10,
            repeat: -1,
            ease: "none"
        });

        gsap.to('.text-bottom', {
            xPercent: 50,
            scale: "random(0.5, 2)",
            rotation: -360,
            duration: 10,
            repeat: -1,
            ease: "none"
        });

        gsap.to('.intro-gif', {
            filter: 'hue-rotate(360deg) blur(5px)',
            duration: 4,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });

        // Add mouse move handler for liquid effects
        document.addEventListener('mousemove', (e) => {
            mouseX = (e.clientX - window.innerWidth / 2) * 0.1;
            mouseY = (e.clientY - window.innerHeight / 2) * 0.1;
            
            gsap.to(splitText.chars, {
                duration: 0.5,
                x: mouseX * 0.1,
                y: mouseY * 0.1,
                rotation: mouseX * 0.05,
                ease: "power2.out",
                stagger: {
                    amount: 0.2,
                    from: "center"
                }
            });

            createLiquidTrail(e.clientX, e.clientY);
        });
    }
});

function createLiquidTrail(x, y) {
    const trail = document.createElement('div');
    trail.className = 'liquid-trail';
    document.body.appendChild(trail);

    gsap.set(trail, {
        x: x,
        y: y,
        scale: 0
    });

    gsap.to(trail, {
        duration: 1,
        scale: 3,
        opacity: 0,
        ease: "power4.out",
        onComplete: () => trail.remove()
    });
}