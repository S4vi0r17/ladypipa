document.addEventListener('DOMContentLoaded', () => {
    const gallery = document.querySelector('.been-carousel-gallery');
    const track = document.querySelector('.been-carousel-track');
    const slides = Array.from(document.querySelectorAll('.been-carousel-slide'));
    const prevButton = document.querySelector('.been-carousel-button.prev');
    const nextButton = document.querySelector('.been-carousel-button.next');

    let currentIndex = 0;
    let slidesToShow = calculateSlidesToShow();

    function calculateSlidesToShow() {
        const galleryWidth = gallery.offsetWidth;
        /*
        const slideWidth = slides[0].offsetWidth + 20; // Width + gap
        return Math.floor(galleryWidth / slideWidth);
        */
        if (galleryWidth >= 1800) return 5;
        if (galleryWidth >= 1200) return 4;
        if (galleryWidth >= 768) return 3;
        return 2;
    }

    function updateButtonVisibility() {
        prevButton.classList.toggle('hidden', currentIndex === 0);
        nextButton.classList.toggle(
            'hidden',
            currentIndex >= slides.length - slidesToShow
        );
    }

    function moveSlides(direction) {
        const slideWidth = slides[0].offsetWidth + 20; // Width + gap

        if (direction === 'next' && currentIndex < slides.length - slidesToShow) {
            currentIndex++;
        } else if (direction === 'prev' && currentIndex > 0) {
            currentIndex--;
        }

        track.style.transform = `translateX(${-currentIndex * slideWidth}px)`;
        updateButtonVisibility();
    }

    prevButton.addEventListener('click', () => moveSlides('prev'));
    nextButton.addEventListener('click', () => moveSlides('next'));

    window.addEventListener('resize', () => {
        slidesToShow = calculateSlidesToShow();
        updateButtonVisibility();
    });

    updateButtonVisibility();
});
