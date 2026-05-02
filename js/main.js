// Language switcher
let currentLang = localStorage.getItem('lang') || 'ru';

function setLang(lang) {
    currentLang = lang;
    document.querySelectorAll('[data-ru]').forEach(el => {
        const text = el.getAttribute('data-' + lang);
        if (text) el.innerHTML = text;
    });
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });
    document.documentElement.lang = lang === 'uz' ? 'uz-UZ' : 'ru-RU';
    localStorage.setItem('lang', lang);
}

document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => setLang(btn.dataset.lang));
});

setLang(currentLang);

// Sticky header
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

// Burger menu
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');

burger.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    burger.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
});

nav.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('open');
        burger.classList.remove('open');
        document.body.style.overflow = '';
    });
});

// Lightbox
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');

function openLightbox(src) {
    lightboxImg.src = src;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
}

document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeLightbox();
});

// Scroll animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });

document.querySelectorAll(
    '.stats__item, .about__content, .about__image, ' +
    '.gallery__item, .plans__spec, .plans__cta, ' +
    '.location__content, .location__image'
).forEach((el, i) => {
    el.classList.add('fade-up');
    el.style.transitionDelay = (i % 4) * 0.08 + 's';
    observer.observe(el);
});
