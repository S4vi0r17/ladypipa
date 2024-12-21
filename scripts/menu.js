// Elementos del DOM
const menuToggle = document.querySelector('.navbar__menu-button');
const mobileMenu = document.createElement('div');

// Crear estructura del menú móvil
function createMobileMenu() {
  mobileMenu.className = 'mobile-menu';
  mobileMenu.innerHTML = `
    <button class="close-btn">&times;</button>
    <div class="mobile-menu-links">
      <a href="#">PRENDAS</a>
      <a href="#">REBAJAS</a>
      <a href="#">TIPO DE EVENTO</a>
      <a href="#">COLECCIONES</a>
      <a href="#">ACCESORIOS</a>
      <a href="#">NOSOTRAS</a>
      <a href="#">TIENDAS</a>
    </div>
  `;
  document.body.appendChild(mobileMenu);
}

// Abrir menú móvil
function openMenu() {
  mobileMenu.classList.add('active');
  document.body.style.overflow = 'hidden';
}

// Cerrar menú móvil
function closeMenu() {
  mobileMenu.classList.remove('active');
  document.body.style.overflow = '';
}

// Configurar eventos del menú
function setupMobileMenu() {
  createMobileMenu();

  menuToggle.addEventListener('click', openMenu);
  mobileMenu.querySelector('.close-btn').addEventListener('click', closeMenu);

  // Cerrar menú al hacer click en un enlace
  mobileMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', setupMobileMenu);
