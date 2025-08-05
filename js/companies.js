// Companies Page Specific JavaScript

// Handle newsletter form on companies page
const companiesNewsletterForm = document.getElementById('companies-newsletter-form');
if (companiesNewsletterForm) {
    companiesNewsletterForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = {
            firstName: e.target.querySelector('input[name="firstName"]').value,
            lastName: e.target.querySelector('input[name="lastName"]').value,
            email: e.target.querySelector('input[name="email"]').value
        };
        
        const button = e.target.querySelector('button');
        const originalText = button.textContent;
        
        // Show loading state
        button.textContent = 'Processing...';
        button.disabled = true;
        
        // Submit to Airtable
        const result = await window.submitToAirtable(formData);
        
        if (result.success) {
            // Show success message
            button.textContent = 'Success! Check your email for the video link';
            button.style.background = 'var(--dark-gray)';
            
            // Here you would typically send the video link via email
            console.log('Send video link to:', formData.email);
            
            setTimeout(() => {
                button.textContent = originalText;
                button.style.background = '';
                button.disabled = false;
                e.target.reset();
            }, 3000);
        } else {
            // Show error message
            button.textContent = 'Error! Please try again';
            button.style.background = '#dc3545';
            
            setTimeout(() => {
                button.textContent = originalText;
                button.style.background = '';
                button.disabled = false;
            }, 3000);
        }
    });
}

// Smooth scroll to company sections
document.addEventListener('DOMContentLoaded', () => {
    // Check if there's a hash in the URL
    if (window.location.hash) {
        setTimeout(() => {
            const target = document.querySelector(window.location.hash);
            if (target) {
                const offset = 100; // Account for fixed navbar
                const targetPosition = target.offsetTop - offset;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }, 100);
    }
});

// Add parallax effect to animated graphics
const animatedGraphics = document.querySelectorAll('.animated-graphic');
window.addEventListener('scroll', () => {
    animatedGraphics.forEach(graphic => {
        const rect = graphic.getBoundingClientRect();
        const speed = 0.5;
        
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            const yPos = -(rect.top * speed);
            graphic.style.transform = `translateY(${yPos}px)`;
        }
    });
});

// Animate stats when they come into view
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
};

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-item h3');
            statNumbers.forEach(stat => {
                animateValue(stat);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all company stats sections
document.querySelectorAll('.company-stats').forEach(stats => {
    statsObserver.observe(stats);
});

// Animate number counting
function animateValue(element) {
    const finalValue = element.textContent;
    const hasPlus = finalValue.includes('+');
    const hasPercent = finalValue.includes('%');
    const hasX = finalValue.includes('x');
    const hasDollar = finalValue.includes('$');
    const hasM = finalValue.includes('M');
    const hasK = finalValue.includes('K');
    
    let numericValue = parseFloat(finalValue.replace(/[^0-9.]/g, ''));
    let startValue = 0;
    let duration = 2000;
    let startTime = null;
    
    function animate(currentTime) {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const currentValue = Math.floor(easeOutQuart * numericValue);
        
        let displayValue = currentValue.toString();
        if (hasDollar) displayValue = '$' + displayValue;
        if (hasM) displayValue += 'M';
        if (hasK) displayValue += 'K';
        if (hasPercent) displayValue += '%';
        if (hasX) displayValue += 'x';
        if (hasPlus) displayValue += '+';
        
        element.textContent = displayValue;
        
        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    }
    
    requestAnimationFrame(animate);
}

// Add hover effect to service items
const serviceItems = document.querySelectorAll('.service-item');
serviceItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.background = 'var(--white)';
        this.style.border = '2px solid var(--primary-red)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.background = '';
        this.style.border = '';
    });
});