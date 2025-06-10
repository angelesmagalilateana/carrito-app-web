document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('contact-modal');
    const openBtn = document.getElementById('open-contact');
    const closeBtn = document.getElementById('close-contact');
  
    if (openBtn && closeBtn && modal) {
      openBtn.addEventListener('click', (e) => {
        e.preventDefault();
        modal.style.display = 'flex';
      });
  
      closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
      });
  
            modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.style.display = 'none';
        }
      });
    }
  });
  