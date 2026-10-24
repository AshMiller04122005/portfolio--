const container = document.getElementById('toastContainer');
const template = document.getElementById('toastTemplate');

function showToast(message) {
    // 1. Клонируем шаблон
    const clone = template.content.cloneNode(true);
    
    // 2. Меняем текст
    clone.querySelector('.toast-message').textContent = message;
    
    // 3. Находим крестик и вешаем на него удаление
    const closeBtn = clone.querySelector('.toast-close');
    closeBtn.addEventListener('click', () => {
        const toast = closeBtn.closest('.toast');
        toast.style.animation = 'fadeOut 0.3s forwards';
        setTimeout(() => toast.remove(), 300); // Удаляем через 0.3 сек (после анимации)
    });

    // 4. Добавляем тост на страницу
    container.appendChild(clone);
    
    // 5. Автоматически удаляем через 3 секунды
    setTimeout(() => {
        const toast = container.lastElementChild;
        if (toast) {
            toast.style.animation = 'fadeOut 0.3s forwards';
            setTimeout(() => toast.remove(), 300);
        }
    }, 3000);
}

// Вызов для теста
showToast('Changes applied successfully!');
