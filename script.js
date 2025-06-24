// Enhanced JavaScript for Responsive Tailwind CSS Portfolio
document.addEventListener("DOMContentLoaded", () => {
    // ===== LOADING SCREEN =====
    const loadingScreen = document.getElementById("loadingScreen");
    if (loadingScreen) {
        setTimeout(() => {
            loadingScreen.classList.add("hidden");
            setTimeout(() => {
                loadingScreen.style.display = "none";
            }, 500);
        }, 2000);
    }

    // ===== RESPONSIVE NAVIGATION =====
    const navToggle = document.querySelector(".nav-toggle");
    const navMenu = document.querySelector("header ul");
    const header = document.querySelector("header");
    
    // Mobile menu toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener("click", () => {
            // Toggle mobile menu
            navMenu.classList.toggle("hidden");
            navMenu.classList.toggle("flex");
            navMenu.classList.toggle("flex-col");
            navMenu.classList.toggle("absolute");
            navMenu.classList.toggle("top-full");
            navMenu.classList.toggle("left-0");
            navMenu.classList.toggle("w-full");
            navMenu.classList.toggle("bg-white");
            navMenu.classList.toggle("shadow-lg");
            navMenu.classList.toggle("p-4");
            navMenu.classList.toggle("z-50");
            
            // Animate hamburger menu
            navToggle.classList.toggle("active");
        });

        // Close mobile menu when clicking on a link
        const navLinks = navMenu.querySelectorAll("a");
        navLinks.forEach(link => {
            link.addEventListener("click", () => {
                navMenu.classList.add("hidden");
                navMenu.classList.remove("flex", "flex-col", "absolute", "top-full", "left-0", "w-full", "bg-white", "shadow-lg", "p-4", "z-50");
                navToggle.classList.remove("active");
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener("click", (e) => {
            if (!header.contains(e.target)) {
                navMenu.classList.add("hidden");
                navMenu.classList.remove("flex", "flex-col", "absolute", "top-full", "left-0", "w-full", "bg-white", "shadow-lg", "p-4", "z-50");
                navToggle.classList.remove("active");
            }
        });
    }

    // ===== SMOOTH SCROLLING =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = header ? header.offsetHeight : 0;
                const targetPosition = targetElement.offsetTop - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===== TYPEWRITER EFFECT =====
    const typewriterElement = document.getElementById("typewriter");
    if (typewriterElement) {
        const texts = ["Software Engineer", "Full-Stack Developer", "Data Analyst", "Financial Modeler"];
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingDelay = 100;

        function typeWriter() {
            const currentText = texts[textIndex];
  
        if (isDeleting) {
                typewriterElement.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
                typingDelay = 50;
        } else {
                typewriterElement.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
                typingDelay = 100;
        }
  
        if (!isDeleting && charIndex === currentText.length) {
                isDeleting = true;
                typingDelay = 2000; // Pause at end
        } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                typingDelay = 500; // Pause before next word
            }

            setTimeout(typeWriter, typingDelay);
        }

        setTimeout(typeWriter, 1000);
    }

    // ===== SKILL PROGRESS BARS =====
    const skillProgressBars = document.querySelectorAll('.skill-progress');
    
    const animateSkillBars = () => {
        skillProgressBars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            if (width) {
                bar.style.width = width;
                bar.classList.add('animate');
            }
        });
    };

    // Intersection Observer for Skill Bars
    const skillsSection = document.querySelector('#skills');
    if (skillsSection) {
        const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
                    animateSkillBars();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        observer.observe(skillsSection);
    }

    // ===== PROJECT MODALS =====
    const projectModalBtns = document.querySelectorAll('.project-modal-btn');
    const modalOverlay = document.getElementById('modal-overlay');
    const modalBody = document.getElementById('modal-body');
    const modalClose = document.querySelector('.modal-close');

    const projectData = {
        1: {
            title: "BaJam",
            description: "A comprehensive movie and music streaming platform for Nepal featuring old Nepali movies, tele-serials, TV shows, lok dohoris, event organization, album launches, and concert tickets. The platform serves as a one-stop destination for Nepali entertainment and local event discovery.",
            technologies: ["React", "Node.js", "MongoDB", "AWS", "Payment Gateway"],
            features: [
                "Movie and music streaming",
                "Event organization and ticket booking",
                "Local event discovery platform",
                "Album launch management",
                "Concert ticket sales"
            ],
            metrics: {
                "Content Library": "1000+ Nepali movies",
                "Event Organizers": "50+ registered",
                "Monthly Users": "10,000+"
            }
        },
        2: {
            title: "Agoriu",
            description: "A marketplace platform for college students to trade books, belongings, find sub-leases, and rent gadgets from other students. Designed specifically for the student community to facilitate easy transactions and accommodation solutions.",
            technologies: ["React Native", "Firebase", "Google Maps API", "Chat System"],
            features: [
                "Student-to-student marketplace",
                "Sub-lease and accommodation finder",
                "Gadget rental platform",
                "Secure payment system",
                "Real-time messaging"
            ],
            metrics: {
                "Active Students": "500+",
                "Successful Trades": "200+",
                "Sub-leases Found": "50+"
            }
        },
        3: {
            title: "Yāc",
            description: "Personal finance management app that tracks expenses, sets budgets, and helps users manage shared expenses with roommates through notifications and text messages. Built to solve real-world roommate financial management challenges.",
            technologies: ["React Native", "Node.js", "SMS API", "Push Notifications"],
            features: [
                "Expense tracking and budgeting",
                "Shared expense management",
                "SMS notifications for payments",
                "Roommate group management",
                "Financial goal setting"
            ],
            metrics: {
                "Active Users": "100+",
                "Expenses Tracked": "1000+",
                "SMS Notifications": "500+ sent"
            }
        }
    };

    projectModalBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const projectId = btn.getAttribute('data-project');
            const project = projectData[projectId];
            
            if (project && modalBody) {
                modalBody.innerHTML = `
                    <h2 class="text-2xl font-bold text-gray-900 mb-4">${project.title}</h2>
                    <p class="text-gray-700 mb-6">${project.description}</p>
                    
                    <div class="mb-6">
                        <h3 class="text-lg font-semibold text-gray-900 mb-2">Technologies Used</h3>
                        <div class="flex flex-wrap gap-2">
                            ${project.technologies.map(tech => 
                                `<span class="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">${tech}</span>`
                            ).join('')}
                        </div>
                    </div>
                    
                    <div class="mb-6">
                        <h3 class="text-lg font-semibold text-gray-900 mb-2">Key Features</h3>
                        <ul class="list-disc list-inside text-gray-700 space-y-1">
                            ${project.features.map(feature => `<li>${feature}</li>`).join('')}
                        </ul>
                    </div>
                    
                    <div>
                        <h3 class="text-lg font-semibold text-gray-900 mb-2">Performance Metrics</h3>
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                            ${Object.entries(project.metrics).map(([key, value]) => `
                                <div class="bg-gray-50 p-3 rounded-lg">
                                    <div class="text-sm text-gray-600">${key}</div>
                                    <div class="text-lg font-bold text-green-600">${value}</div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `;
                
                modalOverlay.style.display = 'flex';
                document.body.style.overflow = 'hidden'; // Prevent background scrolling
            }
        });
    });

    if (modalClose) {
        modalClose.addEventListener('click', () => {
            modalOverlay.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }

    if (modalOverlay) {
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                modalOverlay.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }

    // ===== RESUME DOWNLOAD =====
    const downloadResumeBtns = document.querySelectorAll('#download-resume, #download-resume-2');
    downloadResumeBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            // Create a temporary link to trigger download
            const link = document.createElement('a');
            link.href = 'images/resume-example.pdf'; // Update with actual resume path
            link.download = 'Sabin_Raut_Resume.pdf';
            link.click();
        });
    });

    // ===== CONTACT FORM =====
    const contactForm = document.querySelector('#contact form');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            // Show loading state
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            submitBtn.classList.add('opacity-75');
  
        try {
          // Simulate form submission
                await new Promise(resolve => setTimeout(resolve, 2000));
                
                // Show success message
                showNotification('Thank you for your message! I\'ll get back to you soon.', 'success');
                
                // Reset form
                contactForm.reset();
                
        } catch (error) {
                showNotification('There was an error sending your message. Please try again.', 'error');
            } finally {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                submitBtn.classList.remove('opacity-75');
            }
        });
    }

    // ===== NOTIFICATION SYSTEM =====
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 transform transition-all duration-300 translate-x-full`;
        
        const bgColor = type === 'success' ? 'bg-green-500' : type === 'error' ? 'bg-red-500' : 'bg-blue-500';
        notification.classList.add(bgColor, 'text-white');
        
        notification.innerHTML = `
            <div class="flex items-center gap-2">
                <span>${message}</span>
                <button class="ml-2 text-white hover:text-gray-200" onclick="this.parentElement.parentElement.remove()">×</button>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
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

    // ===== SCROLL ANIMATIONS =====
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in', 'visible');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.timeline-item, .skill-item, .project-card, .image-container').forEach(el => {
        observer.observe(el);
    });

    // ===== HEADER SCROLL EFFECT =====
    if (header) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 100) {
                header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
                header.style.background = 'rgba(53,211,153,0.98)';
            } else {
                header.style.boxShadow = 'none';
                header.style.background = 'rgba(53,211,153,0.975)';
            }
        });
    }

    // ===== BACK TO TOP BUTTON =====
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = `
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
        </svg>
    `;
    backToTopBtn.className = 'fixed bottom-8 right-8 bg-green-400 hover:bg-green-500 text-white p-3 rounded-full shadow-lg transition-all duration-300 opacity-0 pointer-events-none z-50 transform hover:scale-110';
    backToTopBtn.id = 'back-to-top';
    document.body.appendChild(backToTopBtn);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.remove('opacity-0', 'pointer-events-none');
        } else {
            backToTopBtn.classList.add('opacity-0', 'pointer-events-none');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // ===== RESPONSIVE IMAGE HANDLING =====
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            this.src = 'https://via.placeholder.com/400x300/cccccc/666666?text=Image+Not+Found';
        });
    });

    // ===== ACTIVE NAVIGATION HIGHLIGHTING =====
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('header a[href^="#"]');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('text-green-600', 'font-bold');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('text-green-600', 'font-bold');
            }
        });
    });

    // ===== HAMBURGER MENU ANIMATION =====
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            const spans = navToggle.querySelectorAll('span');
            spans.forEach((span, index) => {
                span.style.transition = 'all 0.3s ease';
                if (navToggle.classList.contains('active')) {
                    if (index === 0) {
                        span.style.transform = 'rotate(45deg) translate(5px, 5px)';
                    } else if (index === 1) {
                        span.style.opacity = '0';
                    } else if (index === 2) {
                        span.style.transform = 'rotate(-45deg) translate(7px, -6px)';
                    }
                } else {
                    span.style.transform = 'none';
                    span.style.opacity = '1';
                }
            });
        });
    }

    // ===== PERFORMANCE OPTIMIZATION =====
    // Lazy loading for images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // ===== KEYBOARD NAVIGATION =====
    document.addEventListener('keydown', (e) => {
        // Escape key closes modal
        if (e.key === 'Escape' && modalOverlay && modalOverlay.style.display === 'flex') {
            modalOverlay.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
        
        // Enter key on mobile menu items
        if (e.key === 'Enter' && e.target.closest('.nav-toggle')) {
            e.target.click();
        }
    });

    // ===== TOUCH GESTURES FOR MOBILE =====
    let touchStartY = 0;
    let touchEndY = 0;

    document.addEventListener('touchstart', (e) => {
        touchStartY = e.changedTouches[0].screenY;
    });

    document.addEventListener('touchend', (e) => {
        touchEndY = e.changedTouches[0].screenY;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartY - touchEndY;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe up - could be used for navigation
                console.log('Swipe up detected');
            } else {
                // Swipe down - could be used for navigation
                console.log('Swipe down detected');
            }
        }
    }

    // ===== RESPONSIVE UTILITIES =====
    function handleResize() {
        // Close mobile menu on resize if screen becomes large
        if (window.innerWidth > 768 && navMenu) {
            navMenu.classList.add("hidden");
            navMenu.classList.remove("flex", "flex-col", "absolute", "top-full", "left-0", "w-full", "bg-white", "shadow-lg", "p-4", "z-50");
            if (navToggle) navToggle.classList.remove("active");
        }
    }

    window.addEventListener('resize', handleResize);

    // ===== INITIALIZATION COMPLETE =====
    console.log('Portfolio website enhanced with JavaScript features!');
}); 