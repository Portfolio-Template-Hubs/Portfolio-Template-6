// Enhanced Interactions and Animations for Portfolio

document.addEventListener('DOMContentLoaded', () => {
    // Enhanced 3D tilt effect for all cards
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
    
    // Enhanced scroll animations with staggered effect
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.skill-item, .project-card, .blog-card, .testimonial-card, .timeline-item');
        
        elements.forEach((element, index) => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                // Add staggered delay based on index
                setTimeout(() => {
                    element.classList.add('animated-up');
                }, index * 100);
            }
        });
    };
    
    // Animate section headings with 3D effect
    const animateHeadings = () => {
        const headings = document.querySelectorAll('h2');
        
        headings.forEach(heading => {
            const headingTop = heading.getBoundingClientRect().top;
            const headingVisible = 150;
            
            if (headingTop < window.innerHeight - headingVisible) {
                heading.classList.add('animated-flip');
            }
        });
    };
    
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
    
    // Enhanced skill progress animation
    const animateSkillProgress = () => {
        const skillBars = document.querySelectorAll('.skill-progress');
        
        skillBars.forEach(bar => {
            const barTop = bar.getBoundingClientRect().top;
            const barVisible = 150;
            
            if (barTop < window.innerHeight - barVisible) {
                const width = bar.style.width;
                bar.style.width = '0';
                
                setTimeout(() => {
                    bar.style.width = width;
                    bar.style.transition = 'width 1.5s cubic-bezier(0.17, 0.67, 0.83, 0.67)';
                }, 200);
            }
        });
    };
    
    // Scroll-triggered animations
    window.addEventListener('scroll', () => {
        animateOnScroll();
        animateHeadings();
        animateSkillProgress();
    });
    
    // Trigger animations on initial load
    animateOnScroll();
    animateHeadings();
    animateSkillProgress();
    
    // Smooth scrolling with enhanced easing
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
    
    // Add interactive typing effect to section subtitles
    const subtitles = document.querySelectorAll('.section-subtitle');
    
    subtitles.forEach(subtitle => {
        const originalText = subtitle.textContent;
        subtitle.textContent = '';
        
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    let i = 0;
                    const typing = setInterval(() => {
                        if (i < originalText.length) {
                            subtitle.textContent += originalText.charAt(i);
                            i++;
                        } else {
                            clearInterval(typing);
                        }
                    }, 30);
                    
                    observer.unobserve(subtitle);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(subtitle);
    });
    
    // Add scroll-triggered counter animation for skill percentages
    const skillPercents = document.querySelectorAll('.skill-percent');
    
    skillPercents.forEach(percent => {
        const targetValue = parseInt(percent.textContent);
        percent.textContent = '0%';
        
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    let currentValue = 0;
                    const increment = targetValue / 50; // Adjust speed
                    
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
});