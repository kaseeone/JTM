class ParticleAnimation {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.particles = [];
        this.mouse = { x: 0, y: 0 };
        this.isHovered = false;
        this.interactionRadius = 150; // Increased interaction radius
        this.maxParticles = 35; // Reduced particle count for better performance

        this.init();
        this.animate();
        this.addEventListeners();
    }

    init() {
        this.resize();
        this.createParticles();
    }

    resize() {
        this.canvas.width = this.canvas.offsetWidth;
        this.canvas.height = this.canvas.offsetHeight;
        // Adjust particle count based on screen size
        this.maxParticles = Math.min(35, Math.floor((this.canvas.width * this.canvas.height) / 20000));
        this.createParticles();
    }

    createParticles() {
        this.particles = []; // Clear existing particles
        for (let i = 0; i < this.maxParticles; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 1.5 + 0.5, // Smaller particles
                speedX: Math.random() * 0.3 - 0.15, // Slower movement
                speedY: Math.random() * 0.3 - 0.15,
                color: `rgba(124, 255, 161, ${Math.random() * 0.2 + 0.1})` // More subtle color
            });
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.particles.forEach(particle => {
            // Update position with smoother movement
            particle.x += particle.speedX;
            particle.y += particle.speedY;

            // Mouse interaction with smoother repulsion
            if (this.isHovered) {
                const dx = this.mouse.x - particle.x;
                const dy = this.mouse.y - particle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < this.interactionRadius) {
                    const angle = Math.atan2(dy, dx);
                    const force = Math.pow((this.interactionRadius - distance) / this.interactionRadius, 2);
                    particle.x -= Math.cos(angle) * force * 1.5;
                    particle.y -= Math.sin(angle) * force * 1.5;
                }
            }

            // Bounce off edges with smoother transition
            if (particle.x < 0) {
                particle.x = 0;
                particle.speedX *= -0.8;
            } else if (particle.x > this.canvas.width) {
                particle.x = this.canvas.width;
                particle.speedX *= -0.8;
            }
            if (particle.y < 0) {
                particle.y = 0;
                particle.speedY *= -0.8;
            } else if (particle.y > this.canvas.height) {
                particle.y = this.canvas.height;
                particle.speedY *= -0.8;
            }

            // Draw particle
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = particle.color;
            this.ctx.fill();

            // Draw connections with smoother gradient
            this.particles.forEach(otherParticle => {
                const dx = particle.x - otherParticle.x;
                const dy = particle.y - otherParticle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 80) { // Reduced connection distance
                    this.ctx.beginPath();
                    const opacity = Math.pow(1 - distance / 80, 2) * 0.15; // Smoother opacity gradient
                    this.ctx.strokeStyle = `rgba(124, 255, 161, ${opacity})`;
                    this.ctx.lineWidth = 0.3; // Thinner lines
                    this.ctx.moveTo(particle.x, particle.y);
                    this.ctx.lineTo(otherParticle.x, otherParticle.y);
                    this.ctx.stroke();
                }
            });
        });

        requestAnimationFrame(() => this.animate());
    }

    addEventListeners() {
        window.addEventListener('resize', () => {
            this.resize();
        });

        this.canvas.addEventListener('mousemove', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            this.mouse.x = e.clientX - rect.left;
            this.mouse.y = e.clientY - rect.top;
        });

        this.canvas.addEventListener('mouseenter', () => {
            this.isHovered = true;
        });

        this.canvas.addEventListener('mouseleave', () => {
            this.isHovered = false;
        });
    }
}

// Initialize animation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('contact-animation');
    if (canvas) {
        new ParticleAnimation(canvas);
    }
}); 