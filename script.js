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
// FONDO ANIMADO DE NODOS NEÓN (EJECUCIÓN DIRECTA)
// ==========================================================================

function initBgCanvas() {
    const bgCanvas = document.getElementById('bg-canvas');
    if (!bgCanvas) return;

    const ctx = bgCanvas.getContext('2d');
    let particles = [];
    const numParticles = 80;
    const maxDistance = 160;

    function resizeBg() {
        bgCanvas.width = window.innerWidth || document.documentElement.clientWidth;
        bgCanvas.height = window.innerHeight || document.documentElement.clientHeight;
    }

    resizeBg();
    window.addEventListener('resize', resizeBg);

    // Crear partículas
    for (let i = 0; i < numParticles; i++) {
        particles.push({
            x: Math.random() * bgCanvas.width,
            y: Math.random() * bgCanvas.height,
            vx: (Math.random() - 0.5) * 0.8,
            vy: (Math.random() - 0.5) * 0.8,
            size: Math.random() * 3 + 1.5,
            color: 'rgb(59, 130, 246)'
        });
    }

    function animateBg() {
        ctx.clearRect(0, 0, bgCanvas.width, bgCanvas.height);

        for (let i = 0; i < particles.length; i++) {
            let p = particles[i];

            p.x += p.vx;
            p.y += p.vy;

            if (p.x < 0 || p.x > bgCanvas.width) p.vx *= -1;
            if (p.y < 0 || p.y > bgCanvas.height) p.vy *= -1;

            ctx.fillStyle = p.color;
            ctx.shadowBlur = 12;
            ctx.shadowColor = 'rgba(59, 130, 246, 1)';
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();

            for (let j = i + 1; j < particles.length; j++) {
                let p2 = particles[j];
                let dx = p.x - p2.x;
                let dy = p.y - p2.y;
                let dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < maxDistance) {
                    let alpha = (1 - dist / maxDistance) * 0.45;
                    ctx.strokeStyle = `rgba(59, 130, 246, ${alpha})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.stroke();
                }
            }
        }

        requestAnimationFrame(animateBg);
    }

    animateBg();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initBgCanvas);
} else {
    initBgCanvas();
}