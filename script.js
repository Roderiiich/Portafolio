// ==========================================================================
// CONTROL DEL MENÚ RESPONSIVO (NAVBAR MOBILE)
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
    // 1. Seleccionar los elementos del DOM
    const navToggle = document.getElementById('nav-toggle');
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');

    // 2. Evento para abrir/cerrar el menú con el botón hamburguesa
    if (navToggle && navbar) {
        navToggle.addEventListener('click', () => {
            navbar.classList.toggle('show'); // Alterna la clase para mostrar/ocultar
        });
    }

    // 3. Evento para cerrar el menú automáticamente al hacer clic en un enlace
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navbar && navbar.classList.contains('show')) {
                navbar.classList.remove('show'); // Remueve la clase y esconde el menú
            }
        });
    });
});