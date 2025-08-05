// Mobile Navigation Toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Animate hamburger menu
    const bars = navToggle.querySelectorAll('.bar');
    bars[0].style.transform = navMenu.classList.contains('active') ? 'rotate(45deg) translate(5px, 5px)' : '';
    bars[1].style.opacity = navMenu.classList.contains('active') ? '0' : '1';
    bars[2].style.transform = navMenu.classList.contains('active') ? 'rotate(-45deg) translate(5px, -5px)' : '';
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const bars = navToggle.querySelectorAll('.bar');
        bars[0].style.transform = '';
        bars[1].style.opacity = '1';
        bars[2].style.transform = '';
    });
});

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

// Newsletter form submission
const newsletterForm = document.getElementById('newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', async (e) => {
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
            // For now, we'll just log it
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

// Add scroll effect to navbar
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }
    
    if (scrollTop > 50) {
        navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
    } else {
        navbar.style.boxShadow = 'none';
    }
    
    lastScrollTop = scrollTop;
});

// Add hover effects to company cards for better CTA focus
const companyCards = document.querySelectorAll('.company-card');
companyCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        const cta = this.querySelector('.btn-primary');
        if (cta) {
            cta.style.transform = 'scale(1.05)';
        }
    });
    
    card.addEventListener('mouseleave', function() {
        const cta = this.querySelector('.btn-primary');
        if (cta) {
            cta.style.transform = '';
        }
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});