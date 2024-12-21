document.addEventListener('DOMContentLoaded', () => {
  const carousel = document.querySelector('.carousel');
  const track = document.querySelector('.carousel-track');
  const slides = document.querySelectorAll('.slide');
  const customCursor = document.querySelector('.custom-cursor');
  const dotsContainer = document.querySelector('.carousel-dots');

  let currentIndex = 0;

  // Create dots
  slides.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(index));
    dotsContainer.appendChild(dot);
  });

  // Custom cursor movement
  carousel.addEventListener('mousemove', (e) => {
    customCursor.style.display = 'flex';
    customCursor.style.left = e.clientX + 'px';
    customCursor.style.top = e.clientY + 'px';

    const rect = carousel.getBoundingClientRect();
    const x = e.clientX - rect.left;

    if (x < rect.width / 2) {
      customCursor.innerHTML = '<';
    } else {
      customCursor.innerHTML = '>';
    }
  });

  carousel.addEventListener('mouseleave', () => {
    customCursor.style.display = 'none';
  });

  function goToSlide(index) {
    currentIndex = index;
    updateCarousel();
  }

  function updateCarousel() {
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    document.querySelectorAll('.dot').forEach((dot, index) => {
      dot.classList.toggle('active', index === currentIndex);
    });
  }

  // Auto advance
  setInterval(() => {
    currentIndex = (currentIndex + 1) % slides.length;
    updateCarousel();
  }, 5000);

  // Click navigation
  carousel.addEventListener('click', (e) => {
    const rect = carousel.getBoundingClientRect();
    const x = e.clientX - rect.left;

    if (x < rect.width / 2) {
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    } else {
      currentIndex = (currentIndex + 1) % slides.length;
    }

    updateCarousel();
  });
});
