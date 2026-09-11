// ========================================
// ELITE INTERIORS - Interactive Features
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation Toggle
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });

    // Active Navigation Link
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
        let current = '';
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Smooth Scroll for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');

            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const navHeight = navbar.offsetHeight;
                const targetPosition = targetElement.offsetTop - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Contact Form Submission
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const phone = formData.get('phone');
            const service = formData.get('service');
            const message = formData.get('message');

            // Create WhatsApp message
            const whatsappMessage = `Hi! I'm interested in your services.%0A%0A*Name:* ${encodeURIComponent(name)}%0A*Email:* ${encodeURIComponent(email)}%0A*Phone:* ${encodeURIComponent(phone || 'Not provided')}%0A*Service:* ${encodeURIComponent(service || 'Not specified')}%0A*Message:* ${encodeURIComponent(message || 'No message')}`;

            // Open WhatsApp
            const whatsappURL = `https://wa.me/07006291943?text=${whatsappMessage}`;
            window.open(whatsappURL, '_blank');

            // Reset form
            contactForm.reset();

            // Show success message
            alert('Thank you for your message! We will get back to you soon.');
        });
    }

    // Animate elements on scroll - Comprehensive Observer
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: unobserve after animation to improve performance
                // scrollObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all animatable elements
    const animatableElements = document.querySelectorAll(
        '.service-card, .portfolio-item, .testimonial-card, .about-content, .about-visual, ' +
        '.contact-info, .contact-form-wrapper, .legal-section, ' +
        '.fade-in-up, .fade-in, .slide-in-left, .slide-in-right, .scale-in'
    );

    animatableElements.forEach(el => {
        scrollObserver.observe(el);
    });

    // Counter animation for stats
    const statNumbers = document.querySelectorAll('.stat-number');
    let statsAnimated = false;

    const animateStats = () => {
        if (statsAnimated) return;
        
        const statsSection = document.querySelector('.hero-stats');
        if (!statsSection) return;

        const statsRect = statsSection.getBoundingClientRect();
        const isVisible = statsRect.top < window.innerHeight && statsRect.bottom > 0;

        if (isVisible && !statsAnimated) {
            statsAnimated = true;
            
            statNumbers.forEach(stat => {
                const target = stat.textContent;
                const numericValue = parseInt(target.replace(/\D/g, ''));
                const suffix = target.replace(/[0-9]/g, '');
                const duration = 2000;
                const steps = 60;
                const increment = numericValue / steps;
                let current = 0;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= numericValue) {
                        current = numericValue;
                        clearInterval(timer);
                    }
                    stat.textContent = Math.floor(current) + suffix;
                }, duration / steps);
            });
        }
    };

    window.addEventListener('scroll', animateStats);
    animateStats(); // Check on load

    // Parallax effect for hero shapes
    const shapes = document.querySelectorAll('.shape');
    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrolled = window.pageYOffset;
                shapes.forEach((shape, index) => {
                    const speed = 0.1 + (index * 0.05);
                    const yPos = scrolled * speed;
                    shape.style.transform = `translateY(${yPos}px)`;
                });
                ticking = false;
            });
            ticking = true;
        }
    });

    // Portfolio hover effect enhancement
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    portfolioItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
            this.style.zIndex = '10';
        });

        item.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.zIndex = '1';
        });
    });

    // Service cards hover effect
    const serviceCards = document.querySelectorAll('.service-card');

    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !navToggle.contains(e.target) && navMenu.classList.contains('active')) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

    // Page Loader
    const pageLoader = document.getElementById('page-loader');

    if (pageLoader) {
        // Hide loader after page loads
        window.addEventListener('load', () => {
            setTimeout(() => {
                pageLoader.classList.add('hidden');
                document.body.style.overflow = 'visible';
            }, 1800);
        });

        // Fallback: hide loader after 3 seconds even if page hasn't fully loaded
        setTimeout(() => {
            if (!pageLoader.classList.contains('hidden')) {
                pageLoader.classList.add('hidden');
                document.body.style.overflow = 'visible';
            }
        }, 3000);
    }

    // Animate legal sections on scroll (for Privacy Policy page)
    const legalSections = document.querySelectorAll('.legal-section');

    if (legalSections.length > 0) {
        const legalObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        legalSections.forEach(section => {
            legalObserver.observe(section);
        });
    }

    // PDF Modal functionality
    const pdfModal = document.getElementById('pdfModal');
    const pdfViewer = document.getElementById('pdfViewer');
    const pdfModalClose = document.getElementById('pdfModalClose');
    const pdfViewButtons = document.querySelectorAll('.pdf-view-btn');

    if (pdfModal && pdfViewer && pdfModalClose) {
        pdfViewButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const pdfUrl = this.getAttribute('href');
                pdfViewer.src = pdfUrl;
                pdfModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });

        pdfModalClose.addEventListener('click', () => {
            pdfModal.classList.remove('active');
            pdfViewer.src = '';
            document.body.style.overflow = 'visible';
        });

        pdfModal.addEventListener('click', function(e) {
            if (e.target === pdfModal) {
                pdfModal.classList.remove('active');
                pdfViewer.src = '';
                document.body.style.overflow = 'visible';
            }
        });

        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && pdfModal.classList.contains('active')) {
                pdfModal.classList.remove('active');
                pdfViewer.src = '';
                document.body.style.overflow = 'visible';
            }
        });
    }

    // Add loaded class to body for initial animations
    document.body.classList.add('loaded');
});
