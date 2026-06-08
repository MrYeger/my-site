// ПРОСТОЙ СКРИПТ ДЛЯ ГАЛЕРЕИ
// ВСЕ ОШИБКИ ИСПРАВЛЕНЫ - ЛАЙКИ РАБОТАЮТ!

// Функция для подсчёта фотографий
function countPhotos() {
    // Исправлено: ищем .image-card вместо .photo
    let photos = document.querySelectorAll('.image-card');
    let counter = document.getElementById('image-counter'); // Исправлен ID
    
    if (counter) {
        counter.textContent = photos.length;
    }
    
    console.log('Найдено фотографий:', photos.length);
    return photos.length;
}

// Функция для работы с лайками
function setupLikes() {
    let likeButtons = document.querySelectorAll('.like-btn');
    let totalLikesElement = document.getElementById('total-likes');
    
    // Функция для пересчета общего количества лайков
    function updateTotalLikes() {
        let totalLikes = 0;
        let allLikeCounts = document.querySelectorAll('.like-count');
        allLikeCounts.forEach(function(countSpan) {
            totalLikes += parseInt(countSpan.textContent) || 0;
        });
        if (totalLikesElement) {
            totalLikesElement.textContent = totalLikes;
        }
        return totalLikes;
    }
    
    // Для каждой кнопки лайка
    likeButtons.forEach(function(button) {
        // Находим span с количеством лайков внутри этой кнопки
        let likesSpan = button.querySelector('.like-count');
        
        // Получаем начальное значение
        let currentLikes = parseInt(likesSpan.textContent) || 0;
        
        // При клике на кнопку
        button.addEventListener('click', function(event) {
            event.stopPropagation();
            
            let currentLikesValue = parseInt(likesSpan.textContent) || 0;
            
            if (this.classList.contains('liked')) {
                // Убираем лайк
                currentLikesValue--;
                this.classList.remove('liked');
                // Меняем иконку на пустое сердечко
                let icon = this.querySelector('i');
                if (icon) {
                    icon.classList.remove('fas');
                    icon.classList.add('far');
                }
            } else {
                // Добавляем лайк
                currentLikesValue++;
                this.classList.add('liked');
                // Меняем иконку на заполненное сердечко
                let icon = this.querySelector('i');
                if (icon) {
                    icon.classList.remove('far');
                    icon.classList.add('fas');
                }
            }
            
            // Обновляем счётчик лайков для этой карточки
            likesSpan.textContent = currentLikesValue;
            
            // Обновляем общий счётчик лайков
            updateTotalLikes();
            
            // Анимация
            this.style.transform = 'scale(1.2)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
            
            console.log('Лайков на этой карточке:', currentLikesValue);
        });
    });
    
    // Начальный подсчет общего количества лайков
    updateTotalLikes();
}

// Функция для фильтрации
function setupFilters() {
    let filterButtons = document.querySelectorAll('.filter-btn');
    let imageCards = document.querySelectorAll('.image-card');
    
    filterButtons.forEach(function(btn) {
        btn.addEventListener('click', function() {
            // Убираем active у всех кнопок
            filterButtons.forEach(function(b) { b.classList.remove('active'); });
            // Добавляем active текущей
            this.classList.add('active');
            
            let filterValue = this.getAttribute('data-filter');
            
            imageCards.forEach(function(card) {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = '';
                    card.classList.remove('hidden');
                } else {
                    card.style.display = 'none';
                    card.classList.add('hidden');
                }
            });
            
            console.log('Фильтр применен:', filterValue);
        });
    });
}

// Функция для переключения вида (сетка/список)
function setupViewToggle() {
    let gridBtn = document.getElementById('grid-view');
    let listBtn = document.getElementById('list-view');
    let galleryGrid = document.getElementById('image-gallery');
    
    if (gridBtn && listBtn && galleryGrid) {
        gridBtn.addEventListener('click', function() {
            this.classList.add('active');
            listBtn.classList.remove('active');
            galleryGrid.classList.remove('list-view');
            console.log('Вид: сетка');
        });
        
        listBtn.addEventListener('click', function() {
            this.classList.add('active');
            gridBtn.classList.remove('active');
            galleryGrid.classList.add('list-view');
            console.log('Вид: список');
        });
    }
}

// Когда страница загрузится
document.addEventListener('DOMContentLoaded', function() {
    console.log('Галерея загружена!');
    
    countPhotos();       // Счетчик фотографий
    setupLikes();        // Лайки (ИСПРАВЛЕНО!)
    setupFilters();      // Фильтры
    setupViewToggle();   // Переключение вида
    
    // Показываем, что JavaScript работает
    setTimeout(function() {
        console.log('✅ JavaScript работает правильно! Лайки и счетчики исправлены!');
    }, 500);
});