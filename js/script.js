document.getElementById('login-btn').addEventListener('click', function() {
    document.getElementById('rocket-img').classList.add('rocket-animation');
});
// スライド機能の実装
const slider = document.querySelector('.card-container');
const prevArrow = document.querySelector('.prev');
const nextArrow = document.querySelector('.next');

let scrollAmount = 0;
let cardWidth = document.querySelector('.card').offsetWidth;

// 前のカードへスライドする
prevArrow.addEventListener('click', () => {
    scrollAmount -= cardWidth;
    if (scrollAmount < 0) {
        scrollAmount = 0;
    }
    slider.scrollTo({
        top: 0,
        left: scrollAmount,
        behavior: 'smooth'
    });
});

// 次のカードへスライドする
nextArrow.addEventListener('click', () => {
    scrollAmount += cardWidth;
    if (scrollAmount > slider.scrollWidth - slider.clientWidth) {
        scrollAmount = slider.scrollWidth - slider.clientWidth;
    }
    slider.scrollTo({
        top: 0,
        left: scrollAmount,
        behavior: 'smooth'
    });
});

document.querySelectorAll('.card').forEach(function(card) {
    if (card.textContent.includes('入門')) {
      card.classList.add('intro-card');
    }
  });

