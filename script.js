let apartmentImages = [
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

let featuredImages = [];
let slideIndex = 1;
let carouselTimer;

function filterExistingImages(images, cb) {
    if (!images || !images.length) return cb([]);
    const results = [];
    let remaining = images.length;
    images.forEach((src, idx) => {
        const img = new Image();
        img.onload = () => { results[idx] = src; remaining--; if (remaining === 0) cb(results.filter(Boolean)); };
        img.onerror = () => { remaining--; if (remaining === 0) cb(results.filter(Boolean)); };
        img.src = src;
    });
}

function renderCarousel(images) {
    const slidesContainer = document.getElementById('carouselSlides');
    const dotsContainer = document.getElementById('carouselDots');

    if (!slidesContainer || !dotsContainer) return;

    slidesContainer.innerHTML = images.map((source, index) => `\n        <img class="carousel-slide fade${index === 0 ? ' active' : ''}" src="${source}" alt="Bilete av leiligheta ${index + 1}" loading="eager">\n    `).join('');

    dotsContainer.innerHTML = images.map((_, index) => `\n        <button type="button" class="dot${index === 0 ? ' active' : ''}" aria-label="Vis bilete ${index + 1}" onclick="currentSlide(${index + 1})"></button>\n    `).join('');
}

function renderGallery(images) {
    const galleryGrid = document.getElementById('galleryGrid');
    if (!galleryGrid) return;
    galleryGrid.innerHTML = images.map((source, index) => `\n        <figure class="gallery-item">\n            <img src="${source}" alt="Bilete av leiligheta ${index + 1}" loading="lazy" data-index="${index}">\n        </figure>\n    `).join('');

    // Attach click handlers to open lightbox
    galleryGrid.querySelectorAll('img[data-index]').forEach(img => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', (e) => {
            const idx = Number(e.currentTarget.getAttribute('data-index'));
            openLightbox(idx);
        });
    });
}

function changeSlide(n) { showSlide(slideIndex += n); }
function currentSlide(n) { showSlide(slideIndex = n); }

function showSlide(n) {
    // if lightbox open, use lightbox slides; else use carousel
    const modal = document.getElementById('lightboxModal');
    let slides, dots;
    if (modal && modal.classList.contains('open')) {
        slides = document.querySelectorAll('.lightbox-slide');
        dots = document.querySelectorAll('#lightboxDots .dot');
    } else {
        slides = document.querySelectorAll('.carousel-slide');
        dots = document.querySelectorAll('#carouselDots .dot');
    }

    if (!slides || slides.length === 0) return;

    if (n > slides.length) slideIndex = 1;
    if (n < 1) slideIndex = slides.length;

    slides.forEach(s => s.classList.remove('active'));
    if (dots) dots.forEach(d => d.classList.remove('active'));

    slides[slideIndex - 1].classList.add('active');
    if (dots && dots[slideIndex - 1]) dots[slideIndex - 1].classList.add('active');
}

function startCarousel() { clearInterval(carouselTimer); carouselTimer = setInterval(() => changeSlide(1), 5000); }

function openLightbox(startIndex) {
    const modal = document.getElementById('lightboxModal');
    const slidesContainer = document.getElementById('lightboxSlides');
    const dotsContainer = document.getElementById('lightboxDots');
    if (!modal || !slidesContainer || !dotsContainer) return;

    // Build slides for lightbox from current apartmentImages
    slidesContainer.innerHTML = apartmentImages.map((src, idx) => `\n        <div class="lightbox-slide${idx === startIndex ? ' active' : ''}">\n            <img src="${src}" alt="Bilete ${idx + 1}">\n        </div>\n    `).join('');

    dotsContainer.innerHTML = apartmentImages.map((_, idx) => `\n        <button type="button" class="dot${idx === startIndex ? ' active' : ''}" onclick="showLightboxSlide(${idx + 1})"></button>\n    `).join('');

    slideIndex = startIndex + 1;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    // pause main carousel
    clearInterval(carouselTimer);
    // show the requested lightbox slide explicitly
    showLightboxSlide(slideIndex);
}

function showLightboxSlide(n) {
    const slides = document.querySelectorAll('.lightbox-slide');
    const dots = document.querySelectorAll('#lightboxDots .dot');
    const modal = document.getElementById('lightboxModal');
    if (!slides || slides.length === 0) return;

    if (n > slides.length) slideIndex = 1;
    else if (n < 1) slideIndex = slides.length;
    else slideIndex = n;

    slides.forEach(s => s.classList.remove('active'));
    if (dots) dots.forEach(d => d.classList.remove('active'));

    slides[slideIndex - 1].classList.add('active');
    if (dots && dots[slideIndex - 1]) dots[slideIndex - 1].classList.add('active');
}

function closeLightbox() {
    const modal = document.getElementById('lightboxModal');
    if (!modal) return;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    // resume main carousel
    startCarousel();
}

document.addEventListener('keydown', function(e) {
    const modal = document.getElementById('lightboxModal');
    if (modal && modal.classList.contains('open')) {
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') changeSlide(1);
        if (e.key === 'ArrowLeft') changeSlide(-1);
    }
});

// Initialize after filtering existing images so deleted files are skipped
document.addEventListener('DOMContentLoaded', function() {
    filterExistingImages(apartmentImages, (filtered) => {
        apartmentImages = filtered;
        featuredImages = apartmentImages.slice(0, 8);
        renderCarousel(featuredImages);
        renderGallery(apartmentImages);
        slideIndex = 1;
        showSlide(slideIndex);
        startCarousel();
    });

    // Contact form handling (unchanged)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const message = document.getElementById('message').value;
            const subject = encodeURIComponent('Førespørsel om Geiloveien 3');
            const body = encodeURIComponent(`Namn: ${name}\nE-post: ${email}\nTelefon: ${phone}\n\nMelding:\n${message}`);
            window.location.href = `mailto:virtual.gadgets-1q@icloud.com?subject=${subject}&body=${body}`;
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
window.openLightbox = openLightbox;
window.closeLightbox = closeLightbox;
