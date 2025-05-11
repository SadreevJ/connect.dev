// Плавные переходы между страницами
document.addEventListener('DOMContentLoaded', () => {
  // Плавное появление страницы при загрузке
  document.body.style.opacity = 0;

  // Задержка перед анимацией для уверенности, что страница загружена
  setTimeout(() => {
    document.body.style.transition = 'opacity 0.8s ease';
    document.body.style.opacity = 1;
  }, 50);

  // Обработка кликов по ссылкам для плавного перехода между страницами
  document.querySelectorAll('a').forEach(link => {
    // Игнорируем внешние ссылки, якоря и ссылки с атрибутом target
    if (
      link.hostname === window.location.hostname &&
      !link.href.includes('#') &&
      !link.getAttribute('target')
    ) {
      link.addEventListener('click', e => {
        e.preventDefault();
        const targetUrl = link.href;

        // Плавное исчезновение текущей страницы
        document.body.style.opacity = 0;

        // Задержка перед переходом на новую страницу
        setTimeout(() => {
          window.location.href = targetUrl;
        }, 500);
      });
    }
  });

  // Добавление плавной прокрутки для якорных ссылок
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');

      // Игнорируем пустые якоря
      if (targetId === '#') return;

      e.preventDefault();
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        // Плавная прокрутка к элементу
        window.scrollTo({
          top: targetElement.offsetTop - 70, // Отступ для шапки
          behavior: 'smooth'
        });
      }
    });
  });
});
