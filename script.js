// Enhanced JavaScript for Portfolio with Modals and Filters  
//

document.addEventListener("DOMContentLoaded", () => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const scrollBehavior = () => reducedMotion.matches ? 'auto' : 'smooth';
    const themeToggle = document.getElementById('theme-toggle');
    function updateThemeButton() {
        const light = document.documentElement.dataset.theme === 'light';
        themeToggle.setAttribute('aria-label', `Switch to ${light ? 'dark' : 'light'} mode`);
        themeToggle.setAttribute('aria-pressed', String(light));
        document.querySelector('meta[name="theme-color"]').content = light ? '#f7f8f5' : '#0A1A2F';
    }
    themeToggle.hidden = false;
    updateThemeButton();
    themeToggle.addEventListener('click', () => {
        const theme = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
        document.documentElement.dataset.theme = theme;
        try { localStorage.setItem('portfolio-theme', theme); } catch { /* Optional preference. */ }
        updateThemeButton();
    });
    document.getElementById('copyright-year').textContent = new Date().getFullYear();

    // Keep the original loader, but release it as soon as the page is ready.
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        loadingScreen.style.opacity = '0';
        loadingScreen.style.visibility = 'hidden';
        setTimeout(() => loadingScreen.classList.add('hidden'), reducedMotion.matches ? 0 : 500);
    }

    // ===== MOBILE MENU =====
    const mobileMenuToggle = document.getElementById("mobile-menu-toggle");
    const mobileMenu = document.getElementById("mobile-menu");
    
    function closeMobileMenu(restoreFocus = false) {
        mobileMenu.classList.add('hidden');
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
        mobileMenuToggle.setAttribute('aria-label', 'Open menu');
        if (restoreFocus) mobileMenuToggle.focus();
    }
    mobileMenuToggle.addEventListener('click', () => {
        const open = mobileMenu.classList.contains('hidden');
        mobileMenu.classList.toggle('hidden', !open);
        mobileMenuToggle.setAttribute('aria-expanded', String(open));
        mobileMenuToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
        if (open && !reducedMotion.matches) mobileMenu.style.animation = 'slideDown 0.3s ease-out';
    });
    mobileMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => closeMobileMenu()));
    document.addEventListener('click', (event) => {
        if (!mobileMenu.contains(event.target) && !mobileMenuToggle.contains(event.target)) closeMobileMenu();
    });
    window.matchMedia('(min-width: 1024px)').addEventListener('change', () => closeMobileMenu());

    // ===== SMOOTH SCROLLING =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function(e) {
            const href = this.getAttribute("href");
            if (href === "#" || href === "#home") {
            e.preventDefault();
                if (window.location.hash !== '#home') history.pushState(null, '', '#home');
                window.scrollTo({ top: 0, behavior: scrollBehavior() });
                return;
            }
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                if (window.location.hash !== href) history.pushState(null, '', href);
                const offset = 80;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({ top: targetPosition, behavior: scrollBehavior() });
                target.setAttribute('tabindex', '-1');
                target.focus({ preventScroll: true });
                target.addEventListener('blur', () => target.removeAttribute('tabindex'), { once: true });
            }
        });
    });

    // The full collection is optional; the main page leads with three highlights.
    const projectArchive = document.getElementById('project-archive');
    const archiveCollapse = document.getElementById('archive-collapse');
    archiveCollapse.hidden = false;
    archiveCollapse.addEventListener('click', () => {
        projectArchive.open = false;
        projectArchive.querySelector('summary').focus({ preventScroll: true });
        projectArchive.scrollIntoView({ behavior: scrollBehavior(), block: 'start' });
    });

    // ===== PROJECT FILTERING =====
    const filterButtons = document.querySelectorAll(".project-filter-btn");
    const workSection = document.getElementById("work");
    const projectCards = workSection ? workSection.querySelectorAll(".project-card[data-category]") : [];

    const filterStatus = document.getElementById('project-filter-status');
    const filterTimers = new WeakMap();
    filterButtons.forEach(btn => {
        btn.setAttribute('aria-pressed', String(btn.classList.contains('active')));
        btn.addEventListener('click', () => {
            const filter = btn.dataset.filter;
            filterButtons.forEach(button => {
                button.classList.toggle('active', button === btn);
                button.setAttribute('aria-pressed', String(button === btn));
            });
            let visible = 0;
            projectCards.forEach(card => {
                clearTimeout(filterTimers.get(card));
                const show = filter === 'all' || card.dataset.category.split(/\s+/).includes(filter);
                if (show) {
                    visible++;
                    card.hidden = false;
                    card.style.display = '';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0) scale(1)';
                    card.removeAttribute('aria-hidden');
                    card.inert = false;
                } else {
                    card.style.opacity = '0';
                    card.style.transform = reducedMotion.matches ? 'none' : 'translateY(20px) scale(0.95)';
                    card.setAttribute('aria-hidden', 'true');
                    card.inert = true;
                    if (reducedMotion.matches) card.hidden = true;
                    else filterTimers.set(card, setTimeout(() => { card.hidden = true; }, 250));
                }
            });
            filterStatus.textContent = `${visible} project${visible === 1 ? '' : 's'}${filter === 'all' ? '' : ' in ' + btn.textContent}`;
        });
    });
    filterStatus.textContent = `${projectCards.length} projects`;

    // ===== PROJECT MODALS =====
    const projectModalBtns = document.querySelectorAll('.project-modal-btn');
    const modalOverlay = document.getElementById('modal-overlay');
    const modalBody = document.getElementById('modal-body');
    const modalContent = modalOverlay ? modalOverlay.querySelector('.modal-content') : null;
    
    // Both existing modal types share focus management and browser Back support.
    let activeDialog = null;
    let modalTrigger = null;
    let inertElements = [];
    let previousOverflow = '';
    let waitingForHistory = false;
    function openDialog(dialog, trigger) {
        if (waitingForHistory) return;
        activeDialog = dialog;
        modalTrigger = trigger;
        previousOverflow = document.body.style.overflow;
        dialog.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        inertElements = [...document.body.children].filter(element => element !== dialog && !['SCRIPT','STYLE'].includes(element.tagName)).map(element => [element, element.inert]);
        inertElements.forEach(([element]) => { element.inert = true; });
        dialog.querySelector('.modal-body').scrollTop = 0;
        dialog.querySelector('.modal-close').focus({ preventScroll: true });
        history.pushState({ ...history.state, portfolioModal: dialog.id }, '', window.location.href);
    }
    function closeDialog(navigateBack = true) {
        if (!activeDialog) return;
        const id = activeDialog.id;
        activeDialog.classList.add('hidden');
        activeDialog = null;
        document.body.style.overflow = previousOverflow;
        inertElements.forEach(([element, wasInert]) => { element.inert = wasInert; });
        inertElements = [];
        modalTrigger?.focus({ preventScroll: true });
        if (navigateBack && history.state?.portfolioModal === id) {
            waitingForHistory = true;
            history.back();
        }
    }
    function closeProjectModal() { closeDialog(); }
    document.addEventListener('keydown', (event) => {
        if (event.key !== 'Tab' || !activeDialog) return;
        const controls = [...activeDialog.querySelectorAll('a[href], button:not([disabled]), [tabindex="0"]')].filter(element => element.getClientRects().length);
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    });

    const projectData = {
    "footlyzer": {
        "title": "Footlyzer — Football Analysis Workspace",
        "category": "Football Analytics",
        "problem": "Football results and event data are easier to interpret when comparisons, context, and source information are available together.",
        "context": "A workspace covering five European leagues, a licensed historical archive, experimental forecasts, and private evidence briefs.",
        "approach": "Python prepares the datasets and forecasts for a static JavaScript interface. Users can explore recorded results, compare teams, inspect historical events, and import permitted CSV files locally.",
        "technologies": [
            "Python",
            "JavaScript",
            "Data Visualization",
            "GitHub Actions"
        ],
        "results": {
            "Historical archive": "1,826 matches from the 2017/18 research archive",
            "Analysis": "League results, event exploration, and team comparisons",
            "Private workflow": "Browser-local evidence briefs and CSV imports",
            "Forecasts": "Experimental models with coverage and freshness checks"
        },
        "lessons": "Historical player records are labeled as historical. Forecasts are experimental, and current results may be incomplete. Source attribution and method documentation are available in the application.",
        "links": {
            "github": "https://github.com/sabin901/Football-Analyzer-",
            "demo": "https://sabin901.github.io/Football-Analyzer-/"
        },
        "image": "images/projects/footlyzer.webp"
    },
    "pawi": {
        "title": "Pawi — Virtual Desktop Companion",
        "category": "Desktop Application · Public Beta",
        "problem": "A desktop can feel more personal with a small companion that reacts to work and encourages gentle breaks.",
        "context": "An open-source virtual pet with nine companions, care routines, local settings, and builds for macOS, Windows, and Linux.",
        "approach": "A TypeScript interface and Tauri/Rust desktop layer support a transparent companion overlay, animation states, tray controls, and local preferences.",
        "technologies": [
            "TypeScript",
            "Rust",
            "Tauri",
            "Desktop Development"
        ],
        "results": {
            "Companions": "Nine built-in dogs and cats",
            "Everyday use": "Feed, play, rest, reminders, and Pomodoro reactions",
            "Local settings": "No account required",
            "Release status": "Public beta / release candidates"
        },
        "lessons": "Input reactions use counts and geometry rather than typed content. Platform compatibility and installation details are documented on the website.",
        "links": {
            "github": "https://github.com/sabin901/Pawi",
            "demo": "https://sabin901.github.io/Pawi/"
        },
        "image": "images/projects/pawi.webp"
    },
    "commerce": {
        "title": "Conversational Commerce Engine",
        "category": "AI & Business Systems · Local MVP",
        "problem": "Social-commerce sellers need to keep conversations, inventory, orders, and fulfillment connected.",
        "context": "A local MVP demonstrating a conversation-to-order workflow, with mock messaging and provider-ready adapters.",
        "approach": "React provides the seller dashboard. FastAPI handles normalized events, structured order extraction, inventory, permissions, and audit records. SQLite supports local tests and Postgres is available for runtime storage.",
        "technologies": [
            "React",
            "FastAPI",
            "Python",
            "Postgres"
        ],
        "results": {
            "Workflow": "Mock message → draft order → payment status → fulfillment",
            "Dashboard": "Inbox, inventory, orders, and human takeover",
            "Storage": "SQLite for local use; Postgres runtime support",
            "Integration stage": "Messaging and payment adapters require provider setup"
        },
        "lessons": "The repository describes this as a local MVP/pilot scaffold. Real messaging and payment services require credentials, provider approval, and further production validation.",
        "links": {
            "github": "https://github.com/sabin901/Patra-",
            "demo": null
        },
        "image": null
    },
    "iroutine": {
        "title": "iRoutine — Personal Analytics Dashboard",
        "category": "Personal Analytics",
        "problem": "Time, spending, energy, and planning often live in separate tools, making daily patterns difficult to see.",
        "context": "A dashboard connecting activity logs, interruptions, finances, habits, goals, and reflection.",
        "approach": "A Next.js and TypeScript frontend connects to a FastAPI backend and Supabase Postgres/Auth. The public demo seeds sample data in the browser for exploration without an account.",
        "technologies": [
            "Next.js",
            "TypeScript",
            "FastAPI",
            "Supabase",
            "PostgreSQL"
        ],
        "results": {
            "Daily loop": "Planning, activity, energy, and reflection",
            "Finances": "Transactions, budgets, savings goals, and export",
            "Insights": "Patterns across time, spending, and focus",
            "Demo": "Public sample workspace"
        },
        "lessons": "The project includes frontend journey tests and backend tests. User data isolation and clear sample-data behavior are part of the implementation.",
        "links": {
            "github": "https://github.com/sabin901/iRoutine",
            "demo": "https://i-routine.vercel.app/"
        },
        "image": "images/projects/iroutine.webp"
    },
    "neural-muse": {
        "title": "Neural Muse Dashboard",
        "category": "EEG Data Visualization",
        "problem": "EEG signals benefit from an interface that makes complex data easier to explore.",
        "context": "A TypeScript and React project focused on EEG data visualization.",
        "approach": "Built with Vite, React, TypeScript, Tailwind CSS, and shadcn/ui. The source repository is available for exploring the implementation.",
        "technologies": [
            "React",
            "TypeScript",
            "Vite",
            "Tailwind CSS"
        ],
        "results": {
            "Focus": "EEG visualization",
            "Interface": "React dashboard",
            "Source": "Public repository"
        },
        "lessons": "A visual exploration project. The repository README currently provides development setup rather than a detailed evaluation of signal processing or performance.",
        "links": {
            "github": "https://github.com/sabin901/neural-muse-dashboard",
            "demo": null
        },
        "image": null
    },
    "application-manager": {
        "title": "Application Manager",
        "category": "Student Productivity",
        "problem": "Job searches become difficult to organize when application details are scattered.",
        "context": "A desktop project for college students to track job applications.",
        "approach": "A C#/.NET application organizes application information in a desktop interface. See the repository for implementation details.",
        "technologies": [
            "C#",
            ".NET",
            "Windows Forms"
        ],
        "results": {
            "Purpose": "Organize job applications",
            "Audience": "College students",
            "Platform": "Desktop application"
        },
        "lessons": "The project focuses on making application records easier to manage. Public documentation does not establish measured productivity improvements.",
        "links": {
            "github": "https://github.com/sabin901/Application_Manager",
            "demo": null
        },
        "image": null
    },
    "ayur": {
        "title": "Ayur.me — Educational Wellness Platform",
        "category": "Wellness & Interactive Learning",
        "problem": "Wellness routines and educational information can be difficult to connect in one experience.",
        "context": "A platform for habit tracking, a dosha assessment, educational content, and interactive exploration.",
        "approach": "React and TypeScript power the interface, with Recharts visualizations and React Three Fiber for anatomy exploration. An Express/MongoDB backend supports authentication and saved profiles.",
        "technologies": [
            "React",
            "TypeScript",
            "Express",
            "MongoDB",
            "Recharts",
            "React Three Fiber"
        ],
        "results": {
            "Tracking": "Yoga, diet, meditation, and habit logs",
            "Exploration": "Interactive anatomy and educational content",
            "Assessment": "22-question weighted assessment",
            "Demo": "Browser-local fallback when backend services are unavailable"
        },
        "lessons": "The project is for education and wellness exploration. It is not a clinically validated diagnostic tool or a substitute for medical advice.",
        "links": {
            "github": "https://github.com/sabin901/Ayur.me",
            "demo": "https://ayurme.vercel.app/"
        },
        "image": null
    },
    "mac-service": {
        "title": "Mac Computer Service",
        "category": "Storefront & Booking Frontend",
        "problem": "Customers need a clear way to explore device services, browse products, and start a repair booking.",
        "context": "A website frontend for a Nepal-based Apple device repair and sales business.",
        "approach": "Built with React, TypeScript, Vite, Tailwind CSS, and Framer Motion. Includes product browsing, device-specific repair flows, calendar selection, and booking forms.",
        "technologies": [
            "React",
            "TypeScript",
            "Vite",
            "Tailwind CSS",
            "Framer Motion"
        ],
        "results": {
            "Storefront": "Product browsing and filters",
            "Repairs": "Device and issue selection",
            "Bookings": "Calendar and booking-form interface",
            "Current scope": "Frontend; backend and payment integration are listed as future work"
        },
        "lessons": "The repository documents client-side/local storage. The portfolio does not claim completed payment processing or verified customer bookings.",
        "links": {
            "github": "https://github.com/sabin901/Mac-Computer-Service",
            "demo": "https://www.maccomputerservice.com.np/"
        },
        "image": null
    },
    "weather-analyzer": {
        "title": "Weather Analyzer",
        "category": "Weather Data · Desktop",
        "problem": "Weather observations are easier to review when they can be organized in a desktop interface.",
        "context": "A C# Windows Forms project for working with weather data.",
        "approach": "The repository contains a Visual Studio solution and Windows Forms source. Explore the code for the implemented analysis workflow.",
        "technologies": [
            "C#",
            "Windows Forms",
            "Data Analysis"
        ],
        "results": {
            "Platform": "Windows desktop",
            "Focus": "Weather data exploration",
            "Source": "Public Visual Studio solution"
        },
        "lessons": "No independently measured forecasting accuracy is claimed. More project documentation would make the methods and examples easier to reproduce.",
        "links": {
            "github": "https://github.com/sabin901/Weather_Analyzer",
            "demo": null
        },
        "image": null
    },
    "muse-s": {
        "title": "Muse S Sensor Explorer",
        "category": "Real-Time Sensor Visualization",
        "problem": "Sensor streams need a clear display and a convenient way to record data for later analysis.",
        "context": "A Python desktop application for streaming and visualizing Muse S EEG and motion sensor data.",
        "approach": "Uses PyQt, pyqtgraph, Bleak, NumPy, and SciPy for the interface, Bluetooth connection, signal handling, plots, and CSV recording.",
        "technologies": [
            "Python",
            "PyQt",
            "pyqtgraph",
            "Bleak",
            "NumPy"
        ],
        "results": {
            "Streams": "EEG and IMU sensor data",
            "Recording": "CSV export",
            "Visualization": "Live graphs and tables",
            "Platforms": "macOS and Windows with documented differences"
        },
        "lessons": "Bluetooth behavior and sample rates vary by platform. The README explains setup, device connection, and platform-specific limitations.",
        "links": {
            "github": "https://github.com/sabin901/amused-py-main22",
            "demo": null
        },
        "image": null
    }
};

    // The opening explains the process; Featured Projects presents the work.
    const processSteps = [
        ['Start with the right problem', 'Clarify who it helps, what it needs to do, and what a useful outcome looks like.'],
        ['Connect the pieces', 'Bring the interface, services, and data together into one useful workflow.'],
        ['Check the details', 'Try normal and edge-case paths, verify the data, and check keyboard and mobile use.'],
        ['Improve through feedback', 'Use feedback to simplify the flow and improve clarity, performance, and presentation.']
    ];
    const processChoices = [...document.querySelectorAll('[data-process-step]')];
    const processPanels = [...document.querySelectorAll('[data-process-panel]')];
    document.querySelector('.process-picker').hidden = false;
    processChoices.forEach(choice => choice.addEventListener('click', () => {
        const index = Number(choice.dataset.processStep);
        processChoices.forEach(button => button.setAttribute('aria-pressed', String(button === choice)));
        processPanels.forEach((panel, panelIndex) => { panel.hidden = panelIndex !== index; });
        document.getElementById('hero-process-title').textContent = processSteps[index][0];
        document.getElementById('hero-process-description').textContent = processSteps[index][1];
        document.getElementById('hero-process-count').textContent = `0${index + 1} / 04`;
    }));

    projectModalBtns.forEach(btn => {
        btn.setAttribute('aria-haspopup', 'dialog');
        if (!btn.hasAttribute('aria-label')) btn.setAttribute('aria-label', `Read ${btn.closest('.project-card').querySelector('h3').textContent.trim()} case study`);
        btn.addEventListener('click', () => {
            const projectId = btn.getAttribute('data-project');
            const project = projectData[projectId];
            
            if (project && modalBody && modalOverlay) {
                modalBody.innerHTML = `
                    <article class="case-study">
                        <div class="case-intro ${project.image ? 'has-preview' : ''}">
                        <header class="case-heading">
                            <p class="case-category">${project.category}</p>
                            <h2 id="project-modal-title">${project.title}</h2>
                            <p class="case-lede">${project.context}</p>
                            <div class="case-actions">
                                ${project.links.demo && project.links.demo !== '#' ? `<a href="${project.links.demo}" target="_blank" rel="noopener noreferrer" class="case-action case-action-primary">Open live project <span aria-hidden="true">↗</span></a>` : ''}
                                ${project.links.github ? `<a href="${project.links.github}" target="_blank" rel="noopener noreferrer" class="case-action">View source <span aria-hidden="true">↗</span></a>` : ''}
                            </div>
                        </header>
                        ${project.image ? `<figure class="case-preview"><img src="${project.image}" alt="${project.title} public project preview"><figcaption>Public project preview</figcaption></figure>` : ''}
                        </div>
                        <div class="case-overview-grid">
                            <section class="case-section"><p class="case-section-number" aria-hidden="true">01 / PURPOSE</p><h3>Why it exists</h3><p>${project.problem}</p></section>
                            <section class="case-section"><p class="case-section-number" aria-hidden="true">02 / APPROACH</p><h3>How it works</h3><p>${project.approach}</p></section>
                        </div>
                        <section class="case-section case-stack"><h3>Built with</h3><ul class="case-technologies">${project.technologies.map(tech => `<li>${tech}</li>`).join('')}</ul></section>
                        <section class="case-section case-scope"><p class="case-section-number" aria-hidden="true">03 / CURRENT SCOPE</p><h3>What’s inside</h3><dl class="case-features">${Object.entries(project.results).map(([label, detail]) => `<div><dt>${label}</dt><dd>${detail}</dd></div>`).join('')}</dl></section>
                        <section class="case-section case-notes"><span class="case-notes-icon" aria-hidden="true">&lt;/&gt;</span><div><h3>Engineering notes</h3><p>${project.lessons}</p></div></section>
                    </article>
                `;

                openDialog(modalOverlay, btn);
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

    // Closing with browser Back restores the trigger and background access.
    window.addEventListener('popstate', () => {
        waitingForHistory = false;
        if (activeDialog) closeDialog(false);
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
            const scrolled = windowHeight > 0 ? Math.min(100, Math.max(0, window.scrollY / windowHeight * 100)) : 0;
            scrollProgress.style.width = scrolled + '%';
        });
    }

    // ===== SCROLL ANIMATIONS =====
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = 'IntersectionObserver' in window ? new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) scale(1)';
                }, index * 50);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions) : null;

    // Observe animated elements
    document.querySelectorAll('.project-card, section > div > div').forEach((el, index) => {
        if (observer && !reducedMotion.matches && !el.classList.contains('text-center') && !el.classList.contains('article-card') && !el.classList.contains('hero-showcase') && !el.querySelector('.project-card, [role="dialog"]')) {
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
                    <div class="pb-6 border-b-2" style="border-color: var(--accent-border);">
                        <span class="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3" style="background: var(--accent-soft); color: var(--accent-mint);">Technical Guide</span>
                        <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">Published January 2025</p>
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
                        
                        <div class="mt-8 p-6 rounded-xl border-2" style="background: var(--accent-wash); border-color: var(--accent-border);">
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
                    <div class="pb-6 border-b-2" style="border-color: var(--accent-border);">
                        <span class="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3" style="background: var(--accent-soft); color: var(--accent-mint);">Data Science</span>
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
                        
                        <div class="mt-8 p-6 rounded-xl border-2" style="background: var(--accent-wash); border-color: var(--accent-border);">
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
                    <div class="pb-6 border-b-2" style="border-color: var(--accent-border);">
                        <span class="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3" style="background: var(--accent-soft); color: var(--accent-mint);">Financial Analysis</span>
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
                            <div class="p-3 rounded-lg border" style="background: var(--accent-wash); border-color: var(--accent-border);">
                                <strong class="text-black dark:text-white">requests</strong> - API calls to SEC EDGAR
                            </div>
                            <div class="p-3 rounded-lg border" style="background: var(--accent-wash); border-color: var(--accent-border);">
                                <strong class="text-black dark:text-white">BeautifulSoup</strong> - HTML parsing
                            </div>
                            <div class="p-3 rounded-lg border" style="background: var(--accent-wash); border-color: var(--accent-border);">
                                <strong class="text-black dark:text-white">pandas</strong> - Data manipulation
                            </div>
                            <div class="p-3 rounded-lg border" style="background: var(--accent-wash); border-color: var(--accent-border);">
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
                        
                        <div class="mt-8 p-6 rounded-xl border-2" style="background: var(--accent-wash); border-color: var(--accent-border);">
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
        const article = articlesData[card.dataset.article];
        const readingTime = card.querySelector('.reading-time');
        if (article && readingTime) {
            const text = new DOMParser().parseFromString(article.content, 'text/html').body.textContent;
            const minutes = Math.max(1, Math.ceil(text.trim().split(/\s+/).length / 200));
            readingTime.textContent = `${minutes} min read`;
        }
        card.setAttribute('aria-label', `Read ${card.querySelector('h3').textContent}`);
        card.addEventListener('keydown', event => {
            if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); card.click(); }
        });
        card.addEventListener('click', () => {
            const articleId = card.getAttribute('data-article');
            const article = articlesData[articleId];
            
            if (article && articleModalBody && articleModalOverlay) {
                articleModalBody.innerHTML = `
                    <div class="mb-6">
                        <h2 id="article-modal-title" class="text-2xl md:text-3xl font-bold mb-4 article-modal-title">${article.title}</h2>
                    </div>
                    ${article.content}
                `;
                
                openDialog(articleModalOverlay, card);
            }
        });
    });

    // Close article modal - event delegation (close button + overlay click)
    function closeArticleModal() { closeDialog(); }

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
        if (!mobileMenu.classList.contains('hidden')) closeMobileMenu(true);
        if (modalOverlay && !modalOverlay.classList.contains('hidden')) {
            closeProjectModal();
            return;
        }
        if (articleModalOverlay && !articleModalOverlay.classList.contains('hidden')) {
            closeArticleModal();
        }
    });
}); 
