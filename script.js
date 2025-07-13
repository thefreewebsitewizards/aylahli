document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    const mobileOverlay = document.getElementById('mobile-overlay');
    const body = document.body;
    const header = document.querySelector('header');
    
    // Mobile Navigation Toggle
    function toggleMobileNav() {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        mobileOverlay.classList.toggle('active');
        body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : 'auto';
    }
    
    // Close Mobile Navigation
    function closeMobileNav() {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        mobileOverlay.classList.remove('active');
        body.style.overflow = 'auto';
    }
    
    // Event Listeners for Mobile Navigation
    hamburger.addEventListener('click', toggleMobileNav);
    mobileOverlay.addEventListener('click', closeMobileNav);
    
    // Close mobile menu when clicking on navigation links
    navLinks.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') {
            closeMobileNav();
        }
    });
    
    // Close mobile menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navLinks.classList.contains('active')) {
            closeMobileNav();
        }
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
const headerHeight = header.offsetHeight;
const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Header background and size changes on scroll
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        
        // Header background change on scroll
        if (scrollY > 100) {
            header.style.background = 'rgba(0, 0, 0, 0.98)';
            header.style.padding = '0.5rem 0';
        } else {
            header.style.background = 'rgba(0, 0, 0, 0.9)';
            header.style.padding = '1rem 0';
        }
        
        // Hide/show header on scroll
        if (scrollY > lastScrollY && scrollY > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollY = scrollY;
    });
    
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Initialize fade-in animations
    document.querySelectorAll('.about, .music, .contact').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        fadeInObserver.observe(section);
    });
    
    // Enhanced hero image interactions
    const heroImages = document.querySelectorAll('.hero-image');
    
    heroImages.forEach((image, index) => {
        // Mouse enter effect
        image.addEventListener('mouseenter', () => {
            image.style.opacity = '0.6';
            image.style.transform = image.style.transform.includes('scale') 
                ? image.style.transform.replace('scale(1)', 'scale(1.05)') 
                : image.style.transform + ' scale(1.05)';
            image.style.zIndex = '5';
        });
        
        // Mouse leave effect
        image.addEventListener('mouseleave', () => {
            image.style.opacity = '0.2';
            image.style.transform = image.style.transform.includes('scale') 
                ? image.style.transform.replace('scale(1.05)', 'scale(1)') 
                : image.style.transform;
            image.style.zIndex = index === 0 ? '2' : '1';
        });
    });
    
    // Initialize header
    header.style.transition = 'all 0.3s ease';
});