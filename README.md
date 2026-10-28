# ⚡ Roderich — Portafolio Web Profesional

Portafolio web profesional tipo *landing page* interactiva desarrollado para exhibir proyectos de desarrollo **Web, Móvil y Backend**. La plataforma está diseñada con una estética **"Neon Tech" & Glassmorphic**, responsiva para todos los dispositivos y enfocada en la interacción de usuario con filtrado de proyectos dinámico y soporte multilingüe (ES / EN).

![Theme Neon Tech](https://img.shields.io/badge/Theme-Neon%20Tech-3B82F6?style=flat-square)
![Bootstrap 5](https://img.shields.io/badge/Bootstrap-5.3.3-7952B3?style=flat-square&logo=bootstrap)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=flat-square&logo=javascript)
![CSS3](https://img.shields.io/badge/CSS3-Glassmorphism-1572B6?style=flat-square&logo=css3)
![EmailJS](https://img.shields.io/badge/Service-EmailJS-FF6C37?style=flat-square)
![Deploy Netlify](https://img.shields.io/badge/Deploy-Netlify-00C7B7?style=flat-square&logo=netlify)

---

## 🌐 Demo en Vivo

Puedes explorar el portafolio en línea en: **[roderich.netlify.app](https://roderich.netlify.app)**

---

## 🚀 Características Principales

- **Diseño "Neon Tech" & Glassmorphism:** Fondo dinámico con red de nodos interactivos (*Canvas HTML5*), efectos translúcidos y acentos en neón azul.
- **Filtrado Dinámico de Proyectos:** Sistema de filtrado en tiempo real (*Todos, Web, Móvil, Backend*) que reagrupa de forma fluida el carrusel sin generar espacios en blanco ni romper la paginación.
- **Soporte Multilingüe (Español / Inglés):** Interruptor con banderas visuales de España y EE. UU. que traduce los contenidos del sitio dinámicamente guardando la preferencia en `localStorage`.
- **Integración con EmailJS:** Formulario de contacto directo con validación que envía los mensajes al correo del desarrollador e incluye modal de confirmación con efecto *blur*.
- **Carruseles Adaptativos:** Lógica responsiva diferenciada para escritorio (agrupación de a 3 proyectos por tarjeta) y smartphones (1 proyecto por vista).
- **Indicadores y Métricas:** Bloque compacto de logros y stack tecnológico con microinteracciones y *tooltips* informativos.

---

## 🛠️ Tecnologías Utilizadas

- **HTML5:** Marcado semántico, optimización SEO y renderizado Canvas.
- **CSS3:** Estilos personalizados, efectos de vidrio borroso (`backdrop-filter`), animaciones CSS y diseño totalmente adaptativo.
- **Bootstrap 5.3.3:** Sistema de grillas, modales y estructura base de carruseles.
- **JavaScript (ES6+):** Manipulación del DOM, lógica de filtrado de carrusel, motor de partículas en Canvas y cambio de idioma.
- **EmailJS SDK:** Gestión del envío de correos sin necesidad de un backend propio.
- **Bootstrap Icons & Devicon:** Iconografía de tecnologías y redes sociales.

---

## 📁 Estructura del Proyecto

```text
.
├── index.html         # Estructura principal, modales y secciones del portafolio
├── script.js          # Lógica interactiva: Canvas, carrusel dinámico, EmailJS e idioma
├── styles.css         # Estilos globales, variables de color neón y animaciones
├── cv.pdf             # Currículum Vitae descargable
├── img/               # Imágenes de proyectos, avatar y favicons
└── README.md          # Documentación del repositorio