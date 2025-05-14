// Combined and Optimized Animations for Portfolio

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all animations
    initHeroCanvas();
    initScrollAnimations();
    initParallaxEffects();
    initCardEffects();
    setupMobileMenu();
    initSkillsAnimation();
    initProjectFilters();
    initSmoothScrolling();
    
    // Trigger initial animations
    setTimeout(() => {
        animateHeroElements();
        reveal();
    }, 100);
    
    // Add scroll event listener for continuous animation updates
    window.addEventListener('scroll', () => {
        handleNavbarScroll();
        reveal();
        parallaxScroll();
    });
    
    // Handle window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            resetMobileMenu();
        }
        
        // Resize canvas if it exists
        const canvas = document.getElementById('hero-canvas');
        if (canvas) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initHeroCanvas(); // Reinitialize canvas
        }
    });
});

// Hero Canvas Animation
function initHeroCanvas() {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Particle settings
    const particlesArray = [];
    const numberOfParticles = 150;
    const colors = [
        'rgba(0, 243, 255, 0.7)',  // neon blue
        'rgba(157, 0, 255, 0.7)',   // neon purple
        'rgba(255, 0, 247, 0.7)',   // neon pink
        'rgba(0, 255, 141, 0.7)',   // neon green
        'rgba(255, 238, 0, 0.7)'     // neon yellow
    ];

    // Mouse position tracking
    let mouse = {
        x: null,
        y: null,
        radius: 150
    };

    window.addEventListener('mousemove', (event) => {
        mouse.x = event.x;
        mouse.y = event.y;
    });
    
    window.addEventListener('mouseout', () => {
        mouse.x = undefined;
        mouse.y = undefined;
    });

    // Particle class
    class Particle {
        constructor(x, y, directionX, directionY, size, color) {
            this.x = x;
            this.y = y;
            this.directionX = directionX;
            this.directionY = directionY;
            this.size = size;
            this.color = color;
            this.speedFactor = Math.random() * 0.5 + 0.2;
        }

        // Draw individual particle
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
            ctx.fillStyle = this.color;
            ctx.fill();

            // Add glow effect
            ctx.shadowBlur = 15;
            ctx.shadowColor = this.color;
        }

        // Update particle position and handle interactions
        update() {
            // Boundary check
            if (this.x + this.size > canvas.width || this.x - this.size < 0) {
                this.directionX = -this.directionX;
            }
            if (this.y + this.size > canvas.height || this.y - this.size < 0) {
                this.directionY = -this.directionY;
            }

            // Move particle
            this.x += this.directionX * this.speedFactor;
            this.y += this.directionY * this.speedFactor;

            // Mouse interaction
            if (mouse.x && mouse.y) {
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < mouse.radius) {
                    // Push particles away from mouse
                    const forceDirectionX = dx / distance;
                    const forceDirectionY = dy / distance;
                    const force = (mouse.radius - distance) / mouse.radius;
                    
                    this.directionX -= forceDirectionX * force * 2;
                    this.directionY -= forceDirectionY * force * 2;
                }
            }

            // Draw particle
            this.draw();
        }
    }

    // Create particles
    function init() {
        particlesArray.length = 0;
        for (let i = 0; i < numberOfParticles; i++) {
            const size = Math.random() * 5 + 1;
            const x = Math.random() * (canvas.width - size * 2) + size;
            const y = Math.random() * (canvas.height - size * 2) + size;
            const directionX = (Math.random() * 2 - 1) * 0.5;
            const directionY = (Math.random() * 2 - 1) * 0.5;
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
        }
    }

    // Connect particles with lines
    function connect() {
        for (let a = 0; a < particlesArray.length; a++) {
            for (let b = a; b < particlesArray.length; b++) {
                const dx = particlesArray[a].x - particlesArray[b].x;
                const dy = particlesArray[a].y - particlesArray[b].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 150) {
                    // Draw line between particles
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(255, 255, 255, ${1 - distance / 150})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                    ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                    ctx.stroke();
                }
            }
        }
    }

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Update and draw particles
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
        }
        
        // Connect particles with lines
        connect();
    }

    // Initialize and start animation
    init();
    animate();
}

// Animate hero section elements with staggered timing
function animateHeroElements() {
    const heroTitle = document.querySelector('.glitch-text');
    const heroSubtitle = document.querySelector('.slide-in-left');
    const heroButtons = document.querySelector('.hero-buttons');
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    if (heroTitle) heroTitle.classList.add('animated');
    
    setTimeout(() => {
        if (heroSubtitle) heroSubtitle.classList.add('animated');
    }, 400);
    
    setTimeout(() => {
        if (heroButtons) heroButtons.classList.add('animated');
    }, 800);
    
    setTimeout(() => {
        if (scrollIndicator) scrollIndicator.classList.add('animated');
    }, 1200);
}

// Enhanced scroll reveal animation
function reveal() {
    const sections = document.querySelectorAll('.section');
    const animationElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .zoom-in, .rotate-in, .flip-in');
    const cards = document.querySelectorAll('.skill-item, .project-card, .blog-card, .testimonial-card, .timeline-item');
    
    // Animate sections
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        if (sectionTop < window.innerHeight - 150) {
            section.classList.add('active');
        }
    });
    
    // Animate elements with class-based animations
    animationElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        if (elementTop < window.innerHeight - 100) {
            element.classList.add('animated');
        }
    });
    
    // Animate cards with staggered effect
    cards.forEach((card, index) => {
        const cardTop = card.getBoundingClientRect().top;
        if (cardTop < window.innerHeight - 100) {
            setTimeout(() => {
                card.classList.add('animated-up');
            }, index * 100); // Staggered delay
        }
    });
    
    // Animate skill progress bars
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
        const barTop = bar.getBoundingClientRect().top;
        if (barTop < window.innerHeight - 100) {
            const width = bar.style.width;
            bar.style.width = '0';
            setTimeout(() => {
                bar.style.width = width;
            }, 200);
        }
    });
}

// Parallax scrolling effects
function initParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.parallax');
    parallaxElements.forEach(element => {
        element.setAttribute('data-speed', element.getAttribute('data-speed') || '0.05');
    });
}

function parallaxScroll() {
    const parallaxElements = document.querySelectorAll('.parallax');
    parallaxElements.forEach(element => {
        const speed = element.getAttribute('data-speed');
        const yPos = -(window.pageYOffset * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
}

// Enhanced 3D card effects
function initCardEffects() {
    const cards = document.querySelectorAll('.project-card, .blog-card, .testimonial-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px) scale(1.05)`;
            
            // Dynamic shadow based on mouse position
            const shadowX = (centerX - x) / 20;
            const shadowY = (centerY - y) / 20;
            card.style.boxShadow = `${shadowX}px ${shadowY}px 30px rgba(0, 0, 0, 0.4), 0 0 30px var(--neon-blue)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
            card.style.boxShadow = '';
        });
    });
    
    // Magnetic effect for buttons
    const buttons = document.querySelectorAll('.cta-button, .btn-view-project, .btn-view-code, .filter-btn');
    
    buttons.forEach(button => {
        button.addEventListener('mousemove', e => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const moveX = (x - centerX) / 5;
            const moveY = (y - centerY) / 5;
            
            button.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.1)`;
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = '';
        });
    });
}

// Navbar scroll behavior
function handleNavbarScroll() {
    const header = document.querySelector('header');
    const nav = document.querySelector('nav');
    const currentScroll = window.pageYOffset;
    
    // Add scrolled class for style changes
    if (currentScroll > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }

    // Hide/show header based on scroll direction
    if (currentScroll > window.lastScroll && currentScroll > 100) {
        header.classList.add('hidden');
    } else {
        header.classList.remove('hidden');
    }
    window.lastScroll = currentScroll;
}

// Enhanced mobile menu functionality
function setupMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('nav ul');
    const header = document.querySelector('header');
    
    if (menuToggle && navMenu) {
        // Update initial state based on screen size
        if (window.innerWidth <= 768) {
            menuToggle.style.display = 'flex';
        } else {
            menuToggle.style.display = 'none';
        }
        
        // Toggle menu on click
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            header.classList.toggle('menu-open');
            navMenu.classList.toggle('active');
            
            if (navMenu.classList.contains('active')) {
                // Add animations to menu items
                navMenu.querySelectorAll('li').forEach((item, index) => {
                    item.style.opacity = '0';
                    item.style.transform = 'translateX(20px)';
                    item.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                    item.style.transitionDelay = `${index * 0.1}s`;
                    
                    // Trigger animation
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateX(0)';
                    }, 50);
                });
            } else {
                // Hide menu with animation
                navMenu.querySelectorAll('li').forEach(item => {
                    item.style.opacity = '0';
                    item.style.transform = 'translateX(20px)';
                });
            }
        });
        
        // Close menu when clicking a link
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    menuToggle.classList.remove('active');
                    header.classList.remove('menu-open');
                    navMenu.classList.remove('active');
                }
            });
        });
    }
}

function resetMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('nav ul');
    const header = document.querySelector('header');
    
    if (menuToggle && navMenu) {
        menuToggle.style.display = 'none';
        menuToggle.classList.remove('active');
        header.classList.remove('menu-open');
        navMenu.classList.remove('active');
        
        // Reset menu items styles
        navMenu.querySelectorAll('li').forEach(item => {
            item.style.opacity = '1';
            item.style.transform = 'none';
            item.style.transition = 'none';
        });
    }
}

// Animate skill bars
function initSkillsAnimation() {
    const skillPercents = document.querySelectorAll('.skill-percent');
    
    skillPercents.forEach(percent => {
        const targetValue = parseInt(percent.textContent);
        percent.textContent = '0%';
        
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    let currentValue = 0;
                    const increment = targetValue / 50;
                    
                    const counter = setInterval(() => {
                        currentValue += increment;
                        
                        if (currentValue >= targetValue) {
                            percent.textContent = `${targetValue}%`;
                            clearInterval(counter);
                        } else {
                            percent.textContent = `${Math.floor(currentValue)}%`;
                        }
                    }, 30);
                    
                    observer.unobserve(percent);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(percent);
    });
}

// Project filtering functionality
function initProjectFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (filterBtns.length && projectCards.length) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                filterBtns.forEach(b => b.classList.remove('active'));
                
                // Add active class to clicked button
                btn.classList.add('active');
                
                const filter = btn.getAttribute('data-filter');
                
                // Filter projects with animation
                projectCards.forEach(card => {
                    if (filter === 'all' || card.getAttribute('data-category') === filter) {
                        card.style.display = 'flex';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 100);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(30px)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 500);
                    }
                });
            });
        });
    }
}

// Enhanced smooth scrolling
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Add a class to the target section for highlight effect
                const sections = document.querySelectorAll('.section');
                sections.forEach(section => section.classList.remove('section-highlight'));
                
                setTimeout(() => {
                    targetElement.classList.add('section-highlight');
                }, 800);
                
                // Enhanced smooth scroll with cubic-bezier easing
                const startPosition = window.pageYOffset;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - 100;
                const distance = targetPosition - startPosition;
                const duration = 1000;
                let start = null;
                
                function step(timestamp) {
                    if (!start) start = timestamp;
                    const progress = timestamp - start;
                    const easeInOutCubic = t => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
                    
                    window.scrollTo(0, startPosition + distance * easeInOutCubic(Math.min(progress / duration, 1)));
                    
                    if (progress < duration) {
                        window.requestAnimationFrame(step);
                    }
                }
                
                window.requestAnimationFrame(step);
            }
        });
    });
}