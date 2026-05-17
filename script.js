// Function to show messages
function showMessage(message, type) {
    const messageContainer = document.getElementById('messageContainer');
    if (messageContainer) {
        messageContainer.innerHTML = `<div class="message ${type}">${message}</div>`;
        setTimeout(() => {
            messageContainer.innerHTML = '';
        }, 5000);
        return;
    }
    // fallback to toast
    const toast = document.getElementById('toast');
    if (toast) {
        toast.textContent = message;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 4500);
    } else {
        alert(message);
    }
}
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

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const overlay = document.querySelector('.drawer-overlay');
const closeButton = document.querySelector('.drawer-close');
if (hamburger && navLinks) {
    const closeMenu = () => {
        navLinks.classList.remove('active');
        overlay?.classList.remove('active');
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
    };

    const openMenu = () => {
        navLinks.classList.add('active');
        overlay?.classList.add('active');
        hamburger.classList.add('active');
        hamburger.setAttribute('aria-expanded', 'true');
    };

    hamburger.addEventListener('click', () => {
        const isActive = navLinks.classList.toggle('active');
        overlay?.classList.toggle('active', isActive);
        hamburger.setAttribute('aria-expanded', isActive ? 'true' : 'false');
        hamburger.classList.toggle('active', isActive);
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Close menu when clicking overlay
    overlay?.addEventListener('click', closeMenu);
    closeButton?.addEventListener('click', closeMenu);

    // Close menu on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navLinks.classList.contains('active')) {
            closeMenu();
        }
    });
}

// Navbar compact mode on scroll
const navbar = document.querySelector('.navbar');
const handleNavbarCompact = () => {
    if (!navbar) return;
    const shouldCompact = window.scrollY > 120;
    navbar.classList.toggle('compact', shouldCompact);
};
window.addEventListener('scroll', handleNavbarCompact);
window.addEventListener('load', handleNavbarCompact);

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
        }
    });
}, observerOptions);

// Observe elements for animation (apply fade-in-up helper class initially)
document.querySelectorAll('.service-card, .testimonial-card, .contact-card, .highlight-card, .section .card, .hero-text, .hero-media img').forEach(el => {
    el.classList.add('fade-in-up');
    observer.observe(el);
});

// Booking form submission with Firebase Realtime Database
const bookingForm = document.getElementById('bookingForm');
if (bookingForm) {
    bookingForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const submitBtn = e.target.querySelector('button[type="submit"]') || e.target.querySelector('.btn-primary');
        const originalText = submitBtn ? submitBtn.textContent : 'Kirim';
        if (submitBtn) {
            submitBtn.textContent = 'Mengirim...';
            submitBtn.disabled = true;
        }

        const formData = new FormData(e.target);
        const nama = (formData.get('nama') || '').trim();
        const phone = (formData.get('phone') || '').trim();
        const service = (formData.get('service') || '').trim();
        const keluhan = (formData.get('keluhan') || '').trim();
        const alamat = (formData.get('alamat') || '').trim();

        if (!nama || !phone || !service || !keluhan) {
            showMessage('Silakan isi semua field wajib sebelum mengirim.', 'error');
            if (submitBtn) { submitBtn.textContent = originalText; submitBtn.disabled = false; }
            return;
        }

        const bookingData = {
            nama,
            phone,
            service,
            keluhan,
            alamat: alamat || '',
            timestamp: new Date().toISOString()
        };

        try {
            if (typeof window.firebaseDatabase !== 'undefined' && typeof window.firebaseRef === 'function') {
                const bookingsRef = window.firebaseRef(window.firebaseDatabase, 'bookings');
                const newBookingRef = window.firebasePush(bookingsRef);
                await window.firebaseSet(newBookingRef, bookingData);

                showMessage('Booking berhasil dikirim. Tim akan menghubungi Anda.', 'success');
                e.target.reset();
            } else {
                showMessage('Firebase belum terhubung. Periksa konfigurasi.', 'error');
            }
        } catch (error) {
            console.error('Error saving booking:', error);
            showMessage('Gagal mengirim booking. Silakan coba lagi nanti.', 'error');
        } finally {
            if (submitBtn) { submitBtn.textContent = originalText; submitBtn.disabled = false; }
        }
    });
}

// Contact form submission (basic - optional)
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        showMessage('Pesan berhasil dikirim! Kami akan menghubungi Anda segera.', 'success');
        e.target.reset();
    });
}

// Service card hover effects
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Testimonial card hover effects
document.querySelectorAll('.testimonial-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-5px)';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// WhatsApp button animation (if present)
const whatsappBtn = document.querySelector('.whatsapp-btn');
if (whatsappBtn) {
    setInterval(() => {
        whatsappBtn.style.transform = 'scale(1.06)';
        setTimeout(() => {
            whatsappBtn.style.transform = 'scale(1)';
        }, 900);
    }, 5000);
}

// Form validation enhancement
const inputs = document.querySelectorAll('input, select, textarea');
inputs.forEach(input => {
    input.addEventListener('blur', () => {
        if (input.value.trim() === '' && input.hasAttribute('required')) {
            input.style.borderColor = '#ff6b6b';
        } else {
            input.style.borderColor = '#ddd';
        }
    });

    input.addEventListener('focus', () => {
        input.style.borderColor = '#667eea';
    });
});

// Initialize animations on page load
window.addEventListener('load', () => {
    // hide loader
    const loader = document.getElementById('loader');
    if (loader) {
        loader.classList.add('loader-hidden');
        setTimeout(() => loader.remove(), 700);
    }

    document.querySelectorAll('.hero-text h1, .hero-text p, .hero-media img').forEach((el, index) => {
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * 180);
    });
    // show back-to-top when scrolled
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) backToTop.classList.add('show'); else backToTop.classList.remove('show');
        });
        backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    }
});

// Add initial styles for animations
document.addEventListener('DOMContentLoaded', () => {
    const style = document.createElement('style');
    style.textContent = `
        .hero-text h1, .hero-text p, .hero-media img {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s ease;
        }
        .hero-media img {
            transition-delay: 0.2s;
        }
    `;
    document.head.appendChild(style);
});

