// Функция управления прелоадером
document.addEventListener('DOMContentLoaded', () => {
  // Проверяем, первое ли это посещение сайта
  const isFirstVisit = localStorage.getItem('visited') === null;

  // Элементы прелоадера
  const preloader = document.querySelector('.preloader');
  const progressBar = document.querySelector('.preloader-progress-bar');
  const preloaderText = document.querySelector('.preloader-text');

  if (!preloader) return; // Если прелоадера нет на странице, выходим

  // Имитация загрузки
  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.random() * 10;
    if (progress > 100) progress = 100;

    if (progressBar) {
      progressBar.style.width = `${progress}%`;
    }

    if (preloaderText) {
      preloaderText.textContent = `Убедимся что вы человек... ${Math.floor(progress)}%`;
    }

    if (progress === 100) {
      clearInterval(interval);

      // Анимация исчезновения прелоадера
      setTimeout(() => {
        preloader.style.opacity = '0';

        // Разблокировать прокрутку страницы
        document.body.style.overflow = 'visible';

        // Полностью удалить прелоадер после завершения анимации
        setTimeout(() => {
          preloader.style.display = 'none';
        }, 500);

        // Отмечаем, что пользователь уже посещал сайт
        localStorage.setItem('visited', 'true');

      }, isFirstVisit ? 1000 : 500); // Немного дольше показываем на первом посещении
    }
  }, 100);

  // Загрузка всех изображений для корректной работы прелоадера
  const preloadImages = () => {
    const images = document.querySelectorAll('img');
    let loaded = 0;

    images.forEach(img => {
      const imageObj = new Image();
      imageObj.src = img.src;
      imageObj.onload = () => {
        loaded++;
        if (loaded === images.length) {
          progress = 85; // Ускоряем прогресс после загрузки всех изображений
        }
      };
    });
  };

  preloadImages();
});
