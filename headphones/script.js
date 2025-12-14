// Slideshow functionality
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.slide-dot');
const totalSlides = slides.length;
let slideInterval;

// Function to show specific slide
function showSlide(index) {
    // Remove active class from all slides and dots
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Add active class to current slide and dot
    slides[index].classList.add('active');
    dots[index].classList.add('active');
    currentSlide = index;
}

// Function for next slide
function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
}

// Initialize slideshow
function initSlideshow() {
    // Start automatic slideshow
    slideInterval = setInterval(nextSlide, 5000);
    
    // Add click events to dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            clearInterval(slideInterval);
            showSlide(index);
            slideInterval = setInterval(nextSlide, 5000);
        });
    });
    
    // Pause slideshow on hover
    const hero = document.querySelector('.hero');
    hero.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });
    
    hero.addEventListener('mouseleave', () => {
        slideInterval = setInterval(nextSlide, 5000);
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // Close mobile menu if open
            const menuToggle = document.getElementById('menu-toggle');
            if (menuToggle.checked) {
                menuToggle.checked = false;
            }
            
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Form submission
document.querySelector('.contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    
    // Show success message
    alert(`Thank you ${name}! We've received your message and will contact you at ${email} within 24 hours.`);
    this.reset();
});

// CTA button click
document.querySelector('.hero .cta-button').addEventListener('click', function() {
    document.querySelector('#contact-us').scrollIntoView({
        behavior: 'smooth'
    });
});

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    initSlideshow();
    
    // Add hover effects to service items
    const serviceItems = document.querySelectorAll('.service-item');
    serviceItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Mobile menu toggle
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 480) {
                menuToggle.checked = false;
            }
        });
    });
});

// Pause slideshow when window is not visible
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        clearInterval(slideInterval);
    } else {
        slideInterval = setInterval(nextSlide, 5000);
    }
});