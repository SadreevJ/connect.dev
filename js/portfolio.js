// Функционал страницы портфолио
document.addEventListener('DOMContentLoaded', () => {
  // Плавная прокрутка для якорных ссылок
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      if(this.getAttribute('href') !== '#') {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 70,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // Элементы фильтрации портфолио
  const filterButtons = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  // Инициализация фильтрации
  if (filterButtons.length && portfolioItems.length) {
    initializePortfolioFilter();
  }

  // Кнопка "вернуться наверх"
  initializeBackToTop();

  // Инициализация модальных окон проектов
  initializeProjectModals();

  // Анимация появления элементов при прокрутке
  initializeFadeInAnimations();

  /* Функции инициализации */

  function initializePortfolioFilter() {
    // Установка начального состояния фильтра (показать все проекты)
    const initialFilter = 'all';
    filterProjects(initialFilter);

    // Обработчики кликов на кнопки фильтрации
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        const filterValue = button.getAttribute('data-filter');
        filterProjects(filterValue);
      });
    });
  }

  function filterProjects(filterValue) {
    // Обновление активной кнопки
    filterButtons.forEach(btn => {
      if (btn.getAttribute('data-filter') === filterValue) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // Фильтрация элементов портфолио
    portfolioItems.forEach(item => {
      const itemCategory = item.getAttribute('data-category');

      // Если выбраны все проекты или категория соответствует фильтру
      if (filterValue === 'all' || itemCategory === filterValue) {
        item.style.opacity = '0';
        item.style.display = 'block';

        // Задержка для плавного появления
        setTimeout(() => {
          item.style.opacity = '1';
          item.style.transform = 'translateY(0)';
        }, 50);
      } else {
        // Скрываем элементы, которые не соответствуют фильтру
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';

        // После завершения анимации скрываем элемент
        setTimeout(() => {
          item.style.display = 'none';
        }, 300);
      }
    });
  }

  function initializeBackToTop() {
    const backToTopButton = document.getElementById('back-to-top');

    if (backToTopButton) {
      // Показываем/скрываем кнопку в зависимости от положения прокрутки
      window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
          backToTopButton.classList.add('visible');
        } else {
          backToTopButton.classList.remove('visible');
        }
      });

      // Плавная прокрутка наверх при клике
      backToTopButton.addEventListener('click', () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
    }
  }

  function initializeProjectModals() {
    const modalContainer = document.getElementById('projectModalContainer');
    const projectModals = document.querySelectorAll('.project-modal');
    const viewButtons = document.querySelectorAll('.view-project-btn');
    const closeButtons = document.querySelectorAll('.close-modal');

    if (!modalContainer) return;

    // Открытие модальных окон
    viewButtons.forEach(button => {
      button.addEventListener('click', () => {
        const projectId = button.getAttribute('data-project');
        const targetModal = document.getElementById(projectId);

        if (!targetModal) return;

        // Скрываем все модальные окна
        projectModals.forEach(modal => modal.style.display = 'none');

        // Показываем целевое модальное окно
        targetModal.style.display = 'flex';
        modalContainer.style.display = 'flex';

        // Блокируем прокрутку страницы
        document.body.style.overflow = 'hidden';
      });
    });

    // Закрытие модальных окон
    function closeModal() {
      modalContainer.style.display = 'none';
      document.body.style.overflow = 'auto';
    }

    // Закрытие при клике на кнопку "закрыть"
    closeButtons.forEach(button => {
      button.addEventListener('click', closeModal);
    });

    // Закрытие при клике вне модального окна
    modalContainer.addEventListener('click', event => {
      if (event.target === modalContainer) {
        closeModal();
      }
    });

    // Закрытие при нажатии Escape
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') {
        closeModal();
      }
    });
  }

  function initializeFadeInAnimations() {
    // Создаем Intersection Observer для анимации появления элементов
    const fadeElements = document.querySelectorAll('.fade-in-section');

    if (fadeElements.length) {
      const fadeObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            fadeObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.2 });

      // Наблюдаем за элементами
      fadeElements.forEach(element => {
        fadeObserver.observe(element);
      });
    }
  }

  // Галерея в модальном окне - увеличение изображений при клике
  const galleryImages = document.querySelectorAll('.modal-gallery img');
  galleryImages.forEach(img => {
    img.addEventListener('click', () => {
      img.classList.toggle('fullscreen');
      if (img.classList.contains('fullscreen')) {
        img.style.position = 'fixed';
        img.style.top = '50%';
        img.style.left = '50%';
        img.style.transform = 'translate(-50%, -50%)';
        img.style.maxHeight = '90vh';
        img.style.maxWidth = '90vw';
        img.style.width = 'auto';
        img.style.height = 'auto';
        img.style.zIndex = '2000';
      } else {
        img.style.position = '';
        img.style.top = '';
        img.style.left = '';
        img.style.transform = '';
        img.style.maxHeight = '';
        img.style.maxWidth = '';
        img.style.width = '';
        img.style.height = '';
        img.style.zIndex = '';
      }
    });
  });
});
