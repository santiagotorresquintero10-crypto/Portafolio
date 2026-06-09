/* ============================================================
   SANTIAGO TORRES QUINTERO – PORTAFOLIO DATA ANALYST
   main.js
   ============================================================ */

/* ----- NAVBAR: scroll effect + hamburger ----- */
(function initNavbar() {
    const navbar    = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navLinks  = document.getElementById('navLinks');

    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 40);
    });

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('open');
    });

    navLinks.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('open');
        });
    });
})();

/* ----- PARTICLE CANVAS ----- */
(function initParticles() {
    const canvas = document.getElementById('particleCanvas');
    if (!canvas) return;
    const ctx    = canvas.getContext('2d');
    let particles = [];
    let W, H, animId;

    function resize() {
        W = canvas.width  = window.innerWidth;
        H = canvas.height = window.innerHeight;
    }

    function Particle() {
        this.x  = Math.random() * W;
        this.y  = Math.random() * H;
        this.r  = Math.random() * 1.8 + 0.3;
        this.vx = (Math.random() - 0.5) * 0.35;
        this.vy = (Math.random() - 0.5) * 0.35;
        this.alpha = Math.random() * 0.5 + 0.1;
    }

    function spawn(n) {
        particles = [];
        for (let i = 0; i < n; i++) particles.push(new Particle());
    }

    function draw() {
        ctx.clearRect(0, 0, W, H);

        /* lines between nearby particles */
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const d  = Math.hypot(dx, dy);
                if (d < 120) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(0,212,255,${0.06 * (1 - d / 120)})`;
                    ctx.lineWidth   = 1;
                    ctx.stroke();
                }
            }
        }

        /* dots */
        particles.forEach(p => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0,212,255,${p.alpha})`;
            ctx.fill();

            p.x += p.vx;
            p.y += p.vy;
            if (p.x < 0 || p.x > W) p.vx *= -1;
            if (p.y < 0 || p.y > H) p.vy *= -1;
        });

        animId = requestAnimationFrame(draw);
    }

    resize();
    spawn(90);
    draw();

    window.addEventListener('resize', () => {
        resize();
        spawn(90);
    });
})();

/* ----- TYPEWRITER EFFECT ----- */
(function initTypewriter() {
    const el    = document.getElementById('typedText');
    if (!el) return;
    const texts = [
        '"Analista de Datos"',
        '"BI Developer"',
        '"Power BI Expert"',
        '"Data Visualization"',
        '"Report Automation"',
    ];
    let tIdx = 0, cIdx = 0, deleting = false;

    function type() {
        const current = texts[tIdx];
        if (!deleting) {
            el.textContent = current.slice(0, ++cIdx);
            if (cIdx === current.length) {
                deleting = true;
                setTimeout(type, 2000);
                return;
            }
        } else {
            el.textContent = current.slice(0, --cIdx);
            if (cIdx === 0) {
                deleting = false;
                tIdx = (tIdx + 1) % texts.length;
            }
        }
        setTimeout(type, deleting ? 50 : 80);
    }
    setTimeout(type, 800);
})();

/* ----- COUNTER ANIMATION ----- */
(function initCounters() {
    const nums = document.querySelectorAll('.stat-number[data-target]');
    let counted = false;

    function animateCounters() {
        if (counted) return;
        const heroRect = document.getElementById('inicio')?.getBoundingClientRect();
        if (!heroRect || heroRect.bottom < 0) return;
        counted = true;

        nums.forEach(el => {
            const target = parseInt(el.dataset.target, 10);
            const dur    = 1600;
            const start  = performance.now();

            function step(now) {
                const elapsed = now - start;
                const progress = Math.min(elapsed / dur, 1);
                const ease = 1 - Math.pow(1 - progress, 3);
                el.textContent = Math.round(ease * target);
                if (progress < 1) requestAnimationFrame(step);
            }
            requestAnimationFrame(step);
        });
    }

    window.addEventListener('scroll', animateCounters);
    setTimeout(animateCounters, 1000);
})();

/* ----- SCROLL REVEAL ----- */
(function initReveal() {
    const elements = document.querySelectorAll('.reveal');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.delay || (i % 4) * 80;
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    elements.forEach(el => observer.observe(el));
})();

/* ----- SKILL BAR ANIMATION ----- */
(function initSkillBars() {
    const bars = document.querySelectorAll('.skill-fill');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el    = entry.target;
                const width = el.dataset.width;
                setTimeout(() => { el.style.width = width + '%'; }, 200);
                observer.unobserve(el);
            }
        });
    }, { threshold: 0.3 });

    bars.forEach(b => observer.observe(b));
})();

/* ----- SMOOTH ACTIVE NAV LINK ----- */
(function initActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const links    = document.querySelectorAll('.nav-links a');

    function setActive() {
        const scrollY = window.scrollY + 120;
        sections.forEach(sec => {
            if (scrollY >= sec.offsetTop && scrollY < sec.offsetTop + sec.offsetHeight) {
                links.forEach(a => {
                    a.classList.remove('active');
                    if (a.getAttribute('href') === '#' + sec.id) a.classList.add('active');
                });
            }
        });
    }

    window.addEventListener('scroll', setActive, { passive: true });
})();
