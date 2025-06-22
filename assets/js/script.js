// Portfolio JavaScript - Thalal Rafi

document.addEventListener('DOMContentLoaded', function() {
    // Initialize Lucide icons
    lucide.createIcons();
    
    // Header scroll effect and navigation
    const header = document.getElementById('header');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuContent = document.getElementById('mobile-menu-content');
    const mobileBackdrop = document.getElementById('mobile-backdrop');
    const mobileCloseBtn = document.getElementById('mobile-close-btn');
    const menuIcon = document.getElementById('menu-icon');
    const closeIcon = document.getElementById('close-icon');
    
    // Scroll to top button
    const scrollToTopBtn = document.getElementById('scrollToTop');
    
    // Header background on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('bg-slate-900/95', 'backdrop-blur-md', 'border-red-500/20');
            header.classList.remove('border-transparent');
        } else {
            header.classList.remove('bg-slate-900/95', 'backdrop-blur-md', 'border-red-500/20');
            header.classList.add('border-transparent');
        }
        
        // Show/hide scroll to top button
        if (window.scrollY > 300) {
            scrollToTopBtn.classList.remove('scale-0');
            scrollToTopBtn.classList.add('scale-100');
        } else {
            scrollToTopBtn.classList.add('scale-0');
            scrollToTopBtn.classList.remove('scale-100');
        }
        
        // Update active navigation links
        updateActiveNavLink();
    });
    
    // Mobile menu functions
    function openMobileMenu() {
        mobileMenu.classList.remove('opacity-0', 'pointer-events-none');
        mobileMenu.classList.add('opacity-100');
        setTimeout(() => {
            mobileMenuContent.classList.remove('-translate-x-full');
        }, 50);
        menuIcon.classList.add('hidden');
        closeIcon.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
    
    function closeMobileMenu() {
        mobileMenuContent.classList.add('-translate-x-full');
        setTimeout(() => {
            mobileMenu.classList.add('opacity-0', 'pointer-events-none');
            mobileMenu.classList.remove('opacity-100');
        }, 300);
        menuIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }
    
    // Mobile menu toggle
    mobileMenuBtn.addEventListener('click', openMobileMenu);
    mobileCloseBtn.addEventListener('click', closeMobileMenu);
    
    // Scroll to top functionality
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Close mobile menu when clicking on backdrop
    mobileBackdrop.addEventListener('click', closeMobileMenu);
    
    // Close mobile menu when clicking on links
    const mobileNavLinks = document.querySelectorAll('.nav-link-mobile');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            setTimeout(closeMobileMenu, 150); // Small delay for better UX
        });
    });
    
    // Active section highlighting
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link, .nav-link-mobile');
        const scrollPosition = window.scrollY + header.offsetHeight + 100;
        const documentHeight = document.documentElement.scrollHeight;
        const windowHeight = window.innerHeight;
        
        let currentSection = '';
        
        // Check if we're at the bottom of the page (footer area)
        if (window.scrollY + windowHeight >= documentHeight - 50) {
            // If we're at the bottom, highlight the contact section
            currentSection = 'contact';
        } else {
            // Normal section detection
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                
                if (scrollPosition >= sectionTop && scrollPosition <= sectionTop + sectionHeight) {
                    currentSection = section.getAttribute('id');
                }
            });
        }
        
        // Remove active class from all links
        navLinks.forEach(link => {
            link.classList.remove('text-red-400', 'bg-red-500/10');
            link.classList.add('text-gray-300');
        });
        
        // Add active class to current section link
        if (currentSection) {
            const activeLinks = document.querySelectorAll(`a[href="#${currentSection}"]`);
            activeLinks.forEach(link => {
                if (link.classList.contains('nav-link') || link.classList.contains('nav-link-mobile')) {
                    link.classList.remove('text-gray-300');
                    link.classList.add('text-red-400');
                    if (link.classList.contains('nav-link-mobile')) {
                        link.classList.add('bg-red-500/10');
                    }
                }
            });
        }
    }
    
    // Initialize active nav on page load
    setTimeout(updateActiveNavLink, 100);
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    animateElements.forEach(el => observer.observe(el));
    
    // Add animation classes to elements
    const sections = document.querySelectorAll('section > div');
    sections.forEach(section => {
        section.classList.add('animate-on-scroll');
    });
    
    // Skills animation
    const skillBars = document.querySelectorAll('.skill-progress');
    const skillsSection = document.getElementById('skills');
    
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                skillBars.forEach(bar => {
                    const width = bar.style.width;
                    bar.style.width = '0%';
                    setTimeout(() => {
                        bar.style.width = width;
                    }, 100);
                });
                skillsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    if (skillsSection) {
        skillsObserver.observe(skillsSection);
    }
    
    // Typing effect for hero section
    const heroText = document.querySelector('.text-gradient');
    if (heroText) {
        const text = heroText.textContent;
        heroText.textContent = '';
        let i = 0;
        
        const typeWriter = () => {
            if (i < text.length) {
                heroText.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        setTimeout(typeWriter, 1000);
    }
    
    // Counter animation for stats
    const counters = document.querySelectorAll('.stat-card .text-3xl');
    
    const countUp = (element, target) => {
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            if (target.toString().includes('+')) {
                element.textContent = Math.floor(current) + '+';
            } else {
                element.textContent = Math.floor(current);
            }
        }, 30);
    };
    
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const text = entry.target.textContent;
                const number = parseInt(text.replace(/\D/g, ''));
                countUp(entry.target, number);
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => statsObserver.observe(counter));
    
    // Form handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const formElements = this.querySelectorAll('input, textarea');
            const submitBtn = this.querySelector('button[type="submit"]');
            
            // Disable form elements
            formElements.forEach(el => el.disabled = true);
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i data-lucide="loader-2" class="w-4 h-4 mr-2 animate-spin"></i>Sending...';
            
            // Simulate form submission (replace with actual API call)
            setTimeout(() => {
                // Show success message
                showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
                
                // Reset form
                this.reset();
                
                // Re-enable form elements
                formElements.forEach(el => el.disabled = false);
                submitBtn.disabled = false;
                submitBtn.innerHTML = 'Send Message <i data-lucide="send" class="w-4 h-4 ml-2"></i>';
                
                // Recreate icons
                lucide.createIcons();
            }, 2000);
        });
    }
    
    // Notification system
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transition-all duration-300 transform translate-x-full`;
        
        if (type === 'success') {
            notification.className += ' bg-green-500 text-white';
        } else if (type === 'error') {
            notification.className += ' bg-red-500 text-white';
        } else {
            notification.className += ' bg-blue-500 text-white';
        }
        
        notification.innerHTML = `
            <div class="flex items-center gap-3">
                <i data-lucide="${type === 'success' ? 'check-circle' : type === 'error' ? 'x-circle' : 'info'}" class="w-5 h-5"></i>
                <span>${message}</span>
                <button onclick="this.parentElement.parentElement.remove()" class="ml-2">
                    <i data-lucide="x" class="w-4 h-4"></i>
                </button>
            </div>
        `;
        
        document.body.appendChild(notification);
        lucide.createIcons();
        
        // Show notification
        setTimeout(() => {
            notification.classList.remove('translate-x-full');
        }, 100);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            notification.classList.add('translate-x-full');
            setTimeout(() => {
                if (notification.parentElement) {
                    notification.remove();
                }
            }, 300);
        }, 5000);
    }
    
    // Particle effect for hero section (optional enhancement)
    function createParticles() {
        const hero = document.getElementById('home');
        if (!hero) return;
        
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                width: 2px;
                height: 2px;
                background: rgba(239, 68, 68, 0.3);
                border-radius: 50%;
                animation: float ${Math.random() * 3 + 2}s linear infinite;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation-delay: ${Math.random() * 2}s;
            `;
            hero.appendChild(particle);
        }
    }
    
    // Initialize particles on larger screens
    if (window.innerWidth > 768) {
        createParticles();
    }
    
    // Handle download CV button
    const downloadCVBtn = document.querySelector('a[href="#"]:has(i[data-lucide="download"])');
    if (downloadCVBtn) {
        downloadCVBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showNotification('CV download will be available soon!', 'info');
        });
    }
    
    // Add loading animation to project buttons
    const projectBtns = document.querySelectorAll('.project-card button, .project-card a');
    projectBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            if (this.textContent.includes('Code') || this.textContent.includes('Demo')) {
                e.preventDefault();
                const isDemo = this.textContent.includes('Demo');
                showNotification(
                    isDemo ? 'Demo link coming soon!' : 'Code repository coming soon!',
                    'info'
                );
            }
        });
    });
    
    // Keyboard navigation support
    document.addEventListener('keydown', function(e) {
        // Escape key closes mobile menu
        if (e.key === 'Escape' && !mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }
        
        // Tab navigation support for mobile menu
        if (e.key === 'Tab' && !mobileMenu.classList.contains('hidden')) {
            const focusableElements = mobileMenu.querySelectorAll('a[href]');
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];
            
            if (e.shiftKey && document.activeElement === firstElement) {
                e.preventDefault();
                lastElement.focus();
            } else if (!e.shiftKey && document.activeElement === lastElement) {
                e.preventDefault();
                firstElement.focus();
            }
        }
    });
    
    // Preload images for better performance
    const imagesToPreload = [
        'assets/img/profile.jpg'
        // Add more images here if needed
    ];
    
    imagesToPreload.forEach(src => {
        const img = new Image();
        img.src = src;
    });
    
    // Lazy loading for images (if you add more images later)
    const lazyImages = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
    
    // Update copyright year
    const copyrightElement = document.querySelector('footer p');
    if (copyrightElement && copyrightElement.textContent.includes('2024')) {
        const currentYear = new Date().getFullYear();
        if (currentYear > 2024) {
            copyrightElement.textContent = copyrightElement.textContent.replace('2024', currentYear);
        }
    }
    
    // Performance optimization: Debounce scroll events
    let ticking = false;
    
    function updateOnScroll() {
        // Any scroll-based updates go here
        ticking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateOnScroll);
            ticking = true;
        }
    });
    
    console.log('🚀 Portfolio loaded successfully!');
}); 