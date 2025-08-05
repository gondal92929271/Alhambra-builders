// Enhanced Main JavaScript for Alhamra Builders Website
// Combined functionality from all previous JS files

document.addEventListener('DOMContentLoaded', function() {    // =====================================================
    // HEADER SCROLL EFFECT & MOBILE NAVIGATION
    // =====================================================
    const header = document.querySelector('header');
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    const navUl = document.querySelector('nav ul');
    const navList = document.querySelector('nav ul');
    
    // Header scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Mobile navigation toggle (enhanced version)
    const mobileToggle = mobileNavToggle || mobileMenuToggle;
    const navElement = mobileNav || navUl || navList;
      if (mobileToggle && navElement) {
        mobileToggle.addEventListener('click', function() {
            navElement.classList.toggle('active');
            navElement.classList.toggle('open');
            mobileToggle.classList.toggle('open');
            
            // Prevent body scroll when mobile menu is open
            if (navElement.classList.contains('active') || navElement.classList.contains('open')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
            
            // Enhanced hamburger animation using CSS classes
            // The animation is now handled entirely by CSS with the .open class
        });
        
        // Close mobile menu when clicking on a link
        const mobileNavLinks = document.querySelectorAll('.mobile-nav a');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', function() {
                navElement.classList.remove('active', 'open');
                mobileToggle.classList.remove('open');
                document.body.style.overflow = '';
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!mobileToggle.contains(event.target) && !navElement.contains(event.target)) {
                if (navElement.classList.contains('active') || navElement.classList.contains('open')) {
                    navElement.classList.remove('active', 'open');
                    mobileToggle.classList.remove('open');
                    document.body.style.overflow = '';
                }
            }
        });
        
        // Close mobile menu on window resize
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                navElement.classList.remove('active', 'open');
                mobileToggle.classList.remove('open');
                document.body.style.overflow = '';
            }
        });
    }    // =====================================================
    // ENHANCED CAROUSEL FUNCTIONALITY
    // =====================================================
    function initCarousel(carouselSelector, slideSelector) {
        const carousel = document.querySelector(carouselSelector);
        if (!carousel) return;

        const slides = carousel.querySelectorAll(slideSelector);
        if (slides.length === 0) return;

        let currentIndex = 0;
        const totalSlides = slides.length;
        let autoPlayInterval;
        let progressInterval;

        // Create navigation dots
        const dotsContainer = document.createElement('div');
        dotsContainer.className = 'carousel-dots';
        
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('span');
            dot.className = 'dot';
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        }
        carousel.appendChild(dotsContainer);

        // Create navigation arrows
        const prevBtn = document.createElement('button');
        prevBtn.className = 'carousel-btn prev-btn';
        prevBtn.innerHTML = '‹';
        prevBtn.setAttribute('aria-label', 'Previous slide');
        prevBtn.addEventListener('click', prevSlide);

        const nextBtn = document.createElement('button');
        nextBtn.className = 'carousel-btn next-btn';
        nextBtn.innerHTML = '›';
        nextBtn.setAttribute('aria-label', 'Next slide');
        nextBtn.addEventListener('click', nextSlide);

        carousel.appendChild(prevBtn);
        carousel.appendChild(nextBtn);

        // Create progress bar functionality
        const progressBar = carousel.querySelector('.progress-bar');        function updateCarousel(animate = true) {
            // Update slide visibility and transitions
            slides.forEach((slide, index) => {
                slide.classList.remove('active', 'prev', 'next');
                
                if (index === currentIndex) {
                    slide.classList.add('active');
                    slide.style.display = 'block';
                } else {
                    slide.style.display = 'none';
                    if (index < currentIndex) {
                        slide.classList.add('prev');
                    } else {
                        slide.classList.add('next');
                    }
                }
            });
            
            // Update dots
            const dots = carousel.querySelectorAll('.dot');
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });

            // Reset progress bar
            if (progressBar) {
                progressBar.style.width = '0%';
                setTimeout(() => {
                    progressBar.style.width = '100%';
                }, 100);
            }

            // Add loading animation for smooth transitions
            if (animate) {
                const loading = carousel.querySelector('.carousel-loading');
                if (loading) {
                    loading.classList.add('active');
                    setTimeout(() => {
                        loading.classList.remove('active');
                    }, 300);
                }
            }
        }

        function nextSlide() {
            currentIndex = (currentIndex + 1) % totalSlides;
            updateCarousel();
            resetAutoPlay();
        }

        function prevSlide() {
            currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
            updateCarousel();
            resetAutoPlay();
        }

        function goToSlide(index) {
            if (index !== currentIndex) {
                currentIndex = index;
                updateCarousel();
                resetAutoPlay();
            }
        }

        function startAutoPlay() {
            autoPlayInterval = setInterval(() => {
                nextSlide();
            }, 5000);
        }

        function stopAutoPlay() {
            if (autoPlayInterval) {
                clearInterval(autoPlayInterval);
            }
        }

        function resetAutoPlay() {
            stopAutoPlay();
            startAutoPlay();
        }

        // Pause on hover
        carousel.addEventListener('mouseenter', stopAutoPlay);
        carousel.addEventListener('mouseleave', startAutoPlay);

        // Keyboard navigation
        carousel.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                prevSlide();
            } else if (e.key === 'ArrowRight') {
                nextSlide();
            }
        });

        // Touch/swipe support for mobile
        let startX = 0;
        let startY = 0;
        let isDragging = false;

        carousel.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
            isDragging = true;
            stopAutoPlay();
        });

        carousel.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            e.preventDefault();
        });

        carousel.addEventListener('touchend', (e) => {
            if (!isDragging) return;
            
            const endX = e.changedTouches[0].clientX;
            const endY = e.changedTouches[0].clientY;
            const deltaX = startX - endX;
            const deltaY = startY - endY;

            // Check if horizontal swipe was more significant than vertical
            if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
                if (deltaX > 0) {
                    nextSlide();
                } else {
                    prevSlide();
                }
            }
            
            isDragging = false;
            startAutoPlay();
        });

        // Initialize carousel
        updateCarousel(false);
        startAutoPlay();

        // Intersection Observer for performance
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    startAutoPlay();
                } else {
                    stopAutoPlay();
                }
            });
        });

        observer.observe(carousel);
    }

    // Initialize carousels
    initCarousel('.project-carousel', '.project-slide');
    initCarousel('.testimonials-carousel', '.testimonial-slide');

    // =====================================================
    // ACCORDION FUNCTIONALITY (ECO4 PAGE)
    // =====================================================
    const accordions = document.querySelectorAll('.accordion-header');
    accordions.forEach(header => {
        header.addEventListener('click', function() {
            const body = header.nextElementSibling;
            const isOpen = body.classList.contains('open');

            // Toggle active state on header
            header.classList.toggle('active');

            if (isOpen) {
                // Collapse
                body.style.maxHeight = null;
                body.classList.remove('open');
            } else {
                // Expand
                body.style.maxHeight = body.scrollHeight + 'px';
                body.classList.add('open');
            }
        });
    });    // =====================================================
    // ENHANCED PROJECT MODAL FUNCTIONALITY
    // =====================================================
    const projectButtons = document.querySelectorAll('.view-project');
    const projectCards = document.querySelectorAll('.project-card');
    const modal = document.querySelector('.modal');
    const modalContent = document.querySelector('.modal-content');

    // Enhanced project data with comprehensive details
    const projectData = {
        'project1': {
            title: 'Modern Kitchen Extension',
            location: 'Swinton, Manchester',
            image: '/images/Modern Kitchen Extension.jpg',
            description: 'A stunning contemporary kitchen extension featuring bi-fold doors, premium finishes, and seamless indoor-outdoor living space that transformed this family home.',
            details: {
                'Project Type': 'Single Storey Extension',
                'Duration': '8 weeks',
                'Size': '25 sqm',
                'Budget Range': '£35,000 - £45,000'
            },
            specifications: {
                'Planning': 'Permitted Development',
                'Foundation': 'Concrete Pad Foundation',
                'Roof': 'Flat Roof with Skylights',
                'Glazing': 'Triple Glazed Bi-fold Doors'
            },
            features: [
                { icon: 'fas fa-home', text: 'Open Plan Design' },
                { icon: 'fas fa-sun', text: 'Natural Light Optimization' },
                { icon: 'fas fa-leaf', text: 'Energy Efficient' },
                { icon: 'fas fa-tools', text: 'Premium Fixtures' }
            ]
        },
        'project2': {
            title: 'Dormer Loft Conversion',
            location: 'Didsbury, Manchester',
            image: '/images/Dormer Loft Conversion.jpg',
            description: 'Expert loft conversion creating two additional bedrooms and a luxury bathroom, maximizing space while maintaining the property\'s character and charm.',
            details: {
                'Project Type': 'Dormer Loft Conversion',
                'Duration': '6 weeks',
                'Size': '35 sqm',
                'Budget Range': '£25,000 - £35,000'
            },
            specifications: {
                'Planning': 'Building Regulations',
                'Insulation': 'High Performance Insulation',
                'Windows': 'Velux Roof Windows',
                'Heating': 'Underfloor Heating'
            },
            features: [
                { icon: 'fas fa-bed', text: 'Two Additional Bedrooms' },
                { icon: 'fas fa-bath', text: 'En-suite Bathroom' },
                { icon: 'fas fa-stairs', text: 'Quality Staircase' },
                { icon: 'fas fa-thermometer-half', text: 'Climate Control' }
            ]
        },
        'project3': {
            title: 'Full Home Renovation',
            location: 'Bolton, Greater Manchester',
            image: '/images/Full Home Renovation.jpg',
            description: 'Complete transformation of a Victorian terrace house, combining period features with modern amenities for a perfect blend of old and new.',
            details: {
                'Project Type': 'Complete Renovation',
                'Duration': '16 weeks',
                'Size': '120 sqm',
                'Budget Range': '£80,000 - £120,000'
            },
            specifications: {
                'Planning': 'Full Planning Permission',
                'Structure': 'Structural Alterations',
                'Systems': 'Complete Rewiring & Plumbing',
                'Finish': 'Premium Materials Throughout'
            },
            features: [
                { icon: 'fas fa-home', text: 'Complete Transformation' },
                { icon: 'fas fa-palette', text: 'Period Feature Restoration' },
                { icon: 'fas fa-plug', text: 'Modern Systems' },
                { icon: 'fas fa-star', text: 'Luxury Finishes' }
            ]
        },
        'project4': {
            title: 'Two-Storey Side Extension',
            location: 'Stockport, Greater Manchester',
            image: '/images/Two-Storey Side Extension.jpg',
            description: 'Impressive two-storey extension adding substantial living space, including a spacious kitchen-diner and master bedroom suite with en-suite bathroom.',
            details: {
                'Project Type': 'Two-Storey Extension',
                'Duration': '12 weeks',
                'Size': '45 sqm',
                'Budget Range': '£60,000 - £80,000'
            },
            specifications: {
                'Planning': 'Full Planning Permission',
                'Foundation': 'Strip Foundation',
                'Structure': 'Cavity Wall Construction',
                'Roof': 'Pitched Roof with Tiles'
            },
            features: [
                { icon: 'fas fa-utensils', text: 'Large Kitchen-Diner' },
                { icon: 'fas fa-bed', text: 'Master Bedroom Suite' },
                { icon: 'fas fa-bath', text: 'Luxury En-suite' },
                { icon: 'fas fa-expand', text: 'Significant Space Addition' }
            ]
        },
        'project5': {
            title: 'Luxury Bathroom Remodel',
            location: 'Prestwich, Manchester',
            image: '/images/Bathroom Remodel.jpg',
            description: 'Complete bathroom transformation featuring premium fixtures, underfloor heating, and elegant tile work creating a spa-like retreat in this family home.',
            details: {
                'Project Type': 'Bathroom Renovation',
                'Duration': '4 weeks',
                'Size': '8 sqm',
                'Budget Range': '£15,000 - £25,000'
            },
            specifications: {
                'Planning': 'Building Regulations',
                'Plumbing': 'Complete System Upgrade',
                'Heating': 'Underfloor Heating',
                'Ventilation': 'Humidity Control System'
            },
            features: [
                { icon: 'fas fa-bath', text: 'Luxury Freestanding Bath' },
                { icon: 'fas fa-shower', text: 'Walk-in Rainfall Shower' },
                { icon: 'fas fa-thermometer-half', text: 'Underfloor Heating' },
                { icon: 'fas fa-gem', text: 'Premium Tile Work' }
            ]
        },
        'project6': {
            title: 'Kitchen Renovation',
            location: 'Altrincham, Greater Manchester',
            image: '/images/Kitchen Renovation.jpg',
            description: 'Modern kitchen renovation with high-end appliances, quartz countertops, and custom cabinetry, creating the perfect heart of the home for entertaining.',
            details: {
                'Project Type': 'Kitchen Refurbishment',
                'Duration': '6 weeks',
                'Size': '20 sqm',
                'Budget Range': '£25,000 - £40,000'
            },
            specifications: {
                'Planning': 'Permitted Development',
                'Worktops': 'Quartz Stone',
                'Appliances': 'Integrated Premium Range',
                'Lighting': 'LED Under-cabinet Lighting'
            },
            features: [
                { icon: 'fas fa-utensils', text: 'Custom Cabinetry' },
                { icon: 'fas fa-gem', text: 'Quartz Countertops' },
                { icon: 'fas fa-lightbulb', text: 'Smart Lighting' },
                { icon: 'fas fa-fire', text: 'Premium Appliances' }
            ]
        },
        'project7': {
            title: 'Single Storey Extension',
            location: 'Chorlton, Manchester',
            image: '/images/Home Extensions.jpg',
            description: 'Beautiful single storey rear extension creating an open-plan kitchen-dining area with roof lights and sliding doors to the garden.',
            details: {
                'Project Type': 'Rear Extension',
                'Duration': '10 weeks',
                'Size': '30 sqm',
                'Budget Range': '£40,000 - £55,000'
            },
            specifications: {
                'Planning': 'Permitted Development',
                'Foundation': 'Concrete Slab',
                'Roof': 'Flat Roof with Rooflights',
                'Glazing': 'Sliding Patio Doors'
            },
            features: [
                { icon: 'fas fa-home', text: 'Open Plan Living' },
                { icon: 'fas fa-sun', text: 'Roof Lights' },
                { icon: 'fas fa-door-open', text: 'Garden Access' },
                { icon: 'fas fa-expand', text: 'Space Maximization' }
            ]
        }
    };

    function createModalContent(project) {
        return `
            <div class="modal-header">
                <img src="${project.image}" alt="${project.title}" class="modal-image">
                <div class="modal-overlay">
                    <h2 class="modal-title">${project.title}</h2>
                    <p class="modal-location"><i class="fas fa-map-marker-alt"></i> ${project.location}</p>
                </div>
                <span class="modal-close">&times;</span>
            </div>
            
            <div class="modal-body">
                <p class="modal-description">${project.description}</p>
                
                <div class="modal-details">
                    <div class="detail-section">
                        <h4>Project Overview</h4>
                        <ul class="detail-list">
                            ${Object.entries(project.details).map(([key, value]) => 
                                `<li><span class="detail-label">${key}:</span><span class="detail-value">${value}</span></li>`
                            ).join('')}
                        </ul>
                    </div>
                    
                    <div class="detail-section">
                        <h4>Technical Specifications</h4>
                        <ul class="detail-list">
                            ${Object.entries(project.specifications).map(([key, value]) => 
                                `<li><span class="detail-label">${key}:</span><span class="detail-value">${value}</span></li>`
                            ).join('')}
                        </ul>
                    </div>
                </div>
                
                <div class="modal-features">
                    <h4>Key Features</h4>
                    <div class="features-grid">
                        ${project.features.map(feature => 
                            `<div class="feature-item">
                                <i class="${feature.icon}"></i>
                                <span>${feature.text}</span>
                            </div>`
                        ).join('')}
                    </div>
                </div>
            </div>
            
            <div class="modal-footer">
                <a href="/quote" class="modal-cta">
                    <i class="fas fa-calculator"></i>
                    Get Your Free Quote
                </a>
            </div>
        `;
    }

    // Modal functionality for project buttons
    if (projectButtons.length > 0 && modal && modalContent) {
        projectButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const projectId = this.getAttribute('data-project');
                const project = projectData[projectId];
                
                if (project) {
                    modalContent.innerHTML = createModalContent(project);
                    modal.style.display = 'block';
                    document.body.style.overflow = 'hidden';
                    
                    // Add close functionality
                    const closeBtn = modalContent.querySelector('.modal-close');
                    closeBtn.addEventListener('click', closeModal);
                }
            });
        });
    }

    // Modal functionality for project cards and carousel items
    if (modal && modalContent) {
        // Handle carousel project links
        document.addEventListener('click', function(e) {
            const projectLink = e.target.closest('.project-link');
            if (projectLink) {
                e.preventDefault();
                const href = projectLink.getAttribute('href');
                const projectId = href.split('#')[1]; // Extract project ID from href
                const project = projectData[projectId];
                  if (project) {
                    modalContent.innerHTML = createModalContent(project);
                    modal.style.display = 'block';
                    document.body.style.overflow = 'hidden';
                    
                    const closeBtn = modalContent.querySelector('.modal-close');
                    closeBtn.addEventListener('click', closeModal);
                }
            }
        });

        // Handle project cards if they exist
        if (projectCards.length > 0) {
            projectCards.forEach(card => {
                card.addEventListener('click', function(e) {
                    e.preventDefault();
                    const projectId = card.id;
                    const project = projectData[projectId];
                    
                    if (project) {
                        modalContent.innerHTML = createModalContent(project);
                        modal.style.display = 'block';
                        document.body.style.overflow = 'hidden';
                        
                        const closeBtn = modalContent.querySelector('.modal-close');
                        closeBtn.addEventListener('click', closeModal);
                    }
                });
            });
        }
    }

    // Close modal function
    function closeModal() {
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }

    // Close modal when clicking outside
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
    }

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal && modal.style.display === 'block') {
            closeModal();
        }
    });

    // =====================================================
    // SMOOTH SCROLLING FOR ANCHOR LINKS
    // =====================================================
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // =====================================================
    // FORM ENHANCEMENTS
    // =====================================================
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                } else {
                    field.classList.remove('error');
                }
            });
            
            if (!isValid) {
                e.preventDefault();
                alert('Please fill in all required fields.');
            }
        });
    });

    // =====================================================
    // SCROLL ANIMATIONS (if elements exist)
    // =====================================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    const animateElements = document.querySelectorAll('.fade-in, .slide-in, .card, .project-card, .service-card');
    animateElements.forEach(el => observer.observe(el));

    // =====================================================
    // PERFORMANCE OPTIMIZATIONS
    // =====================================================
    
    // Lazy load images
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

    console.log('Alhamra Builders website initialized successfully!');
});
