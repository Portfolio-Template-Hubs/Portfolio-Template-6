// Modern Portfolio Interactions and Animations

// Enhanced smooth scroll implementation with offset
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        const headerOffset = 100;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    });
});

// Enhanced navbar behavior on scroll
let lastScroll = 0;
const header = document.querySelector('header');
const nav = document.querySelector('nav');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add scrolled class for style changes
    if (currentScroll > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }

    // Hide/show header based on scroll direction
    if (currentScroll > lastScroll && currentScroll > 100) {
        header.classList.add('hidden');
    } else {
        header.classList.remove('hidden');
    }
    lastScroll = currentScroll;
});

// Parallax effect
const parallaxElements = document.querySelectorAll('.parallax');

window.addEventListener('scroll', () => {
    parallaxElements.forEach(element => {
        const speed = element.getAttribute('data-speed');
        const yPos = -(window.pageYOffset * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
});

// Typing animation for role title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Scroll reveal animation
function reveal() {
    const reveals = document.querySelectorAll('.section');
    reveals.forEach(reveal => {
        const windowHeight = window.innerHeight;
        const revealTop = reveal.getBoundingClientRect().top;
        const revealPoint = 150;

        if (revealTop < windowHeight - revealPoint) {
            reveal.classList.add('active');
        }
    });
}

window.addEventListener('scroll', reveal);

// Enhanced project cards tilt effect with smooth transitions
document.querySelectorAll('.project-card').forEach(card => {
    let timeout;
    const cardContent = card.querySelector('.project-content');

    card.addEventListener('mousemove', e => {
        if (timeout) clearTimeout(timeout);
        
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 15;
        const rotateY = (centerX - x) / 15;

        card.style.transform = `
            perspective(1000px) 
            rotateX(${rotateX}deg) 
            rotateY(${rotateY}deg) 
            translateZ(10px)
        `;
    });

    card.addEventListener('mouseleave', () => {
        timeout = setTimeout(() => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        }, 100);
    });
});

// Contact form handling
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // Add your form submission logic here
        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset();
    });
}

// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('nav ul');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
    });
}

// Particle background effect
function createParticles() {
    const heroSection = document.querySelector('.hero-section');
    if (!heroSection) return;
    
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particles';
    heroSection.appendChild(particleContainer);
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.animationDuration = `${Math.random() * 10 + 5}s`;
        particle.style.animationDelay = `${Math.random() * 5}s`;
        particleContainer.appendChild(particle);
    }
}

// Enhanced scroll animations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .zoom-in, .rotate-in, .flip-in, .bounce-in');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(el => observer.observe(el));
    
    // Timeline animation
    const timelineItems = document.querySelectorAll('.timeline-item');
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                // Add a small delay for the dot animation
                setTimeout(() => {
                    const dot = entry.target.querySelector('.timeline-dot');
                    if (dot) dot.style.animation = 'pulse 3s infinite';
                }, 300);
            }
        });
    }, { threshold: 0.2 });
    
    timelineItems.forEach(item => timelineObserver.observe(item));
}

// Set dark theme as default
function setupDarkTheme() {
    // Always use dark theme
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
}

// Enhanced mobile menu functionality with animations
function setupMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('nav ul');
    const header = document.querySelector('header');
    
    if (menuToggle && navMenu) {
        // Update initial state based on screen size
        if (window.innerWidth <= 768) {
            navMenu.style.display = 'none';
            menuToggle.style.display = 'flex';
        } else {
            menuToggle.style.display = 'none';
        }
        
        // Add active class for styling
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            header.classList.toggle('menu-open');
            
            if (navMenu.style.display === 'none' || navMenu.style.display === '') {
                // Show menu with animation
                navMenu.style.display = 'flex';
                navMenu.style.flexDirection = 'column';
                navMenu.style.position = 'absolute';
                navMenu.style.top = '100%';
                navMenu.style.left = '0';
                navMenu.style.width = '100%';
                navMenu.style.backgroundColor = 'rgba(15, 15, 15, 0.95)';
                navMenu.style.backdropFilter = 'blur(10px)';
                navMenu.style.padding = '1.5rem';
                navMenu.style.boxShadow = 'var(--shadow-2)';
                navMenu.style.zIndex = '100';
                navMenu.style.borderTop = '1px solid var(--accent-blue)';
                navMenu.style.transform = 'translateY(0)';
                navMenu.style.opacity = '1';
                navMenu.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                
                // Add spacing and animations to menu items
                navMenu.querySelectorAll('li').forEach((item, index) => {
                    item.style.margin = '0.8rem 0';
                    item.style.opacity = '0';
                    item.style.transform = 'translateX(-20px)';
                    item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                    item.style.transitionDelay = `${index * 0.05}s`;
                    
                    // Trigger animation
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateX(0)';
                    }, 10);
                });
            } else {
                // Hide menu with animation
                navMenu.querySelectorAll('li').forEach(item => {
                    item.style.opacity = '0';
                    item.style.transform = 'translateX(-20px)';
                });
                
                setTimeout(() => {
                    navMenu.style.display = 'none';
                }, 300);
            }
        });
        
        // Close menu when clicking a link
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    menuToggle.classList.remove('active');
                    header.classList.remove('menu-open');
                    
                    // Hide menu with animation
                    navMenu.querySelectorAll('li').forEach(item => {
                        item.style.opacity = '0';
                        item.style.transform = 'translateX(-20px)';
                    });
                    
                    setTimeout(() => {
                        navMenu.style.display = 'none';
                    }, 300);
                }
            });
        });
        
        // Update menu display on window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                menuToggle.style.display = 'none';
                menuToggle.classList.remove('active');
                header.classList.remove('menu-open');
                
                navMenu.style.display = 'flex';
                navMenu.style.flexDirection = 'row';
                navMenu.style.position = 'static';
                navMenu.style.width = 'auto';
                navMenu.style.backgroundColor = 'transparent';
                navMenu.style.backdropFilter = 'none';
                navMenu.style.padding = '0';
                navMenu.style.boxShadow = 'none';
                navMenu.style.borderTop = 'none';
                navMenu.style.transform = 'none';
                navMenu.style.opacity = '1';
                
                // Reset menu items styles
                navMenu.querySelectorAll('li').forEach(item => {
                    item.style.margin = '0';
                    item.style.opacity = '1';
                    item.style.transform = 'none';
                    item.style.transition = 'none';
                });
            } else {
                menuToggle.style.display = 'flex';
                navMenu.style.display = 'none';
            }
        });
    }
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Start typing animation
    const roleElement = document.querySelector('.slide-in-left');
    if (roleElement) {
        roleElement.textContent = '';
        typeWriter(roleElement, 'Showcasing my journey as a Coder');
    }
    
    // Create particle effect
    createParticles();
    
    // Initialize enhanced scroll animations
    initScrollAnimations();
    
    // Trigger initial reveal
    reveal();
    
    // Add hover effects to skill items
    document.querySelectorAll('.skill-item').forEach(item => {
        item.addEventListener('mouseenter', () => {
            if (item.querySelector('i')) {
                item.querySelector('i').classList.add('pulse');
            }
        });
        item.addEventListener('mouseleave', () => {
            if (item.querySelector('i')) {
                item.querySelector('i').classList.remove('pulse');
            }
        });
    });
    
    // Animate skill progress bars
    animateSkillBars();
    
    // Setup project filtering
    setupProjectFilters();
    
    // Setup dark theme
    setupDarkTheme();
    
    // Setup enhanced mobile menu
    setupMobileMenu();
});

// Animate skill progress bars when they come into view
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.style.width;
                entry.target.style.width = '0';
                setTimeout(() => {
                    entry.target.style.width = width;
                }, 100);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    skillBars.forEach(bar => observer.observe(bar));
}

// Setup project filtering functionality
function setupProjectFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-filter');
            
            // Filter projects
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

// Add smooth page transitions
window.addEventListener('beforeunload', function(e) {
    document.body.classList.add('page-transition');
});