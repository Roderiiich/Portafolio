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
// LÓGICA DE FILTRADO DE PROYECTOS (REAGRUPAMIENTO FLUIDO SIN DESORDENAR)
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.btn-filtro');
    const carruselPCInner = document.querySelector('#carruselPC .carousel-inner');
    const carruselMobileInner = document.querySelector('#carruselMobile .carousel-inner');

    if (!filterButtons.length || !carruselPCInner || !carruselMobileInner) return;

    // Guardar el estado inicial intacto de ambos carruseles
    const originalPCHTML = carruselPCInner.innerHTML;
    const originalMobileHTML = carruselMobileInner.innerHTML;

    // Extraer todas las tarjetas únicas del HTML original
    const initialCards = Array.from(carruselMobileInner.querySelectorAll('.card[data-category]'));

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            if (filterValue === 'all') {
                // Restaurar carruseles originales intactos
                carruselPCInner.innerHTML = originalPCHTML;
                carruselMobileInner.innerHTML = originalMobileHTML;
            } else {
                // Obtener solo las tarjetas que coinciden con el filtro
                const filteredCards = initialCards.filter(card => card.getAttribute('data-category') === filterValue);

                if (filteredCards.length === 0) return;

                // 1. Reconstruir Carrusel de Móvil (1 tarjeta por diapositiva)
                let mobileHTML = '';
                filteredCards.forEach((card, index) => {
                    const activeClass = index === 0 ? 'active' : '';
                    mobileHTML += `
                        <div class="carousel-item ${activeClass}">
                            ${card.outerHTML}
                        </div>`;
                });
                carruselMobileInner.innerHTML = mobileHTML;

                // 2. Reconstruir Carrusel de PC (Agrupados de a 3 por diapositiva)
                let pcHTML = '';
                for (let i = 0; i < filteredCards.length; i += 3) {
                    const group = filteredCards.slice(i, i + 3);
                    const activeClass = i === 0 ? 'active' : '';

                    pcHTML += `<div class="carousel-item ${activeClass}"><div class="row g-4 justify-content-center">`;
                    group.forEach(card => {
                        pcHTML += `
                            <div class="col-md-4 d-flex">
                                ${card.outerHTML}
                            </div>`;
                    });
                    pcHTML += `</div></div>`;
                }
                carruselPCInner.innerHTML = pcHTML;
            }

            // Reiniciar instancias de Bootstrap Carousel para que reconozcan la nueva estructura
            const pcCarouselEl = document.getElementById('carruselPC');
            const mobileCarouselEl = document.getElementById('carruselMobile');

            if (pcCarouselEl && window.bootstrap) {
                bootstrap.Carousel.getOrCreateInstance(pcCarouselEl).to(0);
            }
            if (mobileCarouselEl && window.bootstrap) {
                bootstrap.Carousel.getOrCreateInstance(mobileCarouselEl).to(0);
            }
        });
    });
});

// ==========================================================================
// INICIALIZACIÓN DE TOOLTIPS (MICROINTERACCIONES EN STACK)
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
    const tooltipTriggerList = Array.from(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.forEach(tooltipTriggerEl => {
        new bootstrap.Tooltip(tooltipTriggerEl);
    });
});

// ==========================================================================
// FONDO ANIMADO DE NODOS NEÓN
// ==========================================================================

function initBgCanvas() {
    const bgCanvas = document.getElementById('bg-canvas');
    if (!bgCanvas) return;

    const ctx = bgCanvas.getContext('2d');
    let particles = [];

    const isMobile = (window.innerWidth || document.documentElement.clientWidth) <= 768;
    const numParticles = isMobile ? 35 : 80;
    const maxDistance = isMobile ? 110 : 160;

    function resizeBg() {
        bgCanvas.width = window.innerWidth || document.documentElement.clientWidth;
        bgCanvas.height = window.innerHeight || document.documentElement.clientHeight;
    }

    resizeBg();
    window.addEventListener('resize', resizeBg);

    for (let i = 0; i < numParticles; i++) {
        particles.push({
            x: Math.random() * bgCanvas.width,
            y: Math.random() * bgCanvas.height,
            vx: (Math.random() - 0.5) * 0.8,
            vy: (Math.random() - 0.5) * 0.8,
            size: Math.random() * 2.5 + 1.2,
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
            ctx.shadowBlur = 10;
            ctx.shadowColor = 'rgba(59, 130, 246, 0.9)';
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();

            for (let j = i + 1; j < particles.length; j++) {
                let p2 = particles[j];
                let dx = p.x - p2.x;
                let dy = p.y - p2.y;
                let dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < maxDistance) {
                    let alpha = (1 - dist / maxDistance) * (isMobile ? 0.3 : 0.45);
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

document.getElementById('btn-copiar-email')?.addEventListener('click', () => {
  const email = document.getElementById('email-texto').textContent;
  navigator.clipboard.writeText(email).then(() => {
    const btn = document.getElementById('btn-copiar-email');
    btn.innerHTML = '<i class="bi bi-check2 text-success"></i>';
    setTimeout(() => {
      btn.innerHTML = '<i class="bi bi-clipboard"></i>';
    }, 2000);
  });
});