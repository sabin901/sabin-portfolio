// Enhanced JavaScript for Portfolio with Modals and Filters

document.addEventListener("DOMContentLoaded", () => {
    // ===== LOADING SCREEN =====
    const loadingScreen = document.getElementById("loading-screen");
    const loadingScreenAlt = document.getElementById("loadingScreen");
    
    function hideLoadingScreen() {
        // Hide both possible loading screen IDs
        [loadingScreen, loadingScreenAlt].forEach(screen => {
            if (screen) {
                screen.style.opacity = "0";
                screen.style.visibility = "hidden";
                screen.style.transition = "opacity 0.5s ease, visibility 0.5s ease";
        setTimeout(() => {
                    screen.classList.add("hidden");
                    screen.style.display = "none";
            }, 500);
            }
        });
    }
    
    // Hide after page load
    if (document.readyState === 'complete') {
        setTimeout(hideLoadingScreen, 600);
    } else {
        window.addEventListener("load", () => {
            setTimeout(hideLoadingScreen, 600);
        });
    }
    
    // Fallback timeout - ensure it always hides
    setTimeout(hideLoadingScreen, 1500);


    // ===== MOBILE MENU =====
    const mobileMenuToggle = document.getElementById("mobile-menu-toggle");
    const mobileMenu = document.getElementById("mobile-menu");
    
    if (mobileMenuToggle && mobileMenu) {
        mobileMenuToggle.addEventListener("click", () => {
            mobileMenu.classList.toggle("hidden");
            // Add animation
            if (!mobileMenu.classList.contains("hidden")) {
                mobileMenu.style.animation = "slideDown 0.3s ease-out";
            }
        });
        
        const mobileLinks = mobileMenu.querySelectorAll("a");
        mobileLinks.forEach(link => {
            link.addEventListener("click", () => {
                mobileMenu.classList.add("hidden");
            });
        });

        // Close menu when clicking outside
        document.addEventListener("click", (e) => {
            if (!mobileMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
                mobileMenu.classList.add("hidden");
            }
        });
    }

    // ===== SMOOTH SCROLLING =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function(e) {
            const href = this.getAttribute("href");
            if (href === "#" || href === "#home") {
            e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
                return;
            }
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const offset = 80;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({ top: targetPosition, behavior: "smooth" });
            }
        });
    });

    // ===== PROJECT FILTERING =====
    const filterButtons = document.querySelectorAll(".project-filter-btn");
    const workSection = document.getElementById("work");
    const projectCards = workSection ? workSection.querySelectorAll(".project-card[data-category]") : [];

    const categoryMap = {
        'all': ['analytics', 'fintech', 'system', 'automation', 'forecasting', 'risk', 'web'],
        'analytics': ['analytics', 'fintech', 'automation'],
        'system': ['system', 'automation'],
        'forecasting': ['forecasting', 'risk'],
        'web': ['web']
    };

    filterButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const filter = btn.getAttribute("data-filter");
            
            filterButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            
            projectCards.forEach((card, index) => {
                const categories = (card.getAttribute('data-category') || '').split(/\s+/).filter(Boolean);
                const targets = categoryMap[filter] || [];
                const shouldShow = filter === 'all' || targets.some(cat => categories.includes(cat));
                
                if (shouldShow) {
                    card.style.display = 'block';
                        card.style.opacity = '1';
                    card.style.transform = 'translateY(0) scale(1)';
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px) scale(0.95)';
                    setTimeout(() => { card.style.display = 'none'; }, 300);
                }
            });
        });
    });

    // ===== PROJECT MODALS =====
    const projectModalBtns = document.querySelectorAll('.project-modal-btn');
    const modalOverlay = document.getElementById('modal-overlay');
    const modalBody = document.getElementById('modal-body');
    const modalContent = modalOverlay ? modalOverlay.querySelector('.modal-content') : null;
    
    // Function to close project modal
    function closeProjectModal() {
        if (modalOverlay && !modalOverlay.classList.contains('hidden')) {
            modalOverlay.classList.add('hidden');
            document.body.style.overflow = '';
            if (history.state?.modal === 'project') {
                history.back();
            }
        }
    }

    const projectData = {
        "iroutine": {
            title: "iRoutine - Personal Life Operating System",
            category: "Time-Series Analytics",
            problem: "Personal productivity tools are fragmented—time tracking, expense management, energy monitoring, and focus analysis exist in separate silos. Users can't see how time spent affects energy, how expenses correlate with productivity, or how interruptions impact focus. There's no unified system that connects these domains to provide actionable insights.",
            context: "Built a personal life operating system that connects time, money, energy, and focus with cross-domain intelligence. The system needed to handle time-series data for multiple users with 1000+ data points per day, provide real-time dashboard updates, and offer explainable analytics where users understand how insights are calculated.",
            approach: "Developed a full-stack application with Next.js 14 frontend (TypeScript) and FastAPI backend. Implemented Supabase PostgreSQL with optimized indexes for time-range queries. Built analytics engine calculating cross-domain correlations (time × energy × focus). Added PDF/CSV export for weekly reviews and data portability. Used row-level security (RLS) for data isolation and JWT token validation.",
            technologies: ["Next.js 14", "TypeScript", "FastAPI", "Supabase", "PostgreSQL", "Time-Series Analysis", "Data Visualization"],
            results: {
                "Weekly Reviews": "Enabled PDF/CSV exports, making insights shareable and reducing friction for reflection",
                "Cross-Domain Intelligence": "Users can see how time spent correlates with energy levels and focus",
                "Performance": "Real-time dashboard updates with < 500ms query times for time-range data",
                "Explainability": "Every insight shows the underlying calculation"
            },
            lessons: "Normalized schema with separate tables for time, expenses, energy, and focus. Junction table for cross-domain relationships. Materialized views for common correlation queries. Handled missing data gracefully (null values don't break correlations). Timezone handling for consistent time-series analysis. Next: add queueing for heavy correlation calculations, Redis caching, and observability metrics.",
            links: {
                github: "https://github.com/sabin901/iRoutine",
                demo: "#"
            }
        },
        "neural-muse": {
            title: "Neural Muse Dashboard - Real-Time EEG Analytics",
            category: "Real-Time Analytics",
            problem: "Medical and research teams need to analyze EEG data in real-time, but existing tools are either too complex (MATLAB, Python scripts) or too simple (basic CSV viewers). There's no interactive dashboard that allows pattern recognition, filtering, and exploration of high-frequency EEG signals (1000+ datapoints per second) with smooth visualization.",
            context: "Built an EEG data analysis dashboard for medical and research teams with pattern recognition and interactive exploration. The system needed to handle 1000+ datapoints per second from BLE devices, provide real-time visualization without lag, and support long recording sessions with memory-efficient data structures.",
            approach: "Developed a TypeScript/React frontend with Canvas API for high-performance rendering. Implemented platform-specific BLE integration (CoreBluetooth on macOS, Web Bluetooth API). Used circular buffer data structure for efficient memory management. Added real-time filtering and pattern recognition algorithms. Implemented CSV export for post-session analysis.",
            technologies: ["TypeScript", "React", "Canvas API", "BLE", "Data Visualization", "Signal Processing"],
            results: {
                "Real-Time Performance": "Visualization of 1000+ datapoints per second with smooth 60fps rendering",
                "Cross-Platform": "Works identically on macOS and Windows",
                "Memory Efficiency": "Handles 1-hour sessions without performance degradation",
                "Professional GUI": "Responsive controls suitable for medical/research use"
            },
            lessons: "Circular buffer to prevent memory overflow during long sessions. Canvas API instead of SVG for better performance with 1000+ datapoints. RequestAnimationFrame for smooth 60fps updates. Handled BLE disconnections gracefully with auto-reconnect logic. CSV file size grows ~1MB per minute—added compression warning. Next: add JSON/HDF5 export formats, real-time DSP filters, and cloud sync.",
            links: {
                github: "https://github.com/sabin901/neural-muse-dashboard",
                demo: "#"
            }
        },
        "application-manager": {
            title: "Application Manager - Job Tracking System",
            category: "Business Workflow",
            problem: "College students applying to jobs struggle to track application status, deadlines, interview schedules, and follow-ups. Spreadsheets are error-prone and don't provide reminders. There's no system that combines application tracking with deadline management and interview scheduling in one place.",
            context: "Built a job application tracking system for college students with deadline management, status tracking, and interview scheduling. The system needed to support 100+ applications per user with fast search and filtering, provide reliable deadline reminders, and ensure data integrity with proper access controls.",
            approach: "Developed a C#/.NET desktop application with Windows Forms for native UI. Implemented SQL Server database with normalized schema (applications, companies, interviews). Built business logic layer for status transitions and validation using state machine pattern. Added reminder system with notifications for upcoming deadlines. Created search and filter functionality for quick application lookup.",
            technologies: ["C#", ".NET", "SQL Server", "Windows Forms", "State Machine Pattern"],
            results: {
                "Tracking Speed": "70% faster application tracking compared to spreadsheet-based methods",
                "Deadline Management": "Reliable reminders reduced missed application deadlines by 90%",
                "Search Functionality": "Quick lookup of 100+ applications",
                "Data Integrity": "State machine prevents invalid status transitions"
            },
            lessons: "3NF normalized schema: separate tables for applications, companies, interviews, and reminders. State machine pattern for application status (Applied → Interview → Offer → Rejected). Background thread checks for upcoming deadlines every 5 minutes. Indexed database queries for fast search. Next: port to web (React + .NET API), add cloud sync, analytics dashboard, and email integration.",
            links: {
                github: "https://github.com/sabin901/Application_Manager",
                demo: "#"
            }
        },
        "ayur": {
            title: "Ayur.me - AI-Powered Ayurvedic Diagnostic System",
            category: "AI Health Platform",
            problem: "Users need personalized Ayurvedic insights based on classical Sanskrit texts, with comprehensive dosha analysis, seasonal guidance, and holistic wellness recommendations. Existing solutions lack authenticity and don't ground recommendations in classical texts.",
            context: "Built a comprehensive AI-powered Ayurvedic diagnostic system grounded in classical Sanskrit texts (Charaka Samhita, Sushruta Samhita, Ashtanga Hridayam, Bhava Prakasha, Madhava Nidanam). The system needed to provide personalized dosha analysis, seasonal guidance, disease database, and holistic wellness recommendations based on authentic Ayurvedic principles.",
            approach: "Developed a full-stack application with React 18 + TypeScript frontend and Node.js/Express backend with MongoDB. Implemented comprehensive dosha assessment (22 questions across 4 categories with weighted scoring), 15 dosha subtypes with Sanskrit names, classical text integration with verse attribution, disease database from public domain texts, 3D anatomy models, yoga library, and PDF report generation. Used Framer Motion for animations, Three.js for 3D models, and comprehensive validation protocols.",
            technologies: ["React 18", "TypeScript", "Node.js/Express", "MongoDB", "Vite", "Tailwind CSS", "Framer Motion", "Three.js", "Shadcn/UI"],
            results: {
                "Dosha Assessment": "22 questions with weighted scoring",
                "Classical Integration": "15 dosha subtypes with Sanskrit names",
                "Disease Database": "Comprehensive Ayurvedic disease database",
                "Performance": "Analysis < 2 seconds, optimized algorithms",
                "Authenticity": "All recommendations from pre-1880 classical texts"
            },
            lessons: "Classical text integration requires careful cross-verification with critical editions. Sanskrit rendering and transliteration improve accessibility. Disease database scraping from PDFs requires OCR and careful parsing. 3D models enhance educational value. Performance optimization crucial for real-time analysis. Next: add multi-language support (Hindi, Sanskrit), advanced visual analysis with AI, and expert consultation integration.",
            links: {
                github: "https://github.com/sabin901/Ayur.me",
                demo: "#"
            }
        },
        "mac-service": {
            title: "Mac Computer Service - E-commerce Platform",
            category: "E-commerce",
            problem: "Computer repair service businesses need an online presence for booking appointments, managing services, and processing payments. Existing solutions are either too generic or don't integrate booking with service management.",
            context: "Built an e-commerce website for computer repair services with booking system, payment integration, and service management. The system needed to handle service listings, appointment scheduling, payment processing, and customer management.",
            approach: "Developed a TypeScript/React application with modern UI/UX. Implemented booking system with calendar integration, payment gateway integration, service management dashboard, and customer portal. Used responsive design for mobile and desktop access.",
            technologies: ["TypeScript", "React", "E-commerce", "Payment Integration", "Booking System"],
            results: {
                "Bookings": "200+ successful bookings processed",
                "User Experience": "Streamlined booking and payment flow",
                "Service Management": "Efficient service tracking and management"
            },
            lessons: "Payment integration requires careful security handling. Booking systems need conflict detection and calendar management. Service management benefits from clear status tracking. Next: add customer reviews, service history tracking, and automated reminders.",
            links: {
                github: "https://github.com/sabin901/Mac-Computer-Service",
                demo: "#"
            }
        },
        "weather-analyzer": {
            title: "Weather Analyzer - Time-Series Forecasting",
            category: "Forecasting & Risk",
            problem: "Weather data analysis requires time-series forecasting to predict patterns, assess risks, and make informed decisions. Existing tools don't combine forecasting with risk assessment in an accessible way.",
            context: "Built a time-series forecasting system for weather patterns with trend analysis, risk assessment, and predictive modeling. The system needed to handle historical weather data, apply forecasting algorithms, and provide risk analysis.",
            approach: "Developed a C# application with time-series analysis algorithms. Implemented trend analysis, forecasting models (ARIMA, regression), risk assessment metrics, and data visualization. Focused on accuracy and explainability of predictions.",
            technologies: ["C#", "Time-Series Analysis", "Forecasting", "Risk Analysis", "Data Visualization"],
            results: {
                "Forecasting Accuracy": "85%+ trend accuracy",
                "Risk Assessment": "Comprehensive risk metrics",
                "Data Processing": "Efficient time-series analysis"
            },
            lessons: "Time-series forecasting requires careful data preprocessing and feature engineering. ARIMA models work well for stationary data, regression for trend analysis. Risk assessment needs clear metric definitions. Next: add machine learning models, real-time data integration, and advanced visualization.",
            links: {
                github: "https://github.com/sabin901/Weather_Analyzer",
                demo: "#"
            }
        },
        "muse-s": {
            title: "Muse S Data Visualization - Real-Time BLE Analytics",
            category: "Real-Time Analytics",
            problem: "Real-time data visualization from BLE devices requires efficient data handling, smooth rendering, and cross-platform compatibility. Existing solutions don't handle high-frequency data streams effectively.",
            context: "Built a real-time data visualization system with BLE device integration, live streaming, and interactive analytics dashboard. The system needed to handle high-frequency data streams, provide smooth visualization, and support cross-platform use.",
            approach: "Developed a Python application with BLE integration, real-time data processing, and visualization. Implemented efficient data structures for streaming data, cross-platform BLE support, and interactive dashboard. Added CSV export for data analysis.",
            technologies: ["Python", "BLE", "Data Visualization", "Real-Time Processing", "Cross-Platform"],
            results: {
                "Real-Time Processing": "Handles high-frequency data streams efficiently",
                "Cross-Platform": "Works identically on macOS and Windows",
                "Data Export": "CSV export for post-session analysis"
            },
            lessons: "BLE communication has platform-specific limitations—macOS CoreBluetooth achieves lower sample rates than Windows. Real-time visualization requires efficient data structures and memory management. CSV file size grows ~1MB per minute—consider compression for long sessions. Professional GUI requires smooth animations and responsive controls. Next: add data export formats (JSON, HDF5), real-time filtering, and cloud sync capabilities.",
            links: {
                github: "https://github.com/sabin901/amused-py-main22",
                demo: "#"
            }
        }
    };

    projectModalBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const projectId = btn.getAttribute('data-project');
            const project = projectData[projectId];
            
            if (project && modalBody && modalOverlay) {
                modalBody.innerHTML = `
                    <div class="mb-8 pb-6 border-b-2" style="border-color: rgba(110, 231, 183, 0.3);">
                    <div class="mb-6">
                            <span class="inline-block px-3 py-1 rounded text-xs font-semibold mb-3" style="background: rgba(110, 231, 183, 0.1); color: #6EE7B7;">${project.category}</span>
                            <h2 class="text-2xl md:text-3xl font-bold mt-2 mb-4" style="color: #F8FAFC;">${project.title}</h2>
                        </div>
                        
                        <div class="space-y-6">
                            <div class="p-4 rounded-lg border-l-4" style="border-color: #6EE7B7; background: rgba(110, 231, 183, 0.05);">
                                <h3 class="text-lg font-bold mb-2 flex items-center gap-2" style="color: #F8FAFC;">
                                    <span style="color: #6EE7B7;">●</span>
                                    Problem
                                </h3>
                                <p class="text-sm leading-relaxed" style="color: #94A3B8;">${project.problem}</p>
                            </div>
                            
                            <div class="p-4 rounded-lg border-l-4" style="border-color: #6EE7B7; background: rgba(110, 231, 183, 0.05);">
                                <h3 class="text-lg font-bold mb-2 flex items-center gap-2" style="color: #F8FAFC;">
                                    <span style="color: #6EE7B7;">●</span>
                                    Context
                                </h3>
                                <p class="text-sm leading-relaxed" style="color: #94A3B8;">${project.context}</p>
                        </div>
                        
                            <div class="p-4 rounded-lg border-l-4" style="border-color: #6EE7B7; background: rgba(110, 231, 183, 0.05);">
                                <h3 class="text-lg font-bold mb-2 flex items-center gap-2" style="color: #F8FAFC;">
                                    <span style="color: #6EE7B7;">●</span>
                                    Approach
                                </h3>
                                <p class="text-sm leading-relaxed" style="color: #94A3B8;">${project.approach}</p>
                        </div>
                        
                        <div>
                                <h3 class="text-lg font-bold mb-3" style="color: #F8FAFC;">Technologies</h3>
                        <div class="flex flex-wrap gap-2">
                            ${project.technologies.map(tech => 
                                        `<span class="px-3 py-1.5 rounded text-xs font-medium border" style="background: rgba(110, 231, 183, 0.1); border-color: rgba(110, 231, 183, 0.3); color: #6EE7B7;">${tech}</span>`
                            ).join('')}
                        </div>
                    </div>
                    
                        <div>
                                <h3 class="text-lg font-bold mb-3" style="color: #F8FAFC;">Results</h3>
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                                ${Object.entries(project.results).map(([key, value]) => `
                                        <div class="p-4 rounded-lg border" style="background: rgba(110, 231, 183, 0.05); border-color: rgba(110, 231, 183, 0.2);">
                                            <div class="text-xs font-medium mb-1" style="color: #94A3B8;">${key}</div>
                                            <div class="text-lg font-bold" style="color: #6EE7B7;">${value}</div>
                                    </div>
                                `).join('')}
                            </div>
                    </div>
                    
                            <div class="p-4 rounded-lg border" style="border-color: rgba(110, 231, 183, 0.2); background: rgba(110, 231, 183, 0.05);">
                                <h3 class="text-lg font-bold mb-2 flex items-center gap-2" style="color: #F8FAFC;">
                                    <span style="color: #6EE7B7;">●</span>
                                    Lessons & Next Steps
                                </h3>
                                <p class="text-sm leading-relaxed" style="color: #94A3B8;">${project.lessons}</p>
                                </div>
                        
                            <div class="flex flex-col sm:flex-row gap-3 pt-6 border-t" style="border-color: rgba(110, 231, 183, 0.2);">
                            ${project.links.github ? `
                                    <a href="${project.links.github}" target="_blank" rel="noopener noreferrer" class="modal-btn modal-btn-primary inline-flex items-center justify-center gap-2">
                                    <img src="images/github.png" alt="GitHub" class="w-5 h-5">
                                    View on GitHub
                                </a>
                            ` : ''}
                            ${project.links.demo && project.links.demo !== '#' ? `
                                    <a href="${project.links.demo}" target="_blank" rel="noopener noreferrer" class="modal-btn modal-btn-secondary inline-flex items-center justify-center gap-2">
                                    Live Demo
                                </a>
                            ` : ''}
                            </div>
                        </div>
                    </div>
                `;
                
                modalOverlay.classList.remove('hidden');
                document.body.style.overflow = 'hidden';
                history.pushState({ modal: 'project' }, '', window.location.href);
            }
        });
    });

    // Close modal - overlay click and escape key
    if (modalOverlay) {
        // Use event delegation for close button (works even if button is recreated)
        modalOverlay.addEventListener('click', (e) => {
            // Close button click
            if (e.target.classList.contains('modal-close') || e.target.closest('.modal-close')) {
            e.preventDefault();
                e.stopPropagation();
                closeProjectModal();
                return;
            }
            
            // Overlay click (outside modal-content) to close
            if (e.target === modalOverlay) {
                closeProjectModal();
            }
        });
        
        // Prevent clicks inside modal-content from closing (but allow close button)
        if (modalContent) {
            modalContent.addEventListener('click', (e) => {
                // Don't stop propagation for close button
                if (!e.target.classList.contains('modal-close') && !e.target.closest('.modal-close')) {
                    e.stopPropagation();
                }
            });
        }
    }

    // Browser back button closes modal
    window.addEventListener('popstate', () => {
        if (modalOverlay && !modalOverlay.classList.contains('hidden')) {
            modalOverlay.classList.add('hidden');
            document.body.style.overflow = '';
        }
        const articleModalOverlayRef = document.getElementById('article-modal-overlay');
        if (articleModalOverlayRef && !articleModalOverlayRef.classList.contains('hidden')) {
            articleModalOverlayRef.classList.add('hidden');
            document.body.style.overflow = '';
        }
    });

    // ===== NAVBAR SCROLL EFFECT =====
    const nav = document.getElementById('main-nav') || document.querySelector('nav');
    if (nav) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        });
    }

    // ===== SCROLL PROGRESS INDICATOR =====
    const scrollProgress = document.getElementById('scroll-progress');
    if (scrollProgress) {
        window.addEventListener('scroll', () => {
            const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (window.scrollY / windowHeight) * 100;
            scrollProgress.style.width = scrolled + '%';
        });
    }

    // ===== SCROLL ANIMATIONS =====
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) scale(1)';
                }, index * 50);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe animated elements
    document.querySelectorAll('.project-card, section > div > div').forEach((el, index) => {
        if (!el.classList.contains('text-center') && !el.classList.contains('article-card')) {
        el.style.opacity = '0';
            el.style.transform = 'translateY(30px) scale(0.95)';
            el.style.transition = `opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)`;
        observer.observe(el);
        }
    });

    // ===== ARTICLE MODAL FUNCTIONALITY =====
    const articleCards = document.querySelectorAll('.article-card');
    const articleModalOverlay = document.getElementById('article-modal-overlay');
    const articleModalBody = document.getElementById('article-modal-body');
    const articleModalClose = document.getElementById('article-modal-close');

    const articlesData = {
        'risk-dashboard': {
            title: 'How to Build a Financial Risk Dashboard',
            category: 'Technical Guide',
            date: 'January 2025',
            content: `
                <div class="space-y-6">
                    <div class="pb-6 border-b-2" style="border-color: rgba(110, 231, 183, 0.2);">
                        <span class="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3" style="background: rgba(110, 231, 183, 0.1); color: #6EE7B7;">Technical Guide</span>
                        <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">Published ${new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
                    </div>
                    
                    <div class="prose prose-lg max-w-none dark:prose-invert">
                        <p class="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                            Building a financial risk dashboard isn't just about connecting data sources—it's about creating a system that helps decision-makers understand risk in real-time. Here's how I approach it.
                        </p>
                        
                        <h3 class="text-2xl font-bold mb-4 text-black dark:text-white">Why This Matters</h3>
                        <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                            Most risk dashboards I've seen either show too much data (information overload) or too little (missing critical metrics). The sweet spot is showing the right metrics at the right level of detail, with clear visual hierarchy.
                        </p>
                        
                        <h3 class="text-2xl font-bold mb-4 text-black dark:text-white">The Stack</h3>
                        <ul class="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 mb-6">
                            <li><strong>Python</strong> for data processing and calculations (Pandas, NumPy)</li>
                            <li><strong>SQL</strong> for data extraction and aggregation</li>
                            <li><strong>Tableau</strong> for visualization and interactivity</li>
                            <li><strong>APIs</strong> for real-time data feeds (when needed)</li>
                        </ul>
                        
                        <h3 class="text-2xl font-bold mb-4 text-black dark:text-white">Key Decisions</h3>
                        <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                            <strong>1. Data Model:</strong> I structure risk data in a way that supports both historical analysis and real-time monitoring. This usually means separate tables for risk events, metrics, and thresholds.
                        </p>
                        <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                            <strong>2. Calculation Frequency:</strong> Some metrics need real-time updates (like position limits), others can be batch-processed daily (like VaR calculations). Understanding this distinction saves compute costs and improves performance.
                        </p>
                        <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                            <strong>3. Visualization:</strong> I use color coding sparingly—green/yellow/red only for critical thresholds. Too much color creates noise. I also make sure every chart has clear labels and context.
                        </p>
                        
                        <h3 class="text-2xl font-bold mb-4 text-black dark:text-white">What I'd Do Differently</h3>
                        <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                            If I were rebuilding this today, I'd add more granular filtering options, implement caching for frequently accessed queries, and add export functionality for deeper analysis in Excel or Python.
                        </p>
                        
                        <div class="mt-8 p-6 rounded-xl border-2" style="background: rgba(110, 231, 183, 0.05); border-color: rgba(110, 231, 183, 0.2);">
                            <p class="text-sm text-gray-600 dark:text-gray-400 italic">
                                This is based on my experience building risk dashboards for financial analysis projects. If you're working on something similar, feel free to reach out—I'm always happy to discuss approaches and trade-offs.
                            </p>
                        </div>
                    </div>
                </div>
            `
        },
        'arima-regression': {
            title: 'ARIMA vs Regression for Forecasting',
            category: 'Data Science',
            date: 'December 2024',
            content: `
                <div class="space-y-6">
                    <div class="pb-6 border-b-2" style="border-color: rgba(110, 231, 183, 0.2);">
                        <span class="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3" style="background: rgba(110, 231, 183, 0.1); color: #6EE7B7;">Data Science</span>
                        <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">Published December 2024</p>
                    </div>
                    
                    <div class="prose prose-lg max-w-none dark:prose-invert">
                        <p class="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                            When I first started working with time-series forecasting, I spent a lot of time trying to figure out when to use ARIMA versus regression. Here's what I learned from building forecasting models for financial data.
                        </p>
                        
                        <h3 class="text-2xl font-bold mb-4 text-black dark:text-white">The Short Answer</h3>
                        <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                            Use <strong>ARIMA</strong> when your data has clear trends and seasonality that you want to capture automatically. Use <strong>regression</strong> when you have external variables (like economic indicators) that you know influence your target variable.
                        </p>
                        
                        <h3 class="text-2xl font-bold mb-4 text-black dark:text-white">When ARIMA Works Well</h3>
                        <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                            ARIMA is great for univariate time series where the pattern is in the data itself. I've used it successfully for:
                        </p>
                        <ul class="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 mb-6">
                            <li>Weather pattern forecasting (daily temperature, precipitation)</li>
                            <li>Sales data with seasonal patterns</li>
                            <li>Any time series where historical values predict future values well</li>
                        </ul>
                        
                        <h3 class="text-2xl font-bold mb-4 text-black dark:text-white">When Regression Is Better</h3>
                        <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                            Regression shines when you have explanatory variables. For financial forecasting, this might mean:
                        </p>
                        <ul class="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 mb-6">
                            <li>Using interest rates, GDP growth, or market indices to predict financial metrics</li>
                            <li>When you need to understand <em>why</em> something is changing, not just <em>what</em> will change</li>
                            <li>When you have domain knowledge about what drives the variable</li>
                        </ul>
                        
                        <h3 class="text-2xl font-bold mb-4 text-black dark:text-white">My Approach</h3>
                        <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                            I usually start with both models and compare their performance. ARIMA often gives better short-term forecasts (1-7 days), while regression can be more accurate for longer horizons when external factors matter more. The key is testing both and understanding the business context.
                        </p>
                        
                        <div class="mt-8 p-6 rounded-xl border-2" style="background: rgba(110, 231, 183, 0.05); border-color: rgba(110, 231, 183, 0.2);">
                            <p class="text-sm text-gray-600 dark:text-gray-400 italic">
                                This comparison is based on my work with the Weather Analyzer project and financial forecasting models. The "right" choice depends on your data and use case—there's no one-size-fits-all answer.
                            </p>
                        </div>
                    </div>
                </div>
            `
        },
        'sec-10k': {
            title: 'Analyzing SEC 10-K Filings with Python',
            category: 'Financial Analysis',
            date: 'November 2024',
            content: `
                <div class="space-y-6">
                    <div class="pb-6 border-b-2" style="border-color: rgba(110, 231, 183, 0.2);">
                        <span class="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3" style="background: rgba(110, 231, 183, 0.1); color: #6EE7B7;">Financial Analysis</span>
                        <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">Published November 2024</p>
                    </div>
                    
                    <div class="prose prose-lg max-w-none dark:prose-invert">
                        <p class="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                            SEC 10-K filings are goldmines of financial information, but extracting useful data from them manually is tedious. Here's how I automated the process using Python.
                        </p>
                        
                        <h3 class="text-2xl font-bold mb-4 text-black dark:text-white">The Challenge</h3>
                        <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                            10-K filings are long, unstructured documents. Finding specific metrics (like revenue, net income, or debt ratios) requires reading through hundreds of pages. I wanted a way to extract key financial data programmatically.
                        </p>
                        
                        <h3 class="text-2xl font-bold mb-4 text-black dark:text-white">The Solution</h3>
                        <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                            I built a Python pipeline that:
                        </p>
                        <ul class="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 mb-6">
                            <li>Downloads 10-K filings from SEC EDGAR using their API</li>
                            <li>Parses the HTML/XML structure to find financial statements</li>
                            <li>Extracts key metrics using regex patterns and text parsing</li>
                            <li>Calculates financial ratios (debt-to-equity, current ratio, etc.)</li>
                            <li>Stores results in a structured format (CSV or database)</li>
                        </ul>
                        
                        <h3 class="text-2xl font-bold mb-4 text-black dark:text-white">Key Libraries</h3>
                        <div class="grid grid-cols-2 gap-3 mb-6">
                            <div class="p-3 rounded-lg border" style="background: rgba(110, 231, 183, 0.05); border-color: rgba(110, 231, 183, 0.2);">
                                <strong class="text-black dark:text-white">requests</strong> - API calls to SEC EDGAR
                            </div>
                            <div class="p-3 rounded-lg border" style="background: rgba(110, 231, 183, 0.05); border-color: rgba(110, 231, 183, 0.2);">
                                <strong class="text-black dark:text-white">BeautifulSoup</strong> - HTML parsing
                            </div>
                            <div class="p-3 rounded-lg border" style="background: rgba(110, 231, 183, 0.05); border-color: rgba(110, 231, 183, 0.2);">
                                <strong class="text-black dark:text-white">pandas</strong> - Data manipulation
                            </div>
                            <div class="p-3 rounded-lg border" style="background: rgba(110, 231, 183, 0.05); border-color: rgba(110, 231, 183, 0.2);">
                                <strong class="text-black dark:text-white">re</strong> - Pattern matching
                            </div>
                        </div>
                        
                        <h3 class="text-2xl font-bold mb-4 text-black dark:text-white">What I Learned</h3>
                        <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                            <strong>1. Structure Varies:</strong> Not all 10-Ks are formatted the same. Some companies use tables, others use text. You need flexible parsing logic.
                        </p>
                        <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                            <strong>2. Context Matters:</strong> The same metric might appear multiple times (e.g., "Revenue" in different sections). You need to identify which one is the official financial statement value.
                        </p>
                        <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                            <strong>3. Validation Is Critical:</strong> Always cross-check extracted values against the original document. One parsing error can throw off your entire analysis.
                        </p>
                        
                        <h3 class="text-2xl font-bold mb-4 text-black dark:text-white">Next Steps</h3>
                        <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                            I'm working on adding machine learning to improve extraction accuracy, especially for companies with non-standard formatting. I'm also exploring ways to extract qualitative insights (like risk factors) using NLP.
                        </p>
                        
                        <div class="mt-8 p-6 rounded-xl border-2" style="background: rgba(110, 231, 183, 0.05); border-color: rgba(110, 231, 183, 0.2);">
                            <p class="text-sm text-gray-600 dark:text-gray-400 italic">
                                This approach has been useful for my financial analysis projects. If you're working on something similar, I'd be happy to share code snippets or discuss challenges you're facing.
                            </p>
                        </div>
                    </div>
                </div>
            `
        }
    };

    articleCards.forEach(card => {
        card.addEventListener('click', () => {
            const articleId = card.getAttribute('data-article');
            const article = articlesData[articleId];
            
            if (article && articleModalBody && articleModalOverlay) {
                articleModalBody.innerHTML = `
                    <div class="mb-6">
                        <h2 class="text-2xl md:text-3xl font-bold mb-4 article-modal-title">${article.title}</h2>
                    </div>
                    ${article.content}
                `;
                
                articleModalOverlay.classList.remove('hidden');
                document.body.style.overflow = 'hidden';
                history.pushState({ modal: 'article' }, '', window.location.href);
            }
        });
    });

    // Close article modal - event delegation (close button + overlay click)
    function closeArticleModal() {
        if (articleModalOverlay && !articleModalOverlay.classList.contains('hidden')) {
            articleModalOverlay.classList.add('hidden');
            document.body.style.overflow = '';
            if (history.state?.modal === 'article') {
                history.back();
            }
        }
    }

    if (articleModalOverlay) {
        const articleModalContent = articleModalOverlay.querySelector('.modal-content');
        articleModalOverlay.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal-close') || e.target.closest('.modal-close')) {
                e.preventDefault();
                e.stopPropagation();
                closeArticleModal();
                return;
            }
            if (e.target === articleModalOverlay) {
                closeArticleModal();
            }
        });
        if (articleModalContent) {
            articleModalContent.addEventListener('click', (e) => {
                if (!e.target.classList.contains('modal-close') && !e.target.closest('.modal-close')) {
                    e.stopPropagation();
                }
            });
        }
    }

    // Single Escape key handler for all modals
    document.addEventListener('keydown', (e) => {
        if (e.key !== 'Escape') return;
        if (modalOverlay && !modalOverlay.classList.contains('hidden')) {
            closeProjectModal();
            return;
        }
        if (articleModalOverlay && !articleModalOverlay.classList.contains('hidden')) {
            closeArticleModal();
        }
    });
}); 
