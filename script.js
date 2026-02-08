// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply fade-in to cards
document.querySelectorAll('.feature-card, .command-card, .pricing-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Add floating animation to hero elements
const heroContent = document.querySelector('.hero-content');
if (heroContent) {
    let scrollY = 0;
    window.addEventListener('scroll', () => {
        scrollY = window.scrollY;
        heroContent.style.transform = `translateY(${scrollY * 0.3}px)`;
    });
}

// Copy server ID helper (optional feature)
function copyServerID() {
    // This would be triggered if you add a "Copy Server ID" button
    const serverID = document.getElementById('server-id-input')?.value;
    if (serverID) {
        navigator.clipboard.writeText(serverID);
        alert('Server ID copied to clipboard!');
    }
}

// Stats counter animation
function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.textContent = value + (element.dataset.suffix || '');
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Stats counter animation for decimal numbers
function animateValueDecimal(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = (progress * (end - start) + start).toFixed(1);
        element.textContent = value + (element.dataset.suffix || '');
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Animate stats when they come into view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.animated) {
            entry.target.dataset.animated = 'true';
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const text = stat.textContent.trim();

                // Handle different number formats
                if (text.includes('%')) {
                    // For percentages like 99.9%
                    const numValue = parseFloat(text.replace('%', ''));
                    stat.dataset.suffix = '%';
                    animateValueDecimal(stat, 0, numValue, 2000);
                } else if (text.includes('K')) {
                    // For thousands like 10K+
                    const numValue = parseInt(text.replace(/\D/g, ''));
                    stat.dataset.suffix = 'K+';
                    animateValue(stat, 0, numValue, 2000);
                } else if (text.includes('+')) {
                    // For numbers with + like 500+
                    const numValue = parseInt(text.replace(/\D/g, ''));
                    stat.dataset.suffix = '+';
                    animateValue(stat, 0, numValue, 2000);
                } else {
                    // For plain numbers
                    const numValue = parseInt(text.replace(/\D/g, ''));
                    const suffix = text.replace(/[\d,]/g, '');
                    stat.dataset.suffix = suffix;
                    animateValue(stat, 0, numValue, 2000);
                }
            });
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Add particle effect to background (optional)
function createParticles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 1}px;
            height: ${Math.random() * 4 + 1}px;
            background: rgba(88, 101, 242, ${Math.random() * 0.5 + 0.2});
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${Math.random() * 10 + 5}s ease-in-out infinite;
            animation-delay: ${Math.random() * 5}s;
        `;
        hero.appendChild(particle);
    }
}

// Add CSS for particle animation
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0%, 100% {
            transform: translateY(0) translateX(0);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) translateX(${Math.random() * 100 - 50}px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize particles
createParticles();

// Form validation helper (if you add contact form later)
function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

console.log('🤖 Maki landing page loaded successfully!');
