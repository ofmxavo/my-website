// Beginners Page JavaScript

// Smooth scroll for navigation cards
document.querySelectorAll('.nav-card').forEach(card => {
    card.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = card.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offset = 100; // Account for fixed navbar
            const targetPosition = targetSection.offsetTop - offset;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for lesson cards animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const lessonObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all lesson cards
document.querySelectorAll('.lesson-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s ease-out';
    lessonObserver.observe(card);
});

// Add hover effect to nav cards
document.querySelectorAll('.nav-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Animate stats on scroll
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                animateStatValue(stat);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

// Observe lesson stats
const lessonStats = document.querySelector('.lesson-stats');
if (lessonStats) {
    statsObserver.observe(lessonStats);
}

// Animate stat values
function animateStatValue(element) {
    const finalValue = element.textContent;
    const hasPlus = finalValue.includes('+');
    const hasDollar = finalValue.includes('$');
    const hasK = finalValue.includes('K');
    
    // Extract numeric value
    let numericValue = parseFloat(finalValue.replace(/[^0-9.]/g, ''));
    
    // Handle special cases
    if (hasK) numericValue = numericValue * 1000;
    
    let startValue = 0;
    let duration = 2000;
    let startTime = null;
    
    function animate(currentTime) {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        let currentValue = Math.floor(easeOutQuart * numericValue);
        
        // Format display value
        let displayValue = currentValue.toString();
        if (hasK && currentValue >= 1000) {
            displayValue = (currentValue / 1000) + 'K';
        }
        if (hasDollar) displayValue = '$' + displayValue;
        if (hasPlus) displayValue += '+';
        
        element.textContent = displayValue;
        
        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            element.textContent = finalValue; // Ensure final value is exact
        }
    }
    
    requestAnimationFrame(animate);
}

// Add active state to current nav item
const currentPath = window.location.pathname;
document.querySelectorAll('.nav-link').forEach(link => {
    if (link.getAttribute('href') === currentPath.split('/').pop()) {
        link.classList.add('active');
    }
});

// Parallax effect for hero animation
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroAnimation = document.querySelector('.hero-animation');
    
    if (heroAnimation) {
        heroAnimation.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// Add pulse animation to featured cards on hover
document.querySelectorAll('.lesson-card.featured').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.animation = 'pulse 1s ease-in-out infinite';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.animation = '';
    });
});

// CSS for pulse animation
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { box-shadow: 0 10px 40px rgba(255, 46, 46, 0.2); }
        50% { box-shadow: 0 10px 40px rgba(255, 46, 46, 0.4); }
        100% { box-shadow: 0 10px 40px rgba(255, 46, 46, 0.2); }
    }
`;
document.head.appendChild(style);