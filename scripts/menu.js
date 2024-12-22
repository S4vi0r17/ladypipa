const menuToggle = document.querySelector('.navbar__menu-button');
let mobileMenu = null;
let overlay = null;

// Crear estructura del menú móvil
function createMobileMenu() {
  if (!mobileMenu) {
    // Crear el menú
    mobileMenu = document.createElement('div');
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

    // Crear el overlay
    overlay = document.createElement('div');
    overlay.className = 'mobile-menu-overlay';

    // Añadir al DOM
    document.body.appendChild(mobileMenu);
    document.body.appendChild(overlay);

    // Configurar eventos
    mobileMenu.querySelector('.close-btn').addEventListener('click', closeMenu);
    overlay.addEventListener('click', closeMenu);
    mobileMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', closeMenu);
    });
  }
}

// Abrir menú móvil
function openMenu() {
  if (!mobileMenu) createMobileMenu();
  mobileMenu.classList.add('active');
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

// Cerrar menú móvil
function closeMenu() {
  if (mobileMenu) {
    mobileMenu.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// Configurar eventos del menú
function setupMobileMenu() {
  menuToggle.addEventListener('click', openMenu);
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', setupMobileMenu);
