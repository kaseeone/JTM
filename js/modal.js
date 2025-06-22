document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('serviceModal');
    const closeButton = document.querySelector('.close-button');
    const serviceItems = document.querySelectorAll('.service-item');

    const modalImg = document.getElementById('modal-img');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');

    serviceItems.forEach(item => {
        item.addEventListener('click', () => {
            const imgSrc = item.querySelector('img').src;
            const title = item.dataset.serviceTitle;
            const description = item.dataset.serviceDescription;

            modalImg.src = imgSrc;
            modalTitle.textContent = title;
            modalDescription.textContent = description;

            modal.style.display = 'block';
        });
    });

    closeButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });
}); 