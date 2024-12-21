document.addEventListener('DOMContentLoaded', function () {
  const navbar = document.querySelector('.navbar');
  const hero = document.querySelector('.hero');

  function updateNavbar() {
    // Si el scroll está más allá de la altura del hero, fijar la barra de navegación
    if (window.scrollY > hero.offsetHeight) {
      navbar.classList.add('fixed');
    } else {
      navbar.classList.remove('fixed');
    }
  }

  updateNavbar();

  window.addEventListener('scroll', updateNavbar);
});
