document.addEventListener('DOMContentLoaded', function () {
  let emailInput = '';
  const newsletterForm = document.getElementById('newsletter-form');
  const modal = document.getElementById('newsletter-modal');
  const closeModalBtn = document.querySelector('.close-modal');
  const confirmPreferencesBtn = document.getElementById('confirm-preferences');

  newsletterForm.addEventListener('submit', function (e) {
    e.preventDefault();
    emailInput = this.querySelector('input[type="email"]').value;

    if (!isValidEmail(emailInput)) {
      showNotification('Por favor, introduce un email válido', 'error');
      return;
    }

    showModal();
  });

  function showModal() {
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('show');
    document.body.style.overflow = '';
  }

  closeModalBtn.addEventListener('click', closeModal);
  window.addEventListener('click', function (e) {
    if (e.target === modal) {
      closeModal();
    }
  });

  confirmPreferencesBtn.addEventListener('click', function () {
    const interests = Array.from(
      document.querySelectorAll('input[name="modal-interests"]:checked')
    ).map((checkbox) => checkbox.value);

    const frequency = document.querySelector(
      'input[name="frequency"]:checked'
    ).value;

    const preferences = {
      email: emailInput,
      interests: interests,
      frequency: frequency,
      newProducts: document.querySelector('input[name="new-products"]').checked,
      exclusiveOffers: document.querySelector('input[name="exclusive-offers"]')
        .checked,
      events: document.querySelector('input[name="events"]').checked,
    };

    submitNewsletter(preferences);
  });

  // Submit newsletter data
  async function submitNewsletter(data) {
    try {
      // Para usar alguna API
      console.log('Sending newsletter data:', data);

      showNotification('¡Gracias por suscribirte!', 'success');
      closeModal();
      newsletterForm.reset();
    } catch (error) {
      showNotification(
        'Hubo un error al procesar tu solicitud. Por favor, inténtalo de nuevo.',
        'error'
      );
    }
  }

  // Notification helper
  function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.remove();
    }, 3000);
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
});

// Add these styles to your CSS for notifications
const notificationStyles = `
.notification {
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 15px 25px;
    border-radius: 4px;
    color: white;
    z-index: 1100;
    animation: slideIn 0.5s ease;
}

.notification.success {
    background-color: #4CAF50;
}

.notification.error {
    background-color: #f44336;
}

@keyframes slideIn {
    from {
        transform: translateX(100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}
`;

// Add notification styles to the document
const styleSheet = document.createElement('style');
styleSheet.textContent = notificationStyles;
document.head.appendChild(styleSheet);
