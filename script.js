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

function hideLoader() {
    const loader = document.getElementById('loader');
    if (!loader) return;
    loader.classList.add('loader-hidden');
    setTimeout(() => {
        loader.style.display = 'none';
    }, 500);
}

function setFieldError(input, message) {
    if (!input) return;
    input.classList.add('input-error');
    input.setAttribute('aria-invalid', 'true');
    const existingError = input.nextElementSibling;
    if (existingError?.classList.contains('error-text')) {
        existingError.textContent = message;
        return;
    }
    const error = document.createElement('p');
    error.className = 'error-text';
    error.textContent = message;
    input.insertAdjacentElement('afterend', error);
}

function clearFieldError(input) {
    if (!input) return;
    input.classList.remove('input-error');
    input.removeAttribute('aria-invalid');
    const next = input.nextElementSibling;
    if (next?.classList.contains('error-text')) {
        next.remove();
    }
}

function setupInputValidation() {
    document.querySelectorAll('input[required], select[required], textarea[required]').forEach(input => {
        input.addEventListener('blur', () => {
            if (input.value.trim() === '') {
                setFieldError(input, 'Field ini wajib diisi.');
            } else {
                clearFieldError(input);
            }
        });

        input.addEventListener('input', () => {
            if (input.value.trim() !== '') {
                clearFieldError(input);
            }
        });
    });
}

// Smooth scroll untuk semua anchor links (desktop & mobile)
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            // Skip jika href hanya "#"
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (!target) return;
            
            e.preventDefault();
            
            // Tutup drawer jika terbuka
            const navLinks = document.querySelector('.nav-links');
            const overlay = document.querySelector('.drawer-overlay');
            const hamburger = document.querySelector('.hamburger');
            
            const closeDrawer = () => {
                if (navLinks?.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    overlay?.classList.remove('active');
                    hamburger?.classList.remove('active');
                    hamburger?.setAttribute('aria-expanded', 'false');
                }
            };
            
            // Scroll ke target
            const scrollToTarget = () => {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            };
            
            closeDrawer();
            setTimeout(scrollToTarget, 50);
        });
    });
}

// Panggil setup saat DOM ready
document.addEventListener('DOMContentLoaded', () => {
    setupSmoothScroll();
    setupInputValidation();

    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            backToTop.classList.toggle('show', window.scrollY > 420);
        });

        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});

window.addEventListener('load', () => {
    handleNavbarCompact();
    hideLoader();
});

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const overlay = document.querySelector('.drawer-overlay');
let closeMenu = null;

if (hamburger && navLinks) {
    closeMenu = () => {
        navLinks.classList.remove('active');
        overlay?.classList.remove('active');
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
    };

    // Toggle drawer saat hamburger diklik
    hamburger.addEventListener('click', (e) => {
        e.stopPropagation();
        const isActive = navLinks.classList.toggle('active');
        overlay?.classList.toggle('active', isActive);
        hamburger.classList.toggle('active', isActive);
        hamburger.setAttribute('aria-expanded', isActive ? 'true' : 'false');
    });

    // Tutup drawer saat overlay diklik
    overlay?.addEventListener('click', closeMenu);

    // Tutup drawer saat tombol ESC ditekan
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
    if (shouldCompact && navLinks?.classList.contains('active') && typeof closeMenu === 'function') {
        closeMenu();
    }
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

// Booking form handling with dynamic features
const bookingForm = document.getElementById('bookingForm');
if (bookingForm) {
    // Get form elements
    const serviceSelect = document.getElementById('service');
    const serviceMethodRadios = document.querySelectorAll('input[name="serviceMethod"]');
    const paymentMethodRadios = document.querySelectorAll('input[name="paymentMethod"]');
    const costEstimationContent = document.getElementById('costEstimationContent');
    const onlineServiceInfo = document.getElementById('onlineServiceInfo');
    const offlineServiceInfo = document.getElementById('offlineServiceInfo');
    const detailGroup = document.getElementById('detailGroup');
    const onlineAddressGroup = document.getElementById('onlineAddressGroup');
    const offlineAddressGroup = document.getElementById('offlineAddressGroup');
    const paymentMethodGroup = document.getElementById('paymentMethodGroup');
    const paymentDetailsDisplay = document.getElementById('paymentDetailsDisplay');
    const danaPaymentDetails = document.getElementById('danaPaymentDetails');
    const qrisPaymentDetails = document.getElementById('qrisPaymentDetails');
    const bookingSummary = document.getElementById('bookingSummary');
    const summaryMethod = document.getElementById('summaryMethod');
    const summaryPaymentItem = document.getElementById('summaryPaymentItem');
    const summaryPayment = document.getElementById('summaryPayment');
    const detectLocationBtn = document.getElementById('detectLocationBtn');
    const locationStatus = document.getElementById('locationStatus');
    const gmapsLinkInput = document.getElementById('gmapsLink');

    // Service prices
    const servicePrices = {
        'konsultasi-it': 150000,
        'instalasi-software': 200000,
        'perbaikan-ringan': 250000,
        'setup-dasar': 180000
    };

    // Update cost estimation
    function updateCostEstimation() {
        const selectedService = serviceSelect.value;
        const selectedMethod = document.querySelector('input[name="serviceMethod"]:checked')?.value;

        if (!selectedService) {
            costEstimationContent.innerHTML = '<p class="info-text">Pilih metode layanan untuk melihat estimasi biaya.</p>';
            return;
        }

        const basePrice = servicePrices[selectedService];
        let html = `<div class="cost-item">
            <span class="cost-item-name">Harga Dasar</span>
            <span class="cost-item-price">Mulai dari Rp${basePrice.toLocaleString('id-ID')}</span>
        </div>`;

        if (selectedMethod === 'offline') {
            html += `<div class="cost-item">
                <span class="cost-item-name">Biaya Kunjungan</span>
                <span class="cost-item-price">Tergantung lokasi</span>
            </div>`;
        }

        costEstimationContent.innerHTML = html;
    }

    // Toggle visibility based on service method
    function updateServiceMethodUI() {
        const selectedMethod = document.querySelector('input[name="serviceMethod"]:checked')?.value;

        // Reset payment selection
        document.querySelectorAll('input[name="paymentMethod"]').forEach(radio => radio.checked = false);

        // Reset file upload for offline method
        if (selectedMethod === 'offline') {
            removeSelectedFile();
        }

        detailGroup.classList.toggle('hidden', !selectedMethod);

        if (selectedMethod === 'online') {
            // Show online-specific elements
            onlineServiceInfo.classList.remove('hidden');
            offlineServiceInfo.classList.add('hidden');
            onlineAddressGroup.classList.remove('hidden');
            offlineAddressGroup.classList.add('hidden');
            paymentMethodGroup.classList.remove('hidden');
            paymentDetailsDisplay.classList.add('hidden');

            // Reset offline required fields
            document.getElementById('alamat').removeAttribute('required');
            document.getElementById('gmapsLink').removeAttribute('required');
            if (gmapsLinkInput) {
                gmapsLinkInput.readOnly = false;
            }
            if (locationStatus) {
                locationStatus.textContent = '';
            }
        } else if (selectedMethod === 'offline') {
            // Show offline-specific elements
            onlineServiceInfo.classList.add('hidden');
            offlineServiceInfo.classList.remove('hidden');
            onlineAddressGroup.classList.add('hidden');
            offlineAddressGroup.classList.remove('hidden');
            paymentMethodGroup.classList.add('hidden');
            paymentDetailsDisplay.classList.add('hidden');

            // Set offline required fields
            document.getElementById('alamat').setAttribute('required', '');
            document.getElementById('gmapsLink').setAttribute('required', '');
            if (gmapsLinkInput) {
                gmapsLinkInput.readOnly = false;
            }
        } else {
            // Hide all method-specific sections until a method is chosen
            onlineServiceInfo.classList.add('hidden');
            offlineServiceInfo.classList.add('hidden');
            onlineAddressGroup.classList.add('hidden');
            offlineAddressGroup.classList.add('hidden');
            paymentMethodGroup.classList.add('hidden');
            paymentDetailsDisplay.classList.add('hidden');
            bookingSummary.classList.add('hidden');
        }

        updateCostEstimation();
        updateBookingSummary();
    }

    // Handle payment method selection
    function handlePaymentMethodChange() {
        const selectedPayment = document.querySelector('input[name="paymentMethod"]:checked')?.value;

        paymentDetailsDisplay.classList.toggle('hidden', !selectedPayment);
        danaPaymentDetails.classList.toggle('hidden', selectedPayment !== 'dana');
        qrisPaymentDetails.classList.toggle('hidden', selectedPayment !== 'qris');

        updateBookingSummary();
    }

    // Update booking summary
    function updateBookingSummary() {
        const selectedMethod = document.querySelector('input[name="serviceMethod"]:checked')?.value;
        const selectedPayment = document.querySelector('input[name="paymentMethod"]:checked')?.value;

        if (!selectedMethod) {
            bookingSummary.classList.add('hidden');
            return;
        }

        bookingSummary.classList.remove('hidden');
        summaryMethod.textContent = selectedMethod === 'online' ? 'Online (Video Call / Chat)' : 'Offline (Kunjungan Langsung)';

        if (selectedMethod === 'online' && selectedPayment) {
            summaryPaymentItem.classList.remove('hidden');
            summaryPayment.textContent = selectedPayment === 'dana' ? 'DANA' : 'QRIS';
        } else {
            summaryPaymentItem.classList.add('hidden');
        }
    }

    function generateMapsUrl(latitude, longitude) {
        return `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
    }

    function updateLocationStatus(message, isError = false, mapsUrl = '') {
        if (!locationStatus) return;
        locationStatus.textContent = '';
        locationStatus.className = 'location-status';
        if (isError) {
            locationStatus.classList.add('error-text');
            locationStatus.textContent = message;
            return;
        }

        if (mapsUrl) {
            locationStatus.innerHTML = `${message} <a href="${mapsUrl}" target="_blank" rel="noopener">Buka Google Maps</a>`;
        } else {
            locationStatus.textContent = message;
        }
    }

    function detectLocation() {
        if (!navigator.geolocation) {
            updateLocationStatus('Geolocation tidak didukung di browser ini. Silakan masukkan link Google Maps secara manual.', true);
            return;
        }

        updateLocationStatus('Mencari lokasi Anda...');
        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            const mapsUrl = generateMapsUrl(latitude, longitude);

            if (gmapsLinkInput) {
                gmapsLinkInput.value = mapsUrl;
                gmapsLinkInput.readOnly = true;
            }

            updateLocationStatus('Lokasi terdeteksi. Google Maps terbuka otomatis.', false, mapsUrl);
            window.open(mapsUrl, '_blank');
        }, (error) => {
            let message = 'Gagal mendeteksi lokasi. Silakan isi link Google Maps secara manual.';
            if (error.code === error.PERMISSION_DENIED) {
                message = 'Izin lokasi ditolak. Aktifkan izin geolocation di browser untuk menggunakan fitur ini.';
            }
            updateLocationStatus(message, true);
        }, {
            enableHighAccuracy: true,
            timeout: 12000,
            maximumAge: 0
        });
    }

    // File upload handling
    const fileInput = document.getElementById('paymentProof');
    const filePreview = document.getElementById('filePreview');
    const fileName = document.getElementById('fileName');
    const fileError = document.getElementById('fileError');
    const removeFileBtn = document.getElementById('removeFileBtn');
    let selectedFile = null;

    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
    const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
    const ALLOWED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.pdf'];

    function showFileError(message) {
        fileError.textContent = message;
        fileError.classList.remove('hidden');
    }

    function clearFileError() {
        fileError.textContent = '';
        fileError.classList.add('hidden');
    }

    function validateFile(file) {
        // Check file size
        if (file.size > MAX_FILE_SIZE) {
            showFileError('Ukuran file terlalu besar. Maksimal 5MB.');
            return false;
        }

        // Check file type
        if (!ALLOWED_TYPES.includes(file.type)) {
            showFileError('Tipe file tidak didukung. Gunakan JPG, PNG, atau PDF.');
            return false;
        }

        clearFileError();
        return true;
    }

    function displayFilePreview(file) {
        fileName.textContent = file.name;
        filePreview.classList.remove('hidden');
        selectedFile = file;
    }

    function removeSelectedFile() {
        fileInput.value = '';
        selectedFile = null;
        filePreview.classList.add('hidden');
        clearFileError();
    }

    if (fileInput) {
        // Handle file selection via click
        fileInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file && validateFile(file)) {
                displayFilePreview(file);
            } else if (e.target.files[0]) {
                fileInput.value = '';
                selectedFile = null;
            }
        });

        // Handle drag and drop
        const fileUploadLabel = document.querySelector('.file-upload-label');
        if (fileUploadLabel) {
            ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
                fileUploadLabel.addEventListener(eventName, (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                });

                document.body.addEventListener(eventName, (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                });
            });

            ['dragenter', 'dragover'].forEach(eventName => {
                fileUploadLabel.addEventListener(eventName, () => {
                    fileUploadLabel.style.background = 'linear-gradient(135deg, rgba(37, 99, 235, 0.15) 0%, rgba(59, 130, 246, 0.12) 100%)';
                    fileUploadLabel.style.borderColor = '#1d4ed8';
                });
            });

            ['dragleave', 'drop'].forEach(eventName => {
                fileUploadLabel.addEventListener(eventName, () => {
                    fileUploadLabel.style.background = 'linear-gradient(135deg, rgba(37, 99, 235, 0.08) 0%, rgba(59, 130, 246, 0.06) 100%)';
                    fileUploadLabel.style.borderColor = '#2563eb';
                });
            });

            fileUploadLabel.addEventListener('drop', (e) => {
                const files = e.dataTransfer.files;
                if (files.length > 0) {
                    const file = files[0];
                    if (validateFile(file)) {
                        fileInput.files = files;
                        displayFilePreview(file);
                    }
                }
            });
        }

        if (removeFileBtn) {
            removeFileBtn.addEventListener('click', (e) => {
                e.preventDefault();
                removeSelectedFile();
            });
        }
    }

    // Event listeners
    serviceSelect.addEventListener('change', updateCostEstimation);

    serviceMethodRadios.forEach(radio => {
        radio.addEventListener('change', updateServiceMethodUI);
    });

    paymentMethodRadios.forEach(radio => {
        radio.addEventListener('change', handlePaymentMethodChange);
    });

    if (detectLocationBtn) {
        detectLocationBtn.addEventListener('click', detectLocation);
    }

    // Form submission
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
        const serviceMethod = (formData.get('serviceMethod') || '').trim();
        const paymentMethod = (formData.get('paymentMethod') || '').trim();

        // Validate required fields
        const nameInput = document.getElementById('nama');
        const phoneInput = document.getElementById('phone');
        const serviceSelectElement = document.getElementById('service');
        const keluhanInput = document.getElementById('keluhan');

        clearFieldError(nameInput);
        clearFieldError(phoneInput);
        clearFieldError(serviceSelectElement);
        clearFieldError(keluhanInput);

        if (!nama || !phone || !service || !keluhan || !serviceMethod) {
            if (!nama) setFieldError(nameInput, 'Nama wajib diisi.');
            if (!phone) setFieldError(phoneInput, 'Nomor HP wajib diisi.');
            if (!service) setFieldError(serviceSelectElement, 'Pilih jenis layanan terlebih dahulu.');
            if (!keluhan) setFieldError(keluhanInput, 'Keluhan atau keterangan wajib diisi.');
            showMessage('Silakan isi semua field wajib sebelum mengirim.', 'error');
            if (submitBtn) { submitBtn.textContent = originalText; submitBtn.disabled = false; }
            return;
        }

        // Validate method-specific required fields
        if (serviceMethod === 'offline') {
            const alamat = (formData.get('alamat') || '').trim();
            const gmapsLink = (formData.get('gmapsLink') || '').trim();
            const alamatInput = document.getElementById('alamat');
            const gmapsInput = document.getElementById('gmapsLink');

            clearFieldError(alamatInput);
            clearFieldError(gmapsInput);

            if (!alamat || !gmapsLink) {
                if (!alamat) setFieldError(alamatInput, 'Alamat lengkap harus diisi untuk layanan offline.');
                if (!gmapsLink) setFieldError(gmapsInput, 'Link Google Maps harus diisi untuk layanan offline.');
                showMessage('Untuk layanan Offline, alamat lengkap dan link Google Maps harus diisi.', 'error');
                if (submitBtn) { submitBtn.textContent = originalText; submitBtn.disabled = false; }
                return;
            }
        }

        if (serviceMethod === 'online' && !paymentMethod) {
            showMessage('Untuk layanan Online, pilih metode pembayaran.', 'error');
            if (submitBtn) { submitBtn.textContent = originalText; submitBtn.disabled = false; }
            return;
        }

        // Validate payment proof for online method
        if (serviceMethod === 'online' && !selectedFile) {
            showMessage('Untuk layanan Online, upload bukti pembayaran Anda.', 'error');
            if (submitBtn) { submitBtn.textContent = originalText; submitBtn.disabled = false; }
            return;
        }

        // Build booking data
        const bookingData = {
            nama,
            phone,
            service,
            keluhan,
            serviceMethod,
            timestamp: new Date().toISOString()
        };

        // Add optional/conditional fields
        if (serviceMethod === 'offline') {
            bookingData.alamat = (formData.get('alamat') || '').trim();
            bookingData.gmapsLink = (formData.get('gmapsLink') || '').trim();
        } else {
            bookingData.alamatOnline = (formData.get('alamatOnline') || '').trim();
            bookingData.paymentMethod = paymentMethod;
            bookingData.paymentProofFileName = selectedFile?.name || '';
        }

        try {
            if (typeof window.firebaseDatabase !== 'undefined' && typeof window.firebaseRef === 'function') {
                const bookingsRef = window.firebaseRef(window.firebaseDatabase, 'bookings');
                const newBookingRef = window.firebasePush(bookingsRef);
                await window.firebaseSet(newBookingRef, bookingData);

                showMessage('Booking berhasil dikirim. Tim akan menghubungi Anda segera.', 'success');
                e.target.reset();
                // Reset UI
                updateServiceMethodUI();
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

const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
    item.addEventListener('click', () => {
        const isExpanded = item.classList.toggle('active');
        item.setAttribute('aria-expanded', String(isExpanded));
        const answer = item.querySelector('.answer');
        if (answer) {
            answer.classList.toggle('hidden', !isExpanded);
        }
        faqItems.forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
                otherItem.setAttribute('aria-expanded', 'false');
                const otherAnswer = otherItem.querySelector('.answer');
                if (otherAnswer) {
                    otherAnswer.classList.add('hidden');
                }
            }
        });
    });
});

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

