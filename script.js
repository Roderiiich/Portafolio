// ==========================================================================
// CONTROL DEL MENÚ RESPONSIVO (NAVBAR MOBILE)
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.getElementById('nav-toggle');
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');

    if (navToggle && navbar) {
        navToggle.addEventListener('click', () => {
            navbar.classList.toggle('show');
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navbar && navbar.classList.contains('show')) {
                navbar.classList.remove('show');
            }
        });
    });
});

// ==========================================================================
// ENVÍO DEL FORMULARIO DE CONTACTO CON EMAILJS Y MODAL
// ==========================================================================

const contactForm = document.getElementById('contact-form');
const btnSubmit = document.getElementById('btn-submit');

if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const originalText = btnSubmit.textContent;
        btnSubmit.textContent = 'Enviando...';
        btnSubmit.disabled = true;

        const modalContactoElement = document.getElementById('modalContacto');
        const modalContacto = new bootstrap.Modal(modalContactoElement);

        emailjs.sendForm('service_npiy6vg', 'template_5xtbs0w', this)
            .then(() => {
                contactForm.reset();
                modalContacto.show();
            }, (error) => {
                alert('Ocurrió un error al enviar el mensaje. Por favor intenta nuevamente.');
                console.error('Error EmailJS:', error);
            })
            .finally(() => {
                btnSubmit.textContent = originalText;
                btnSubmit.disabled = false;
            });
    });
}

// ==========================================================================
// CONTROL DEL INTERRUPTOR DE IDIOMA (SWITCH ES / EN)
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
    const langToggle = document.getElementById('lang-toggle');
    const labelEs = document.querySelector('.lang-es');
    const labelEn = document.querySelector('.lang-en');

    let currentLang = localStorage.getItem('portfolio_lang') || 'es';

    const applyLanguage = (lang) => {
        const elements = document.querySelectorAll('[data-es][data-en]');

        elements.forEach(el => {
            const translation = el.getAttribute(`data-${lang}`);
            if (translation) {
                if (translation.includes('<')) {
                    el.innerHTML = translation;
                } else {
                    el.textContent = translation;
                }
            }
        });

        if (lang === 'en') {
            if (langToggle) langToggle.checked = true;
            labelEs?.classList.remove('active');
            labelEn?.classList.add('active');
        } else {
            if (langToggle) langToggle.checked = false;
            labelEn?.classList.remove('active');
            labelEs?.classList.add('active');
        }

        localStorage.setItem('portfolio_lang', lang);
    };

    applyLanguage(currentLang);

    if (langToggle) {
        langToggle.addEventListener('change', (e) => {
            const selectedLang = e.target.checked ? 'en' : 'es';
            applyLanguage(selectedLang);
        });
    }
});

// ==========================================================================
// ESTELA ESTILO VAPOR / HUMO NEÓN INTENSO EN CURSOR
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('trail-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let particles = [];

    const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const colors = [
        { r: 59, g: 130, b: 246 },  /* var(--accent-blue) */
        { r: 37, g: 99, b: 235 },   /* var(--primary-blue) */
        { r: 6, g: 182, b: 212 }    /* Cyan neón */
    ];

    window.addEventListener('mousemove', (e) => {
        for (let i = 0; i < 3; i++) {
            const color = colors[Math.floor(Math.random() * colors.length)];
            particles.push({
                x: e.clientX + (Math.random() - 0.5) * 6,
                y: e.clientY + (Math.random() - 0.5) * 6,
                size: Math.random() * 8 + 8,
                color: color,
                alpha: 0.75,
                vx: (Math.random() - 0.5) * 1.2,
                vy: (Math.random() - 0.5) * 1.2 - 0.3,
                growth: 0.4,
                decay: 0.02
            });
        }
    });

    const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < particles.length; i++) {
            let p = particles[i];

            p.x += p.vx;
            p.y += p.vy;
            p.size += p.growth;
            p.alpha -= p.decay;

            if (p.alpha <= 0) {
                particles.splice(i, 1);
                i--;
                continue;
            }

            ctx.save();
            ctx.globalAlpha = p.alpha;
            ctx.shadowBlur = 15;
            ctx.shadowColor = `rgb(${p.color.r}, ${p.color.g}, ${p.color.b})`;

            let gradient = ctx.createRadialGradient(
                p.x, p.y, 0,
                p.x, p.y, p.size
            );

            gradient.addColorStop(0, `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, 0.9)`);
            gradient.addColorStop(0.4, `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, 0.5)`);
            gradient.addColorStop(1, `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, 0)`);

            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }

        requestAnimationFrame(animate);
    };

    animate();
});

// ==========================================================================
// FONDO ANIMADO VISIBLE DE NODOS NEÓN
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
    const bgCanvas = document.getElementById('bg-canvas');
    if (!bgCanvas) return;

    const ctx = bgCanvas.getContext('2d');
    let particles = [];
    const numParticles = 75;
    const maxDistance = 160;

    const resizeBg = () => {
        bgCanvas.width = window.innerWidth;
        bgCanvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeBg);
    resizeBg();

    for (let i = 0; i < numParticles; i++) {
        particles.push({
            x: Math.random() * bgCanvas.width,
            y: Math.random() * bgCanvas.height,
            vx: (Math.random() - 0.5) * 0.7,
            vy: (Math.random() - 0.5) * 0.7,
            size: Math.random() * 2.5 + 1.5,
            color: 'rgb(59, 130, 246)'
        });
    }

    const animateBg = () => {
        ctx.clearRect(0, 0, bgCanvas.width, bgCanvas.height);

        for (let i = 0; i < particles.length; i++) {
            let p = particles[i];

            p.x += p.vx;
            p.y += p.vy;

            if (p.x < 0 || p.x > bgCanvas.width) p.vx *= -1;
            if (p.y < 0 || p.y > bgCanvas.height) p.vy *= -1;

            ctx.fillStyle = p.color;
            ctx.shadowBlur = 10;
            ctx.shadowColor = 'rgba(59, 130, 246, 0.8)';
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();

            for (let j = i + 1; j < particles.length; j++) {
                let p2 = particles[j];
                let dx = p.x - p2.x;
                let dy = p.y - p2.y;
                let dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < maxDistance) {
                    let alpha = (1 - dist / maxDistance) * 0.35;
                    ctx.strokeStyle = `rgba(59, 130, 246, ${alpha})`;
                    ctx.lineWidth = 0.9;
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.stroke();
                }
            }
        }

        requestAnimationFrame(animateBg);
    };

    animateBg();
});