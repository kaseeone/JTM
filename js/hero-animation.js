// Hero section image slider
const slides = document.querySelectorAll('.hero-slide');
let currentSlide = 0;
const slideInterval = 5000; // Change slide every 5 seconds
let slideTimer;

function nextSlide() {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
}

// Start the slider
function startSlider() {
    slideTimer = setInterval(nextSlide, slideInterval);
}

// Stop the slider
function stopSlider() {
    clearInterval(slideTimer);
}

// Start the slider
startSlider();

// Optional: Pause slider on hover
const heroSection = document.querySelector('.hero');
heroSection.addEventListener('mouseenter', stopSlider);
heroSection.addEventListener('mouseleave', startSlider); 