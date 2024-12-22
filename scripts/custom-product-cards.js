const dots = document.querySelectorAll('.custom-product-cards-dot');
const cards = document.querySelectorAll('.custom-product-card');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
let currentIndex = 0;

function updateActiveCard(index) {
  cards.forEach((card) => card.classList.remove('active'));
  cards[index].classList.add('active');
  currentIndex = index;
}

dots.forEach((dot) => {
  dot.addEventListener('click', () => {
    const index = parseInt(dot.dataset.index);
    updateActiveCard(index);
  });
});

prevButton.addEventListener('click', () => {
  const newIndex = currentIndex === 0 ? cards.length - 1 : currentIndex - 1;
  updateActiveCard(newIndex);
});

nextButton.addEventListener('click', () => {
  const newIndex = currentIndex === cards.length - 1 ? 0 : currentIndex + 1;
  updateActiveCard(newIndex);
});
