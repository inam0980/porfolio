// ==================== Mobile Menu Toggle ====================
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close menu when nav link is clicked
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// ==================== Navbar Background on Scroll ====================
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(15, 23, 42, 0.95)';
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(15, 23, 42, 0.8)';
        navbar.style.boxShadow = 'none';
    }
});

// ==================== Smooth Scroll Behavior ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        const href = anchor.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// ==================== Scroll Animations ====================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for scroll animation
document.querySelectorAll('.project-card, .skill-category, .education-item, .cert-card, .highlight-card, .stat-card').forEach(element => {
    element.style.opacity = '0';
    observer.observe(element);
});

// Add fadeInUp animation to CSS dynamically
const style = document.createElement('style');
style.innerHTML = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// ==================== Active Navigation Link ====================
window.addEventListener('scroll', () => {
    let current = '';
    
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.style.color = '#6366f1';
        } else {
            link.style.color = '';
        }
    });
});

// ==================== Counter Animation ====================
const animateCounters = () => {
    const counters = document.querySelectorAll('.stat-card h3');
    const speed = 100;

    const runCounter = (element) => {
        const target = +element.innerText.match(/\d+/)[0];
        const increment = target / speed;

        let count = 0;
        
        const updateCount = () => {
            count += increment;
            if (count < target) {
                const suffix = element.innerText.match(/[^\d]/g).join('');
                element.innerText = Math.ceil(count) + suffix;
                setTimeout(updateCount, 30);
            } else {
                element.innerText = target + element.innerText.match(/[^\d]/g).join('');
            }
        };

        updateCount();
    };

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const h3 = element.querySelector('h3');
                if (h3 && !h3.hasAttribute('data-animated')) {
                    h3.setAttribute('data-animated', 'true');
                    runCounter(h3);
                }
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.stat-card').forEach(card => {
        counterObserver.observe(card);
    });
};

animateCounters();

// ==================== Project Card Hover Effect ====================
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// ==================== Form Validation (if contact form is added) ====================
const validateForm = (formData) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!formData.name || formData.name.trim() === '') {
        return { valid: false, message: 'Name is required' };
    }
    
    if (!formData.email || !emailRegex.test(formData.email)) {
        return { valid: false, message: 'Valid email is required' };
    }
    
    if (!formData.message || formData.message.trim() === '') {
        return { valid: false, message: 'Message is required' };
    }
    
    return { valid: true, message: 'Form is valid' };
};

// ==================== Typewriter Effect (Optional - for hero title) ====================
const typewriterEffect = (element, text, speed = 100) => {
    let index = 0;
    element.innerHTML = '';
    
    const type = () => {
        if (index < text.length) {
            element.innerHTML += text.charAt(index);
            index++;
            setTimeout(type, speed);
        }
    };
    
    type();
};

// Uncomment to activate typewriter effect on hero title
// window.addEventListener('load', () => {
//     const heroTitle = document.querySelector('.hero-title');
//     const originalText = heroTitle.innerText;
//     typewriterEffect(heroTitle, originalText, 50);
// });

// ==================== Parallax Effect ====================
window.addEventListener('scroll', () => {
    const parallaxElements = document.querySelectorAll('.hero-title, .hero-subtitle');
    const scrollPosition = window.scrollY;

    parallaxElements.forEach(element => {
        element.style.transform = `translateY(${scrollPosition * 0.5}px)`;
    });
});

// ==================== Dark/Light Mode Toggle (Optional) ====================
const initThemeToggle = () => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = localStorage.getItem('theme') || (prefersDark ? 'dark' : 'light');
    
    if (theme === 'light') {
        document.body.style.filter = 'invert(1)';
    }
};

// Uncomment to enable theme toggle
// initThemeToggle();

// ==================== Copy to Clipboard ====================
const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
        // Show confirmation (optional)
        console.log('Copied to clipboard:', text);
    }).catch(err => {
        console.error('Failed to copy:', err);
    });
};

// Make contact cards copyable
document.querySelectorAll('.contact-card').forEach(card => {
    card.addEventListener('click', (e) => {
        const text = card.querySelector('p').innerText;
        if (text.includes('@') || text.includes('+91')) {
            e.preventDefault();
            copyToClipboard(text);
            
            // Show feedback
            const originalText = card.innerHTML;
            card.innerHTML = '<div style="color: #10b981; font-weight: bold;">Copied!</div>';
            setTimeout(() => {
                card.innerHTML = originalText;
            }, 1500);
        }
    });
});

// ==================== Page Load Animation ====================
window.addEventListener('load', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach((link, index) => {
        link.style.animation = `slideInLeft ${0.3 + index * 0.1}s ease forwards`;
    });
});

// ==================== Lazy Load Images ====================
const lazyLoadImages = () => {
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for older browsers
        images.forEach(img => {
            img.src = img.dataset.src;
        });
    }
};

lazyLoadImages();

// ==================== Scroll to Top Button ====================
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollToTopBtn.className = 'scroll-to-top';
scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, #6366f1, #ec4899);
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    display: none;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    z-index: 999;
    transition: all 0.3s ease;
    box-shadow: 0 5px 20px rgba(99, 102, 241, 0.4);
`;

document.body.appendChild(scrollToTopBtn);

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollToTopBtn.style.display = 'flex';
    } else {
        scrollToTopBtn.style.display = 'none';
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

scrollToTopBtn.addEventListener('mouseenter', function() {
    this.style.transform = 'scale(1.1)';
});

scrollToTopBtn.addEventListener('mouseleave', function() {
    this.style.transform = 'scale(1)';
});

// ==================== Print Friendly ====================
const printPortfolio = () => {
    window.print();
};

// ==================== Keyboard Shortcuts ====================
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + P to print
    if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
        e.preventDefault();
        printPortfolio();
    }
});

// ==================== Email Validation ====================
const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

// ==================== Initialize on Page Load ====================
document.addEventListener('DOMContentLoaded', () => {
    console.log('Portfolio loaded successfully!');
    
    // Add any initialization code here
    // Example: Initialize tooltips, set up event listeners, etc.
});
