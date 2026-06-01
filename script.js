const apartmentImages = [
    'images/image1.jpg',
    'images/image2.jpg',
    'images/image3.jpg',
    'images/image4.jpg',
    'images/IMG_2304.jpg',
    'images/IMG_2305.jpg',
    'images/IMG_2306.jpg',
    'images/IMG_2307.jpg',
    'images/IMG_2308.jpg',
    'images/IMG_2309.jpg',
    'images/IMG_2310.jpg',
    'images/IMG_2311.jpg',
    'images/IMG_2312.jpg',
    'images/IMG_2318.jpg',
    'images/IMG_2319.jpg',
    'images/IMG_2320.jpg',
    'images/IMG_2321.jpg',
    'images/IMG_2322.jpg',
    'images/IMG_4256.jpg',
    'images/IMG_4257.jpg',
    'images/IMG_4258.jpg',
    'images/IMG_4259.jpg',
    'images/IMG_4260.jpg',
    'images/IMG_4261.jpg',
    'images/IMG_4262.jpg',
    'images/IMG_4264.jpg',
    'images/IMG_4265.jpg',
    'images/IMG_4266.jpg',
    'images/IMG_4269.jpg',
    'images/IMG_4270.jpg',
    'images/IMG_4273.jpg',
    'images/IMG_4276.jpg',
    'images/IMG_4277.jpg',
    'images/IMG_4278.jpg',
    'images/IMG_4279.jpg',
    'images/IMG_4280.jpg',
    'images/IMG_4282.jpg',
    'images/IMG_4283.jpg',
    'images/IMG_4284.jpg',
    'images/IMG_4286.jpg',
    'images/IMG_4287.jpg',
    'images/IMG_4290.jpg',
    'images/IMG_4291.jpg',
    'images/IMG_4292.jpg',
    'images/IMG_4293.jpg',
    'images/Romplan.png',
    'images/Romplan3D_N.png',
    'images/Romplan3D_V.png'
];

const featuredImages = apartmentImages.slice(0, 8);
let slideIndex = 1;
let carouselTimer;

function renderCarousel(images) {
    const slidesContainer = document.getElementById('carouselSlides');
    const dotsContainer = document.getElementById('carouselDots');

    if (!slidesContainer || !dotsContainer) {
        return;
    }

    slidesContainer.innerHTML = images.map((source, index) => `
        <img class="carousel-slide fade${index === 0 ? ' active' : ''}" src="${source}" alt="Bilete av leiligheta ${index + 1}" loading="eager">
    `).join('');

    dotsContainer.innerHTML = images.map((_, index) => `
        <button type="button" class="dot${index === 0 ? ' active' : ''}" aria-label="Vis bilete ${index + 1}" onclick="currentSlide(${index + 1})"></button>
    `).join('');
}

function renderGallery(images) {
    const galleryGrid = document.getElementById('galleryGrid');

    if (!galleryGrid) {
        return;
    }

    galleryGrid.innerHTML = images.map((source, index) => `
        <figure class="gallery-item">
            <img src="${source}" alt="Bilete av leiligheta ${index + 1}" loading="lazy">
        </figure>
    `).join('');
}

function changeSlide(n) {
    showSlide(slideIndex += n);
}

function currentSlide(n) {
    showSlide(slideIndex = n);
}

function showSlide(n) {
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.dot');

    if (!slides.length) {
        return;
    }

    if (n > slides.length) {
        slideIndex = 1;
    }

    if (n < 1) {
        slideIndex = slides.length;
    }

    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    slides[slideIndex - 1].classList.add('active');
    if (dots[slideIndex - 1]) {
        dots[slideIndex - 1].classList.add('active');
    }
}

function startCarousel() {
    clearInterval(carouselTimer);
    carouselTimer = setInterval(() => changeSlide(1), 5000);
}

document.addEventListener('DOMContentLoaded', function() {
    renderCarousel(featuredImages);
    renderGallery(apartmentImages);
    showSlide(slideIndex);
    startCarousel();

    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const message = document.getElementById('message').value;

            const subject = encodeURIComponent('Førespørsel om Geiloveien 3');
            const body = encodeURIComponent(
                `Namn: ${name}\n` +
                `E-post: ${email}\n` +
                `Telefon: ${phone}\n\n` +
                `Melding:\n${message}`
            );

            window.location.href = `mailto:bredegronningen@hotmail.com?subject=${subject}&body=${body}`;
            this.reset();
        });
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});

window.changeSlide = changeSlide;
window.currentSlide = currentSlide;
