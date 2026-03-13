// =====================================================
// Appointment Modal Functionality
// =====================================================

const appointmentModal = document.getElementById('appointmentModal');
const appointmentOverlay = document.getElementById('appointmentOverlay');
const modalCloseBtn = document.getElementById('modalCloseBtn');
const appointmentForm = document.getElementById('appointmentForm');

// Get all "Request an Appointment" buttons
const appointmentButtons = document.querySelectorAll('.cta-button.primary, .header-cta');

// Open modal function
function openAppointmentModal() {
    appointmentModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close modal function
function closeAppointmentModal() {
    appointmentModal.classList.remove('active');
    document.body.style.overflow = 'auto';
    appointmentForm.reset();
    clearFormErrors();
}

// Clear error states
function clearFormErrors() {
    document.querySelectorAll('.form-input.error, .form-textarea.error').forEach(el => {
        el.classList.remove('error');
    });
}

// Add click listeners to all appointment buttons
appointmentButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        openAppointmentModal();
    });
});

// Close modal when X button is clicked
modalCloseBtn.addEventListener('click', closeAppointmentModal);

// Close modal when overlay is clicked
appointmentOverlay.addEventListener('click', closeAppointmentModal);

// Close modal when Escape key is pressed
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && appointmentModal.classList.contains('active')) {
        closeAppointmentModal();
    }
});

// Contact Now navbar link behavior: show small popup with phone number
const contactNowLink = document.getElementById('contactNowLink');
if (contactNowLink) {
    contactNowLink.addEventListener('click', (e) => {
        e.preventDefault();
        alert('Call us now at +1 (828) 465-0187');
    });
}

// Form validation and submission
appointmentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form fields
    const firstName = document.getElementById('firstName');
    const lastName = document.getElementById('lastName');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');
    
    // Clear previous errors
    clearFormErrors();
    
    let isValid = true;
    
    // Validate required fields
    if (!firstName.value.trim()) {
        firstName.classList.add('error');
        isValid = false;
    }
    
    if (!lastName.value.trim()) {
        lastName.classList.add('error');
        isValid = false;
    }
    
    if (!email.value.trim() || !validateEmail(email.value)) {
        email.classList.add('error');
        isValid = false;
    }
    
    if (!phone.value.trim()) {
        phone.classList.add('error');
        isValid = false;
    }
    
    // If valid, show success message
    if (isValid) {
        // Simulate form submission
        console.log('Form submitted:', {
            firstName: firstName.value,
            lastName: lastName.value,
            email: email.value,
            phone: phone.value,
            message: document.getElementById('message').value
        });
        
        // Show success message
        alert('Thank you for requesting an appointment! We will contact you shortly at ' + phone.value);
        
        // Close modal
        closeAppointmentModal();
    }
});

// Email validation helper
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// =====================================================
// Mobile Menu Toggle
// =====================================================

const mobileToggle = document.getElementById('mobileToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

mobileToggle.addEventListener('click', () => {
    mobileToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when a link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// =====================================================
// Sticky Navigation
// =====================================================

const navbar = document.getElementById('navbar');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > 50) {
        navbar.classList.add('sticky');
    } else {
        navbar.classList.remove('sticky');
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// =====================================================
// Smooth Scrolling for Anchor Links
// =====================================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Only prevent default for valid anchor links
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            
            const target = document.querySelector(href);
            const headerHeight = navbar.offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// =====================================================
// Intersection Observer for Fade-In Animations
// =====================================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe feature cards and service cards for animation
document.querySelectorAll('.feature-card, .service-card, .step-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
});

// =====================================================
// Page Load Animation
// =====================================================

document.addEventListener('DOMContentLoaded', () => {
    // Add a small delay to ensure smooth animations on page load
    const heroTextBox = document.querySelector('.hero-text-box');
    if (heroTextBox) {
        heroTextBox.style.opacity = '1';
    }
});

// =====================================================
// Utility: Detect Mobile
// =====================================================

function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// =====================================================
// Parallax Effect for Hero
// =====================================================

const heroBg = document.querySelector('.hero-bg');
if (heroBg) {
    let ticking = false;
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                heroBg.style.transform = `translateZ(0) translateY(${scrollTop * 0.5}px)`;
                ticking = false;
            });
            ticking = true;
        }
    });
}

// =====================================================
// Testimonials slider controls
// =====================================================

const testimonialTrack = document.getElementById('testimonialTrack');
const prevBtn = document.querySelector('.testimonial-prev');
const nextBtn = document.querySelector('.testimonial-next');

if (testimonialTrack) {
    const cardWidth = () => testimonialTrack.querySelector('.testimonial-card')?.offsetWidth || 300;

    prevBtn?.addEventListener('click', () => {
        testimonialTrack.scrollBy({ left: -(cardWidth() + 16), behavior: 'smooth' });
    });

    nextBtn?.addEventListener('click', () => {
        testimonialTrack.scrollBy({ left: cardWidth() + 16, behavior: 'smooth' });
    });

    let startX = 0;
    let scrollStart = 0;
    const isDragging = { value: false };

    testimonialTrack.addEventListener('pointerdown', (e) => {
        isDragging.value = true;
        startX = e.clientX;
        scrollStart = testimonialTrack.scrollLeft;
        testimonialTrack.setPointerCapture(e.pointerId);
    });

    testimonialTrack.addEventListener('pointermove', (e) => {
        if (!isDragging.value) return;
        const delta = startX - e.clientX;
        testimonialTrack.scrollLeft = scrollStart + delta;
    });

    testimonialTrack.addEventListener('pointerup', (e) => {
        isDragging.value = false;
        testimonialTrack.releasePointerCapture(e.pointerId);
    });

    testimonialTrack.addEventListener('pointerleave', () => {
        isDragging.value = false;
    });
}

console.log('Hickory Periodontics website loaded successfully!');