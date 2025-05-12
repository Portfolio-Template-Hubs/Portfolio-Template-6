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

// Enhanced scroll reveal animation
function reveal() {
    const reveals = document.querySelectorAll('.section');
    const animationElements = document.querySelectorAll('.skill-item, .project-card, .blog-card, .timeline-item');
    
    reveals.forEach(reveal => {
        const windowHeight = window.innerHeight;
        const revealTop = reveal.getBoundingClientRect().top;
        const revealPoint = 150;

        if (revealTop < windowHeight - revealPoint) {
            reveal.classList.add('active');
        }
    });
    
    animationElements.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementPoint = 100;
        
        if (elementTop < windowHeight - elementPoint) {
            element.classList.add('animated');
            
            // Add staggered animation for child elements
            if (element.classList.contains('skill-item')) {
                const icon = element.querySelector('.skill-icon');
                const progress = element.querySelector('.skill-progress');
                
                if (icon) {
                    setTimeout(() => {
                        icon.style.animation = 'pulse 3s infinite';
                    }, 300);
                }
                
                if (progress) {
                    setTimeout(() => {
                        progress.style.width = progress.getAttribute('data-width') || '80%';
                    }, 500);
                }
            }
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
        // Create hamburger menu spans if they don't exist
        if (menuToggle.children.length === 0) {
            for (let i = 0; i < 3; i++) {
                const span = document.createElement('span');
                menuToggle.appendChild(span);
            }
        }
        
        // Update initial state based on screen size
        if (window.innerWidth <= 768) {
            menuToggle.style.display = 'flex';
        } else {
            menuToggle.style.display = 'none';
        }
        
        // Add active class for styling
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
                    
                    // Hide menu with animation
                    navMenu.querySelectorAll('li').forEach(item => {
                        item.style.opacity = '0';
                        item.style.transform = 'translateX(20px)';
                    });
                }
            });
        });
        
        // Update menu display on window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                menuToggle.style.display = 'none';
                menuToggle.classList.remove('active');
                header.classList.remove('menu-open');
                navMenu.classList.remove('active');
                
                // Reset menu items styles
                navMenu.querySelectorAll('li').forEach(item => {
                    item.style.margin = '0';
                    item.style.opacity = '1';
                    item.style.transform = 'none';
                    item.style.transition = 'none';
                });
            } else {
                menuToggle.style.display = 'flex';
                if (!navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                }
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
    
    // Add hover effects to skill items with enhanced animations
    document.querySelectorAll('.skill-item').forEach(item => {
        item.addEventListener('mouseenter', () => {
            if (item.querySelector('i')) {
                item.querySelector('i').classList.add('pulse');
            }
            item.style.transform = 'translateY(-8px) scale(1.05)';
            item.style.boxShadow = 'var(--shadow-2), 0 0 15px var(--skills-accent)';
        });
        item.addEventListener('mouseleave', () => {
            if (item.querySelector('i')) {
                item.querySelector('i').classList.remove('pulse');
            }
            item.style.transform = '';
            item.style.boxShadow = '';
        });
    });
    
    // Add hover effects to project cards with enhanced animations
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'perspective(1000px) rotateX(5deg) rotateY(5deg) translateY(-15px)';
            card.style.boxShadow = 'var(--shadow-2), 0 0 20px var(--projects-accent)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
            card.style.boxShadow = '';
        });
    });
    
    // Add hover effects to blog cards with enhanced animations
    document.querySelectorAll('.blog-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-15px) scale(1.02)';
            card.style.boxShadow = 'var(--shadow-2), 0 0 20px var(--blog-accent)';
            // Ensure content remains visible
            const content = card.querySelector('.blog-content');
            if (content) content.style.zIndex = '20';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
            card.style.boxShadow = '';
            // Reset z-index
            const content = card.querySelector('.blog-content');
            if (content) content.style.zIndex = '';
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
    
    // Add scroll event listener for continuous animation updates
    window.addEventListener('scroll', reveal);
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