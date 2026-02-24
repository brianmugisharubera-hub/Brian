/* ============================================
   Eco-Stream Logistics - JavaScript
   ============================================ */

// ============================================
// ============================================
// SERVICE FORM SUBMISSION & DISPLAY
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const serviceForm = document.getElementById('serviceForm');
    const submissionsList = document.getElementById('submissionsList');
    const formMessage = document.getElementById('formMessage');

    // Load and display submissions on page load
    if (submissionsList) {
        displaySubmissions();
    }

    if (serviceForm) {
        serviceForm.addEventListener('submit', function(e) {
            e.preventDefault();
            formMessage.textContent = '';
            formMessage.className = '';

            // Get form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const serviceType = document.getElementById('serviceType').value;
            const details = document.getElementById('details').value.trim();

            // Simple validation
            if (!name || !email || !serviceType || !details) {
                formMessage.textContent = 'Please fill in all fields.';
                formMessage.className = 'error';
                return;
            }

            // Create submission object
            const submission = {
                name,
                email,
                serviceType,
                details,
                date: new Date().toLocaleString()
            };

            // Save to localStorage
            let submissions = JSON.parse(localStorage.getItem('serviceSubmissions') || '[]');
            submissions.push(submission);
            localStorage.setItem('serviceSubmissions', JSON.stringify(submissions));

            formMessage.textContent = 'Request submitted successfully!';
            formMessage.className = 'success';
            serviceForm.reset();
            displaySubmissions();
        });
    }

    function displaySubmissions() {
        let submissions = JSON.parse(localStorage.getItem('serviceSubmissions') || '[]');
        if (submissions.length === 0) {
            submissionsList.innerHTML = '<p>No requests submitted yet.</p>';
            return;
        }
        let html = '<table class="submissions-table"><thead><tr><th>Name</th><th>Email</th><th>Service</th><th>Details</th><th>Date</th></tr></thead><tbody>';
        submissions.slice().reverse().forEach(sub => {
            html += `<tr><td>${escapeHtml(sub.name)}</td><td>${escapeHtml(sub.email)}</td><td>${escapeHtml(sub.serviceType)}</td><td>${escapeHtml(sub.details)}</td><td>${escapeHtml(sub.date)}</td></tr>`;
        });
        html += '</tbody></table>';
        submissionsList.innerHTML = html;
    }

    // Simple HTML escape to prevent XSS
    function escapeHtml(text) {
        return text.replace(/[&<>"]/g, function(c) {
            return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];
        });
    }
});
// MOBILE NAVIGATION TOGGLE
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.setAttribute('aria-expanded', 
                this.getAttribute('aria-expanded') === 'false' ? 'true' : 'false'
            );
        });

        // Close menu when a link is clicked
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }
});

// ============================================
// FORM VALIDATION
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Clear previous messages
            const formMessage = document.getElementById('formMessage');
            formMessage.textContent = '';
            formMessage.classList.remove('success', 'error');

            // Clear previous errors
            const formGroups = contactForm.querySelectorAll('.form-group');
            formGroups.forEach(group => group.classList.remove('error'));

            // Validate form
            if (validateForm()) {
                // Form is valid - in production, this would send data to server
                showSuccessMessage();
                contactForm.reset();
            }
        });
    }
});

function validateForm() {
    const contactForm = document.getElementById('contactForm');
    let isValid = true;

    // Get form fields
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const service = document.getElementById('service');
    const message = document.getElementById('message');
    const privacy = document.getElementById('privacy');

    // Name validation
    if (name.value.trim() === '') {
        showError(name, 'Please enter your name');
        isValid = false;
    } else if (name.value.trim().length < 2) {
        showError(name, 'Name must be at least 2 characters');
        isValid = false;
    }

    // Email validation
    if (email.value.trim() === '') {
        showError(email, 'Please enter your email');
        isValid = false;
    } else if (!isValidEmail(email.value.trim())) {
        showError(email, 'Please enter a valid email address');
        isValid = false;
    }

    // Service validation
    if (service.value === '') {
        showError(service, 'Please select a service type');
        isValid = false;
    }

    // Message validation
    if (message.value.trim() === '') {
        showError(message, 'Please enter your message');
        isValid = false;
    } else if (message.value.trim().length < 10) {
        showError(message, 'Message must be at least 10 characters');
        isValid = false;
    }

    // Privacy agreement validation
    if (!privacy.checked) {
        showError(privacy, 'Please agree to be contacted');
        isValid = false;
    }

    return isValid;
}

function showError(field, message) {
    const formGroup = field.closest('.form-group');
    formGroup.classList.add('error');
    const errorElement = formGroup.querySelector('.error-message');
    if (errorElement) {
        errorElement.textContent = message;
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showSuccessMessage() {
    const formMessage = document.getElementById('formMessage');
    formMessage.textContent = 'Thank you! Your message has been sent successfully. We\'ll get back to you within 24 hours.';
    formMessage.classList.add('success');
    
    // Scroll to message
    formMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });

    // Remove message after 5 seconds
    setTimeout(function() {
        formMessage.classList.remove('success');
    }, 5000);
}

// ============================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // Don't prevent default for skip-link
        if (href === '#main-content') {
            return;
        }

        e.preventDefault();
        
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ============================================
// LAZY LOADING IMAGES (Optional Enhancement)
// ============================================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                const image = entry.target;
                image.addEventListener('load', function() {
                    image.classList.add('loaded');
                });
                observer.unobserve(image);
            }
        });
    });

    document.querySelectorAll('img[loading="lazy"]').forEach(function(img) {
        imageObserver.observe(img);
    });
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Get URL parameters (for potential tracking/analytics)
function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    const results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

// Log page view (for analytics integration)
function logPageView() {
    console.log('Page viewed: ' + window.location.pathname);
    // Integration point for Google Analytics, Mixpanel, etc.
}

// Accessibility: Trap focus in modal if implemented
function trapFocus(element) {
    const focusableElements = element.querySelectorAll(
        'a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    element.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstElement) {
                    e.preventDefault();
                    lastElement.focus();
                }
            } else {
                if (document.activeElement === lastElement) {
                    e.preventDefault();
                    firstElement.focus();
                }
            }
        }
    });
}

// ============================================
// ACCESSIBILITY ENHANCEMENTS
// ============================================

// Add ARIA live region updates for form status
document.addEventListener('DOMContentLoaded', function() {
    const formMessage = document.getElementById('formMessage');
    if (formMessage) {
        formMessage.setAttribute('role', 'alert');
        formMessage.setAttribute('aria-live', 'polite');
    }
});

// Handle keyboard navigation for details/FAQ elements
document.querySelectorAll('details').forEach(detail => {
    detail.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.open = !this.open;
        }
    });
});

// ============================================
// PERFORMANCE MONITORING
// ============================================

// Log Cumulative Layout Shift, Largest Contentful Paint (basic monitoring)
if ('PerformanceObserver' in window) {
    try {
        // Monitor Long Tasks
        const perfObserver = new PerformanceObserver(function(list) {
            for (const entry of list.getEntries()) {
                console.warn('Long Task detected:', entry.duration);
            }
        });
        
        perfObserver.observe({ entryTypes: ['longtask'] });
    } catch (e) {
        console.log('Performance monitoring not fully supported');
    }
}

// ============================================
// INITIALIZATION
// ============================================

// Run on page load
window.addEventListener('load', function() {
    logPageView();
    initializeAccessibility();
});

function initializeAccessibility() {
    // Ensure all interactive elements are keyboard accessible
    document.querySelectorAll('.btn, a, button').forEach(element => {
        if (!element.hasAttribute('tabindex')) {
            element.setAttribute('tabindex', '0');
        }
    });

    // Check for keyboard-only users
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-nav');
        }
    });

    document.addEventListener('click', function(e) {
        if (e.clientX !== 0 && e.clientY !== 0) {
            document.body.classList.remove('keyboard-nav');
        }
    });
}

// ============================================
// ERROR HANDLING
// ============================================

window.addEventListener('error', function(event) {
    console.error('Global error:', event.error);
    // In production, this would send error to logging service
});

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', function(event) {
    console.error('Unhandled promise rejection:', event.reason);
});

console.log('Eco-Stream Logistics website loaded successfully');
