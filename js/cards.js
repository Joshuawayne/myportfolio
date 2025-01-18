document.addEventListener('DOMContentLoaded', () => {
    // Card animations setup
    const cards = document.querySelectorAll('.card');
    
    // Initialize typing animation with safety check
    if (typeof Typed !== 'undefined') {
        const typed = new Typed('#typed-text', {
            strings: ['Developer', 'Designer', 'Creative', 'Innovator'],
            typeSpeed: 50,
            backSpeed: 30,
            loop: true,
            backDelay: 1500
        });
    }

    // Floating words animation
    const words = document.querySelectorAll('.word');
    words.forEach(word => {
        gsap.to(word, {
            y: "random(-20, 20)",
            x: "random(-20, 20)",
            duration: "random(3, 5)",
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });
    });

    // Card floating animation
    cards.forEach(card => {
        gsap.to(card, {
            y: "random(-20, 20)",
            rotation: "random(-5, 5)",
            duration: "random(2, 3)",
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });
    });

    // Mouse movement interaction
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX;
        const mouseY = e.clientY;

        cards.forEach(card => {
            const rect = card.getBoundingClientRect();
            const cardX = rect.left + rect.width / 2;
            const cardY = rect.top + rect.height / 2;

            const distX = mouseX - cardX;
            const distY = mouseY - cardY;
            const distance = Math.sqrt(distX * distX + distY * distY);
            const speed = parseFloat(card.getAttribute('data-speed'));

            if (distance < 400) {
                gsap.to(card, {
                    x: -distX * speed * 0.05,
                    y: -distY * speed * 0.05,
                    rotation: -distX * speed * 0.02,
                    duration: 0.6,
                    ease: "power2.out"
                });
            }
        });
    });

    // Card click transition
    cards.forEach(card => {
        card.addEventListener('click', () => {
            gsap.to(card, {
                scale: 0,
                opacity: 0,
                rotation: "random(-180, 180)",
                x: "random(-500, 500)",
                y: "random(-500, 500)",
                duration: 1.5,
                ease: "power2.inOut",
                onComplete: () => {
                    window.location.href = 'index.html';
                }
            });

            cards.forEach(otherCard => {
                if (otherCard !== card) {
                    gsap.to(otherCard, {
                        scale: 0,
                        opacity: 0,
                        rotation: "random(-90, 90)",
                        x: "random(-300, 300)",
                        y: "random(-300, 300)",
                        duration: 1,
                        ease: "power2.inOut"
                    });
                }
            });
        });
    });
});
