document.addEventListener('DOMContentLoaded', function() {
  // Проверка размера экрана при загрузке
  const isMobile = window.innerWidth <= 768;

  // Находим навигационное меню
  const navContainer = document.querySelector('.nav-container');

  // Если мы на мобильной версии, инициализируем мобильное меню
  if (isMobile) {
    // Добавляем класс для мобильного меню
    navContainer.classList.add('nav-container-mobile');

    // Создаем кнопку мобильного меню с улучшенным дизайном
    const mobileMenuButton = document.createElement('button');
    mobileMenuButton.classList.add('mobile-menu-toggle');
    mobileMenuButton.innerHTML = '<span></span><span></span><span></span>';
    mobileMenuButton.setAttribute('aria-label', 'Открыть меню');
    mobileMenuButton.setAttribute('aria-expanded', 'false');

    // Добавляем кнопку в шапку
    const headerContainer = document.querySelector('.header-container');
    headerContainer.appendChild(mobileMenuButton);

    // Улучшенная анимация при наведении
    mobileMenuButton.addEventListener('mouseenter', function() {
      if (!this.classList.contains('active')) {
        this.querySelectorAll('span').forEach((span, index) => {
          span.style.backgroundColor = 'var(--accent-color)';
          // Добавляем небольшую анимацию при наведении
          span.style.transform = `translateX(${3 * (index - 1)}px)`;
        });
      }
    });

    mobileMenuButton.addEventListener('mouseleave', function() {
      if (!this.classList.contains('active')) {
        this.querySelectorAll('span').forEach(span => {
          span.style.backgroundColor = '';
          span.style.transform = '';
        });
      }
    });

    // Предотвращаем прокрутку страницы когда меню открыто
    function toggleBodyScroll(disableScroll) {
      if (disableScroll) {
        // Запоминаем текущую позицию прокрутки
        const scrollY = window.scrollY;
        document.body.style.position = 'fixed';
        document.body.style.top = `-${scrollY}px`;
        document.body.style.width = '100%';
        document.body.dataset.scrollPosition = scrollY;
      } else {
        // Восстанавливаем позицию прокрутки
        const scrollY = parseInt(document.body.dataset.scrollPosition || '0');
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        window.scrollTo(0, scrollY);
      }
    }

    // Обработчик клика по кнопке меню с анимацией
    mobileMenuButton.addEventListener('click', function() {
      const isExpanded = this.getAttribute('aria-expanded') === 'true';

      // Переключаем состояние меню
      this.setAttribute('aria-expanded', (!isExpanded).toString());
      navContainer.classList.toggle('nav-active');
      this.classList.toggle('active');

      // Анимация линий бургера
      this.querySelectorAll('span').forEach(span => {
        span.style.backgroundColor = 'var(--accent-color)';
      });

      // Меняем aria-label в зависимости от состояния
      this.setAttribute('aria-label', !isExpanded ? 'Закрыть меню' : 'Открыть меню');

      // Блокируем прокрутку страницы при открытом меню
      toggleBodyScroll(!isExpanded);
    });

    // Закрываем меню при клике на пункт меню с анимацией
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        // Если ссылка ведет на текущую страницу, предотвращаем переход
        // и плавно скроллим к нужной секции
        const href = this.getAttribute('href');
        if (href.startsWith('#') && href !== '#') {
          e.preventDefault();
          const targetSection = document.querySelector(href);

          if (targetSection) {
            // Закрываем меню
            navContainer.classList.remove('nav-active');
            mobileMenuButton.classList.remove('active');
            mobileMenuButton.setAttribute('aria-expanded', 'false');
            mobileMenuButton.setAttribute('aria-label', 'Открыть меню');

            // Возвращаем состояние кнопки
            mobileMenuButton.querySelectorAll('span').forEach(span => {
              span.style.backgroundColor = '';
            });

            // Разблокируем прокрутку
            toggleBodyScroll(false);

            // Немного задержки для анимации закрытия меню
            setTimeout(() => {
              // Плавно скроллим к секции
              targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
              });
            }, 300);
          }
        } else {
          // Стандартное поведение для ссылок на другие страницы
          navContainer.classList.remove('nav-active');
          mobileMenuButton.classList.remove('active');
          mobileMenuButton.setAttribute('aria-expanded', 'false');
          mobileMenuButton.setAttribute('aria-label', 'Открыть меню');

          // Возвращаем состояние кнопки
          mobileMenuButton.querySelectorAll('span').forEach(span => {
            span.style.backgroundColor = '';
          });

          toggleBodyScroll(false);
        }
      });
    });

    // Добавляем обработчик клика вне меню для его закрытия
    document.addEventListener('click', function(event) {
      if (navContainer.classList.contains('nav-active') &&
          !navContainer.contains(event.target) &&
          !mobileMenuButton.contains(event.target)) {
        navContainer.classList.remove('nav-active');
        mobileMenuButton.classList.remove('active');
        mobileMenuButton.setAttribute('aria-expanded', 'false');

        // Возвращаем состояние кнопки
        mobileMenuButton.querySelectorAll('span').forEach(span => {
          span.style.backgroundColor = '';
        });

        mobileMenuButton.setAttribute('aria-label', 'Открыть меню');
        toggleBodyScroll(false);
      }
    });

    // Добавляем обработчик клавиши ESC для закрытия меню
    document.addEventListener('keydown', function(event) {
      if (event.key === 'Escape' && navContainer.classList.contains('nav-active')) {
        navContainer.classList.remove('nav-active');
        mobileMenuButton.classList.remove('active');
        mobileMenuButton.setAttribute('aria-expanded', 'false');
        mobileMenuButton.setAttribute('aria-label', 'Открыть меню');
        toggleBodyScroll(false);
      }
    });
  }

  // Плавная обработка изменения размера окна с дебаунсом
  let resizeTimer;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
      const currentIsMobile = window.innerWidth <= 768;

      // Если размер окна изменился с десктопа на мобильный или наоборот
      if (currentIsMobile !== isMobile) {
        // Перезагружаем страницу для корректной инициализации меню
        location.reload();
      }
    }, 250); // Задержка для предотвращения множественных вызовов
  });
});
