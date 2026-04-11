/* =========================================
   SPACE PORTFOLIO - JavaScript
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {

    // ─── Animated Star Field ──────────────────────────────────
    const canvas = document.getElementById('starsCanvas');
    const ctx = canvas.getContext('2d');
    let stars = [];
    const STAR_COUNT = 200;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    function createStars() {
        stars = [];
        for (let i = 0; i < STAR_COUNT; i++) {
            stars.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 1.5 + 0.3,
                opacity: Math.random(),
                speed: Math.random() * 0.5 + 0.1,
                twinkleSpeed: Math.random() * 0.02 + 0.005,
                twinkleDirection: Math.random() > 0.5 ? 1 : -1
            });
        }
    }

    function drawStars() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        stars.forEach(star => {
            // Twinkle effect
            star.opacity += star.twinkleSpeed * star.twinkleDirection;
            if (star.opacity >= 1) { star.twinkleDirection = -1; }
            if (star.opacity <= 0.2) { star.twinkleDirection = 1; }

            // Slow drift
            star.y += star.speed * 0.1;
            if (star.y > canvas.height) {
                star.y = 0;
                star.x = Math.random() * canvas.width;
            }

            ctx.beginPath();
            ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);

            ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity * 0.8})`;
            ctx.fill();
        });

        requestAnimationFrame(drawStars);
    }

    resizeCanvas();
    createStars();
    drawStars();
    window.addEventListener('resize', () => {
        resizeCanvas();
        createStars();
    });


    // ─── Typing Effect ────────────────────────────────────────
    const greetings = [
        "Hello, World! 👋",
        "Welcome to my Universe 🌌",
        "MIT Vishwaprayag University 🎓",
        "Aspiring Cybersecurity Expert 🔐",
        "Passionate & Dedicated Student 🚀",
        "Open to Internships & Opportunities 💼",
        "Chess Player ♟️ | Novel Reader 📚"
    ];
    let greetingIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingElement = document.getElementById('typingGreeting');

    function typeEffect() {
        const currentGreeting = greetings[greetingIndex];

        if (!isDeleting) {
            typingElement.textContent = currentGreeting.substring(0, charIndex + 1);
            charIndex++;
            if (charIndex === currentGreeting.length) {
                isDeleting = true;
                setTimeout(typeEffect, 2000);
                return;
            }
        } else {
            typingElement.textContent = currentGreeting.substring(0, charIndex - 1);
            charIndex--;
            if (charIndex === 0) {
                isDeleting = false;
                greetingIndex = (greetingIndex + 1) % greetings.length;
            }
        }

        const speed = isDeleting ? 40 : 80;
        setTimeout(typeEffect, speed);
    }

    typeEffect();


    // ─── Theme Toggle (Removed — Dark Only) ────────────────



    // ─── Navbar Scroll Effect ─────────────────────────────────
    const navbar = document.getElementById('navbar');
    const backToTop = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 80) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Back to top button
        if (window.scrollY > 400) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }

        // Active nav link
        updateActiveLink();
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });


    // ─── Active Navigation Link ───────────────────────────────
    function updateActiveLink() {
        const sections = document.querySelectorAll('.section');
        const navLinks = document.querySelectorAll('.nav-link');

        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-section') === current) {
                link.classList.add('active');
            }
        });
    }


    // ─── Hamburger Menu ───────────────────────────────────────
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu on link click
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });


    // ─── Scroll Animations (Intersection Observer) ────────────
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                // Animate strength bars
                if (entry.target.id === 'aboutStrengths') {
                    animateStrengthBars();
                }

                // Animate stat counters
                const statNumbers = entry.target.querySelectorAll('.stat-number');
                statNumbers.forEach(num => animateCounter(num));
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });


    // ─── Strength Bars Animation ──────────────────────────────
    function animateStrengthBars() {
        document.querySelectorAll('.bar-fill').forEach(bar => {
            const width = bar.getAttribute('data-width');
            setTimeout(() => {
                bar.style.width = width + '%';
            }, 200);
        });
    }


    // ─── Counter Animation ────────────────────────────────────
    function animateCounter(element) {
        if (element.classList.contains('counted')) return;
        element.classList.add('counted');

        const target = parseInt(element.getAttribute('data-count'));
        const duration = 1500;
        const step = target / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                element.textContent = target + '+';
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 16);
    }


    // ─── Achievement Filters ──────────────────────────────────
    const achievementFilters = document.querySelectorAll('#achievementFilters .filter-btn');
    const achievementCards = document.querySelectorAll('.achievement-card');

    achievementFilters.forEach(btn => {
        btn.addEventListener('click', () => {
            achievementFilters.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            achievementCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.classList.remove('hidden');
                    card.style.animation = 'fadeInUp 0.5s ease forwards';
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });


    // ─── Gallery Filters ──────────────────────────────────────
    const galleryFilters = document.querySelectorAll('[data-gallery-filter]');
    const galleryItems = document.querySelectorAll('.gallery-item');

    galleryFilters.forEach(btn => {
        btn.addEventListener('click', () => {
            galleryFilters.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-gallery-filter');

            galleryItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-gallery-category') === filter) {
                    item.classList.remove('hidden');
                    item.style.animation = 'fadeInUp 0.4s ease forwards';
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    });


    // ─── Lightbox ─────────────────────────────────────────────
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');
    let currentLightboxIndex = 0;
    let visibleGalleryItems = [];

    function openLightbox(index) {
        visibleGalleryItems = Array.from(galleryItems).filter(item => !item.classList.contains('hidden'));
        currentLightboxIndex = index;
        const item = visibleGalleryItems[currentLightboxIndex];
        const img = item.querySelector('img');
        const caption = item.querySelector('.gallery-overlay span');

        lightboxImage.src = img.src;
        lightboxCaption.textContent = caption ? caption.textContent : '';
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    function navigateLightbox(direction) {
        visibleGalleryItems = Array.from(galleryItems).filter(item => !item.classList.contains('hidden'));
        currentLightboxIndex = (currentLightboxIndex + direction + visibleGalleryItems.length) % visibleGalleryItems.length;
        const item = visibleGalleryItems[currentLightboxIndex];
        const img = item.querySelector('img');
        const caption = item.querySelector('.gallery-overlay span');

        lightboxImage.style.opacity = 0;
        setTimeout(() => {
            lightboxImage.src = img.src;
            lightboxCaption.textContent = caption ? caption.textContent : '';
            lightboxImage.style.opacity = 1;
        }, 200);
    }

    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => openLightbox(index));
    });

    lightboxClose.addEventListener('click', closeLightbox);
    lightboxPrev.addEventListener('click', () => navigateLightbox(-1));
    lightboxNext.addEventListener('click', () => navigateLightbox(1));

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') navigateLightbox(-1);
        if (e.key === 'ArrowRight') navigateLightbox(1);
    });


    // ─── Contact Form ─────────────────────────────────────────
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Show loading state
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="btn-loading" style="display:inline-block;"></span> Sending...';

        // Simulate sending (replace with actual form submission)
        setTimeout(() => {
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
            submitBtn.style.background = 'linear-gradient(135deg, #10b981, #34d399)';

            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
                submitBtn.style.background = '';
                contactForm.reset();
            }, 3000);
        }, 1500);
    });


    // ─── Parallax Effect for Planets ──────────────────────────
    let mouseX = 0, mouseY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    });

    function animatePlanets() {
        const planets = document.querySelectorAll('.planet, .planet-ring');
        planets.forEach((planet, index) => {
            const speed = (index + 1) * 8;
            const x = mouseX * speed;
            const y = mouseY * speed;
            planet.style.transform = `translate(${x}px, ${y}px)`;
        });
        requestAnimationFrame(animatePlanets);
    }

    animatePlanets();


    // ─── Smooth Scroll for Nav Links ──────────────────────────
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });


    // ─── FadeInUp Animation Keyframe (added dynamically) ─────
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);


    // ─── Console Easter Egg ───────────────────────────────────
    console.log('%c🚀 Welcome to my Space Portfolio!', 
        'font-size: 20px; color: #a855f7; font-weight: bold;');
    console.log('%c🔐 Aspiring Cybersecurity Professional', 
        'font-size: 14px; color: #c084fc;');
    console.log('%cBuilt with HTML, CSS & JavaScript ✨', 
        'font-size: 12px; color: #6a6a8e;');

});
