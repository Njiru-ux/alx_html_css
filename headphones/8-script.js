/**
 * Hamburger Menu JavaScript
 * Task 8: Responsive hamburger menu for mobile devices
 */

document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    const closeMenu = document.getElementById('closeMenu');
    const overlay = document.getElementById('mobileOverlay');
    const body = document.body;

    // Toggle mobile menu function
    function toggleMobileMenu() {
        const isActive = mobileMenu.classList.contains('active');
        
        if (!isActive) {
            // Open menu
            mobileMenu.classList.add('active');
            overlay.classList.add('active');
            hamburger.classList.add('active');
            body.style.overflow = 'hidden';
            
            // Add animation to hamburger lines
            const lines = document.querySelectorAll('.hamburger-line');
            lines.forEach((line, index) => {
                line.style.animation = `hamburgerLine${index + 1} 0.3s ease forwards`;
            });
        } else {
            // Close menu
            closeMobileMenu();
        }
    }

    // Close mobile menu function
    function closeMobileMenu() {
        mobileMenu.classList.remove('active');
        overlay.classList.remove('active');
        hamburger.classList.remove('active');
        body.style.overflow = 'auto';
        
        // Reset hamburger animation
        const lines = document.querySelectorAll('.hamburger-line');
        lines.forEach((line, index) => {
            line.style.animation = `hamburgerLine${index + 1}Reverse 0.3s ease forwards`;
        });
    }

    // Event listeners
    hamburger.addEventListener('click', toggleMobileMenu);
    closeMenu.addEventListener('click', closeMobileMenu);
    overlay.addEventListener('click', closeMobileMenu);

    // Close menu when clicking on mobile links
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');
    mobileLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Only close if it's not a parent menu item
            if (!this.classList.contains('has-submenu')) {
                closeMobileMenu();
            }
        });
    });

    // Close menu with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });

    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            // Close menu if window is resized to desktop size
            if (window.innerWidth > 480 && mobileMenu.classList.contains('active')) {
                closeMobileMenu();
            }
        }, 250);
    });

    // Add click animation to hamburger
    hamburger.addEventListener('mousedown', function() {
        this.style.transform = 'scale(0.9)';
    });
    
    hamburger.addEventListener('mouseup', function() {
        this.style.transform = 'scale(1)';
    });
    
    hamburger.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });

    // Add touch events for mobile
    hamburger.addEventListener('touchstart', function() {
        this.style.transform = 'scale(0.9)';
    });
    
    hamburger.addEventListener('touchend', function() {
        this.style.transform = 'scale(1)';
    });

    // Update cart count animation
    const cartCount = document.querySelector('.cart-count');
    const mobileCartCount = document.querySelector('.mobile-cart-count');
    
    if (cartCount && mobileCartCount) {
        // Simulate cart update
        setInterval(() => {
            const currentCount = parseInt(cartCount.textContent);
            const newCount = currentCount < 5 ? currentCount + 1 : 1;
            
            // Animate cart count change
            cartCount.style.animation = 'none';
            mobileCartCount.style.animation = 'none';
            
            setTimeout(() => {
                cartCount.textContent = newCount;
                mobileCartCount.textContent = newCount;
                
                cartCount.style.animation = 'cartPulse 0.5s ease';
                mobileCartCount.style.animation = 'cartPulse 0.5s ease';
            }, 50);
        }, 5000); // Change every 5 seconds for demo
    }

    // Log menu state changes for debugging
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.attributeName === 'class') {
                console.log('Mobile menu state:', 
                    mobileMenu.classList.contains('active') ? 'OPEN' : 'CLOSED');
            }
        });
    });

    observer.observe(mobileMenu, { attributes: true });
    
    // Initial console log
    console.log('Hamburger Menu JavaScript loaded successfully!');
    console.log('Window width:', window.innerWidth, 'px');
    console.log('Mobile menu available:', window.innerWidth <= 480);
});

// Additional helper functions
function isMobile() {
    return window.innerWidth <= 480;
}

function getMenuState() {
    const mobileMenu = document.getElementById('mobileMenu');
    return mobileMenu ? mobileMenu.classList.contains('active') : false;
}

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { isMobile, getMenuState };
}
