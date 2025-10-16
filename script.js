// Background slideshow variables
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;

// Slideshow timing (in milliseconds)
const slideInterval = 5000;
const fadeTransitionTime = 2000;

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize slideshow
    initializeSlideshow();
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            // Only prevent default if it's a pure anchor link (not about-us.html#section)
            if (href.startsWith('#') && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Add active state to current page navigation
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        const linkPage = linkHref.split('#')[0]; // Get page without anchor
        
        if (linkPage === currentPage || (currentPage === 'index.html' && linkHref === '/')) {
            link.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
            link.style.color = '#ffffff';
        }
    });

    // Dropdown menu enhancement - keep open while hovering over menu
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        const menu = dropdown.querySelector('.dropdown-menu');
        let timeoutId;

        dropdown.addEventListener('mouseenter', function() {
            clearTimeout(timeoutId);
            menu.style.opacity = '1';
            menu.style.visibility = 'visible';
            menu.style.transform = 'translateY(0)';
        });

        dropdown.addEventListener('mouseleave', function() {
            timeoutId = setTimeout(() => {
                menu.style.opacity = '0';
                menu.style.visibility = 'hidden';
                menu.style.transform = 'translateY(-10px)';
            }, 200);
        });
    });

    // Add click handler for dropdown items on mobile
    if (window.innerWidth <= 768) {
        const dropdownToggles = document.querySelectorAll('.dropdown > a');
        dropdownToggles.forEach(toggle => {
            toggle.addEventListener('click', function(e) {
                const parent = this.parentElement;
                const menu = parent.querySelector('.dropdown-menu');
                
                // Toggle dropdown on mobile
                if (menu.style.opacity === '1') {
                    menu.style.opacity = '0';
                    menu.style.visibility = 'hidden';
                } else {
                    // Close other dropdowns
                    document.querySelectorAll('.dropdown-menu').forEach(m => {
                        m.style.opacity = '0';
                        m.style.visibility = 'hidden';
                    });
                    
                    // Open this dropdown
                    menu.style.opacity = '1';
                    menu.style.visibility = 'visible';
                    e.preventDefault();
                }
            });
        });
    }
});

// Initialize and start the background slideshow
function initializeSlideshow() {
    if (slides.length === 0) return;
    
    preloadImages();
    startSlideshow();
}

// Preload all slideshow images
function preloadImages() {
    slides.forEach(slide => {
        const img = new Image();
        const bgImage = slide.style.backgroundImage;
        if (bgImage) {
            const url = bgImage.slice(4, -1).replace(/"/g, "");
            img.src = url;
        }
    });
}

// Start the automatic slideshow
function startSlideshow() {
    if (slides.length > 0) {
        slides[0].classList.add('active');
    }
    
    setInterval(nextSlide, slideInterval);
}

// Move to next slide
function nextSlide() {
    if (slides.length <= 1) return;
    
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % totalSlides;
    slides[currentSlide].classList.add('active');
}

// Move to previous slide
function previousSlide() {
    if (slides.length <= 1) return;
    
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    slides[currentSlide].classList.add('active');
}

// Move to specific slide
function goToSlide(slideIndex) {
    if (slideIndex < 0 || slideIndex >= totalSlides) return;
    
    slides[currentSlide].classList.remove('active');
    currentSlide = slideIndex;
    slides[currentSlide].classList.add('active');
}

// Navbar scroll effect
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop && scrollTop > 80) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// Enhanced CTA button with ripple effect
const ctaButton = document.querySelector('.cta-button');
if (ctaButton) {
    ctaButton.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
}

// Pause slideshow when user is inactive
let isUserActive = true;
let activityTimer;

function resetActivityTimer() {
    isUserActive = true;
    clearTimeout(activityTimer);
    
    activityTimer = setTimeout(() => {
        isUserActive = false;
    }, 30000);
}

document.addEventListener('mousemove', resetActivityTimer);
document.addEventListener('keypress', resetActivityTimer);
document.addEventListener('click', resetActivityTimer);
document.addEventListener('scroll', resetActivityTimer);

// Smooth page loading animation
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in-out';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Handle visibility change
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        slides.forEach(slide => {
            slide.style.animationPlayState = 'paused';
        });
    } else {
        slides.forEach(slide => {
            slide.style.animationPlayState = 'running';
        });
    }
});

// Error handling for missing images
window.addEventListener('error', function(e) {
    if (e.target.tagName === 'IMG' || e.target.classList.contains('slide')) {
        console.warn('Failed to load background image:', e.target.src || 'Unknown source');
    }
}, true);

// Contact Form Submission Handler
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Replace this URL with your actual Google Apps Script Web App URL
            const scriptURL = 'https://script.google.com/macros/s/AKfycbwkGI5pBwpYcAz4toS87WXxREEEqsYvl2h998-LwFt33S1PSH1iPsilQjtLvylEqS7q/exec';
            
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };
            
            const statusDiv = document.getElementById('formStatus');
            statusDiv.style.display = 'block';
            statusDiv.textContent = 'Sending...';
            statusDiv.style.color = '#4caf50';
            
            fetch(scriptURL, {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            })
            .then(response => {
                statusDiv.textContent = 'Thank you! Your message has been sent successfully.';
                statusDiv.style.color = '#4caf50';
                contactForm.reset();
                
                // Hide success message after 5 seconds
                setTimeout(() => {
                    statusDiv.style.display = 'none';
                }, 5000);
            })
            .catch(error => {
                statusDiv.textContent = 'Oops! There was an error sending your message. Please try again.';
                statusDiv.style.color = '#f44336';
            });
        });
    }
});
// Hamburger Menu Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Create hamburger button
    const navContainer = document.querySelector('.nav-container');
    const navLinks = document.querySelector('.nav-links');
    
    if (navContainer && navLinks) {
        // Create hamburger button
        const hamburger = document.createElement('button');
        hamburger.className = 'hamburger';
        hamburger.setAttribute('aria-label', 'Toggle menu');
        hamburger.innerHTML = `
            <span></span>
            <span></span>
            <span></span>
        `;
        
        // Create overlay
        const overlay = document.createElement('div');
        overlay.className = 'mobile-menu-overlay';
        document.body.appendChild(overlay);
        
        // Insert hamburger after logo section
        const logoSection = document.querySelector('.logo-section');
        if (logoSection) {
            logoSection.parentNode.insertBefore(hamburger, logoSection.nextSibling);
        }
        
        // Toggle menu function
        function toggleMenu() {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
            overlay.classList.toggle('active');
            document.body.style.overflow = hamburger.classList.contains('active') ? 'hidden' : '';
        }
        
        // Hamburger click event
        hamburger.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleMenu();
        });
        
        // Overlay click event
        overlay.addEventListener('click', function() {
            toggleMenu();
        });
        
        // Close menu when clicking on non-dropdown links
        const navButtons = navLinks.querySelectorAll('.nav-button');
        navButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                // Only close if it's not a dropdown toggle
                if (!this.parentElement.classList.contains('dropdown')) {
                    if (window.innerWidth <= 768) {
                        toggleMenu();
                    }
                }
            });
        });
        
        // Dropdown toggle for mobile
        const dropdowns = document.querySelectorAll('.dropdown');
        dropdowns.forEach(dropdown => {
            const toggle = dropdown.querySelector('> a');
            const menu = dropdown.querySelector('.dropdown-menu');
            
            if (toggle && menu) {
                toggle.addEventListener('click', function(e) {
                    if (window.innerWidth <= 768) {
                        e.preventDefault();
                        
                        // Close other dropdowns
                        dropdowns.forEach(otherDropdown => {
                            if (otherDropdown !== dropdown) {
                                const otherMenu = otherDropdown.querySelector('.dropdown-menu');
                                if (otherMenu) {
                                    otherMenu.classList.remove('active');
                                }
                            }
                        });
                        
                        // Toggle current dropdown
                        menu.classList.toggle('active');
                    }
                });
                
                // Close menu when clicking dropdown items
                const dropdownItems = menu.querySelectorAll('a');
                dropdownItems.forEach(item => {
                    item.addEventListener('click', function() {
                        if (window.innerWidth <= 768) {
                            toggleMenu();
                        }
                    });
                });
            }
        });
        
        // Close menu on window resize to desktop
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                overlay.classList.remove('active');
                document.body.style.overflow = '';
                
                // Close all dropdowns
                document.querySelectorAll('.dropdown-menu').forEach(menu => {
                    menu.classList.remove('active');
                });
            }
        });
        
        // Prevent menu close when clicking inside nav-links
        navLinks.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }
});