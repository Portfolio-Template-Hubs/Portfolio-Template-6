// Advanced Canvas Animation for Hero Section

document.addEventListener('DOMContentLoaded', () => {
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

    // Handle window resize
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        mouse.radius = 150;
        init();
    });

    // Handle mouse out event
    window.addEventListener('mouseout', () => {
        mouse.x = undefined;
        mouse.y = undefined;
    });

    // Initialize and start animation
    init();
    animate();
});