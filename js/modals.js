// Функционал модальных окон
document.addEventListener('DOMContentLoaded', () => {
  // Инициализация модальных окон
  initConsultationModal();
  initProjectModals();

  // Модальное окно с формой заказа консультации
  function initConsultationModal() {
    const consultationModal = document.getElementById('consultationModal');
    if (!consultationModal) return;

    const openButtons = document.querySelectorAll('.about-btn, .portfolio-btn.primary-btn');
    const closeButton = consultationModal.querySelector('.close-modal');
    const form = consultationModal.querySelector('form');

    // Открытие модального окна
    openButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        openModal(consultationModal);
      });
    });

    // Закрытие модального окна
    if (closeButton) {
      closeButton.addEventListener('click', () => {
        closeModal(consultationModal);
      });
    }

    // Закрытие при клике вне модального окна
    consultationModal.addEventListener('click', (e) => {
      if (e.target === consultationModal) {
        closeModal(consultationModal);
      }
    });

    // Обработка отправки формы
    if (form) {
      form.addEventListener('submit', handleFormSubmit);
    }

    // Маска для телефона
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
      phoneInput.addEventListener('input', formatPhoneNumber);
    }
  }

  // Модальные окна проектов
  function initProjectModals() {
    const projectModalContainer = document.getElementById('projectModalContainer');
    if (!projectModalContainer) return;

    const projectModals = document.querySelectorAll('.project-modal');
    const viewButtons = document.querySelectorAll('.view-project-btn');
    const closeButtons = projectModalContainer.querySelectorAll('.close-modal');

    // Открытие модального окна проекта
    viewButtons.forEach(button => {
      button.addEventListener('click', () => {
        const projectId = button.getAttribute('data-project');
        const targetModal = document.getElementById(projectId);

        if (!targetModal) return;

        // Скрываем все модальные окна
        projectModals.forEach(modal => {
          modal.style.display = 'none';
        });

        // Показываем нужное модальное окно
        targetModal.style.display = 'flex';
        openModal(projectModalContainer);
      });
    });

    // Закрытие модальных окон
    closeButtons.forEach(button => {
      button.addEventListener('click', () => {
        closeModal(projectModalContainer);
      });
    });

    // Закрытие при клике вне модального окна
    projectModalContainer.addEventListener('click', (e) => {
      if (e.target === projectModalContainer) {
        closeModal(projectModalContainer);
      }
    });
  }

  // Функция форматирования номера телефона
  function formatPhoneNumber() {
    let value = this.value.replace(/\D/g, '');

    // Добавляем 7 в начало, если пользователь начал вводить с другой цифры
    if (value.length > 0 && value[0] !== '7') {
      value = '7' + value;
    }

    // Ограничиваем длину
    if (value.length > 11) {
      value = value.slice(0, 11);
    }

    // Форматируем номер
    let formattedValue = '';
    if (value.length > 0) {
      formattedValue = '+' + value[0];
    }
    if (value.length > 1) {
      formattedValue += ' (' + value.substring(1, 4);
    }
    if (value.length > 4) {
      formattedValue += ') ' + value.substring(4, 7);
    }
    if (value.length > 7) {
      formattedValue += '-' + value.substring(7, 9);
    }
    if (value.length > 9) {
      formattedValue += '-' + value.substring(9, 11);
    }

    this.value = formattedValue;
  }

  // Обработчик отправки формы
  function handleFormSubmit(e) {
    e.preventDefault();

    const form = this;
    const formData = new FormData(form);

    // Отправка данных на сервер
    fetch(form.getAttribute('action'), {
      method: 'POST',
      body: formData
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      // Обработка успешного ответа
      alert('Спасибо! Ваша заявка отправлена. Мы свяжемся с вами в ближайшее время.');
      form.reset();

      // Закрываем модальное окно
      const modal = form.closest('.modal-overlay');
      if (modal) closeModal(modal);
    })
    .catch(error => {
      // Обработка ошибки
      console.error('Error:', error);
      alert('Произошла ошибка при отправке формы. Пожалуйста, попробуйте позже.');
    });
  }

  // Открытие модального окна
  function openModal(modal) {
    modal.style.display = 'flex';

    // Плавное появление
    setTimeout(() => {
      modal.style.opacity = '1';
    }, 10);

    // Блокировка прокрутки страницы
    document.body.style.overflow = 'hidden';
  }

  // Закрытие модального окна
  function closeModal(modal) {
    modal.style.opacity = '0';

    // Плавное исчезновение
    setTimeout(() => {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
    }, 300);
  }

  // Закрытие модальных окон при нажатии Esc
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const openModals = document.querySelectorAll('.modal-overlay[style*="display: flex"]');
      openModals.forEach(modal => {
        closeModal(modal);
      });
    }
  });
});
