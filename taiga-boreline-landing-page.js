
  //                             mobile version

const track = document.querySelector('.carousel-track');
const prevBtn = document.querySelector('.carousel-arrow-prev');
const nextBtn = document.querySelector('.carousel-arrow-next');
const dots = document.querySelectorAll('.carousel-dot');
const slides = document.querySelectorAll('.carousel-slide');

// ==========================================
// 2. СТРЕЛКИ (Влево / Вправо)
// ==========================================
// Вычисляем, на сколько пикселей скроллить (ширина карточки + отступ)
function getScrollAmount() {
    const slide = track.querySelector('.carousel-slide');
    const gap = parseInt(getComputedStyle(track).gap) || 0;
    return slide.offsetWidth + gap;
}

nextBtn.addEventListener('click', () => {
    track.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
});

prevBtn.addEventListener('click', () => {
    track.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
});

// ==========================================
// 3. ТОЧКИ (Клик по точке)
// ==========================================
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        // Берем карточку с таким же индексом и скроллим к ней
        slides[index].scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'center' // Выравниваем по центру
        });
    });
});

// ==========================================
// 4. АВТО-ПЕРЕКЛЮЧЕНИЕ ТОЧЕК ПРИ СВАЙПЕ
// ==========================================
// Используем IntersectionObserver, чтобы видеть, какая карточка сейчас в центре
const observerOptions = {
    root: track, // Следим только внутри контейнера
    threshold: 0.6 // Карточка должна быть видна на 60%
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const index = entry.target.dataset.index;
            
            // Убираем активный класс у всех точек
            dots.forEach(dot => dot.classList.remove('is-active'));
            // Добавляем активный класс нужной точке
            if (dots[index]) {
                dots[index].classList.add('is-active');
            }
        }
    });
}, observerOptions);

// Говорим наблюдателю следить за каждой карточкой
slides.forEach(slide => observer.observe(slide));