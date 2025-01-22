document.addEventListener('DOMContentLoaded', () => {
  const shippingCarouselContainer = document.querySelector(
    '.shipping-carousel-container'
  );
  const shippingCarouselTrack = document.querySelector(
    '.shipping-carousel-track'
  );
  const shippingCarouselSlides = document.querySelectorAll(
    '.shipping-carousel-slide'
  );
  const shippingDotsContainer = document.querySelector(
    '.shipping-carousel-dots'
  );

  let currentShippingSlide = 0;
  let startX;
  let moveX;
  let currentShippingTranslate = 0;
  let isDragging = false;

  // Create dots
  shippingCarouselSlides.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('shipping-carousel-dot');
    if (index === 0) dot.classList.add('shipping-carousel-dot--active');
    dot.addEventListener('click', () => goToShippingSlide(index));
    shippingDotsContainer.appendChild(dot);
  });

  const shippingDots = document.querySelectorAll('.shipping-carousel-dot');

  function updateShippingDots() {
    shippingDots.forEach((dot, index) => {
      dot.classList.toggle(
        'shipping-carousel-dot--active',
        index === currentShippingSlide
      );
    });
  }

  function goToShippingSlide(index) {
    currentShippingSlide = index;
    currentShippingTranslate = -currentShippingSlide * 100;
    shippingCarouselTrack.style.transform = `translateX(${currentShippingTranslate}%)`;
    updateShippingDots();
  }

  // Touch events
  shippingCarouselTrack.addEventListener('touchstart', (e) => {
    if (window.innerWidth >= 768) return; // Incluye la barra de scroll
    startX = e.touches[0].clientX;
    isDragging = true;
    shippingCarouselTrack.style.transition = 'none';
  });

  shippingCarouselTrack.addEventListener('touchmove', (e) => {
    if (!isDragging || window.innerWidth >= 768) return;
    moveX = e.touches[0].clientX;
    const walk = moveX - startX;
    const movePercent = (walk / shippingCarouselContainer.offsetWidth) * 100;
    const translate = currentShippingTranslate + movePercent;

    if (
      translate > 0 ||
      translate < -((shippingCarouselSlides.length - 1) * 100)
    ) {
      shippingCarouselTrack.style.transform = `translateX(${translate * 0.3}%)`;
    } else {
      shippingCarouselTrack.style.transform = `translateX(${translate}%)`;
    }
  });

  shippingCarouselTrack.addEventListener('touchend', (e) => {
    if (!isDragging || window.innerWidth >= 768) return;
    isDragging = false;
    shippingCarouselTrack.style.transition = 'transform 0.3s ease-out';

    const moveX = e.changedTouches[0].clientX;
    const walk = moveX - startX;
    const movePercent = (walk / shippingCarouselContainer.offsetWidth) * 100;

    if (Math.abs(movePercent) > 20) {
      if (movePercent > 0 && currentShippingSlide > 0) {
        currentShippingSlide--;
      } else if (
        movePercent < 0 &&
        currentShippingSlide < shippingCarouselSlides.length - 1
      ) {
        currentShippingSlide++;
      }
    }

    currentShippingTranslate = -currentShippingSlide * 100;
    shippingCarouselTrack.style.transform = `translateX(${currentShippingTranslate}%)`;
    updateShippingDots();
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) {
      shippingCarouselTrack.style.transform = 'none';
      shippingCarouselTrack.style.transition = 'none';
    } else {
      currentShippingTranslate = -currentShippingSlide * 100;
      shippingCarouselTrack.style.transform = `translateX(${currentShippingTranslate}%)`;
      shippingCarouselTrack.style.transition = 'transform 0.3s ease-out';
    }
  });
});
