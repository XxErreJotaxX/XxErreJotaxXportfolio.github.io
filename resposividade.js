// --- MENU MOBILE ---
function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
}

document.querySelector('.hamburger').addEventListener('click', toggleMenu);

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        document.querySelector('.nav-links').classList.remove('active');
    });
});

// --- GALERIA (Scroll e Arraste) ---
const scrollGallery = document.querySelector('.scroll-gallery');
let isDown = false;
let startX;
let scrollLeft;

scrollGallery.querySelectorAll('img').forEach(img => {
    img.addEventListener('dragstart', (e) => e.preventDefault());
});

scrollGallery.addEventListener('mousedown', (e) => {
    isDown = true;
    scrollGallery.style.cursor = 'grabbing';
    scrollGallery.style.scrollBehavior = 'auto'; 
    startX = e.pageX - scrollGallery.offsetLeft;
    scrollLeft = scrollGallery.scrollLeft;
});

scrollGallery.addEventListener('mouseleave', () => {
    isDown = false;
    scrollGallery.style.cursor = 'grab';
});

scrollGallery.addEventListener('mouseup', () => {
    isDown = false;
    scrollGallery.style.cursor = 'grab';
});

scrollGallery.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - scrollGallery.offsetLeft;
    const walk = (x - startX) * 2; 
    scrollGallery.scrollLeft = scrollLeft - walk;
});

const scrollAmount = 300; 
document.querySelector('.left-arrow').addEventListener('click', () => {
    scrollGallery.style.scrollBehavior = 'smooth';
    scrollGallery.scrollLeft -= scrollAmount;
});

document.querySelector('.right-arrow').addEventListener('click', () => {
    scrollGallery.style.scrollBehavior = 'smooth';
    scrollGallery.scrollLeft += scrollAmount;
});

// --- LIGHTBOX ---
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');

scrollGallery.addEventListener('click', (e) => {
    if (e.target.tagName === 'IMG' && !isDown) {
        lightbox.classList.add('active');
        lightboxImg.src = e.target.src;
    }
});

lightbox.addEventListener('click', () => {
    lightbox.classList.remove('active');
});

// --- ANIMAÇÃO REATIVIVA DAS BARRAS DE XP ---
const skillObserverOptions = { 
    threshold: 0.3 // Dispara quando 30% da seção de skills estiver visível
};

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const fills = entry.target.querySelectorAll('.skill-fill');
            fills.forEach(fill => {
                const targetWidth = fill.getAttribute('data-width');
                // Aplica a largura final para iniciar a transição do CSS
                fill.style.width = targetWidth; 
            });
            // Opcional: Se quiser que a animação só aconteça UMA VEZ, remova o comentário abaixo:
            // skillObserver.unobserve(entry.target);
        } else {
            // Opcional: Reseta as barras para 0% ao sair da tela para re-animar no próximo scroll
            const fills = entry.target.querySelectorAll('.skill-fill');
            fills.forEach(fill => { fill.style.width = '0%'; });
        }
    });
}, skillObserverOptions);

const skillsContainer = document.querySelector('.skills-container');
if (skillsContainer) {
    // Garante que comecem em 0 antes de serem observadas
    skillsContainer.querySelectorAll('.skill-fill').forEach(f => f.style.width = '0%');
    skillObserver.observe(skillsContainer);
}

// --- EFEITO DE SOM ---
const playSelectSound = () => {
    const audio = new Audio('https://www.soundjay.com/buttons/sounds/button-37a.mp3'); 
    audio.volume = 0.1; 
    audio.play().catch(err => console.log("Áudio aguardando interação do usuário."));
};

document.querySelectorAll('.select-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        if(!btn.classList.contains('locked')) {
            playSelectSound();
        }
    });
});