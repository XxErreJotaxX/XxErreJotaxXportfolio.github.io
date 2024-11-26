// Função para abrir e fechar o menu
function toggleMenu() {
  const navLinks = document.querySelector('.nav-links');
  navLinks.classList.toggle('active');
}

// Evento para ativar o menu ao clicar no ícone hambúrguer
document.querySelector('.hamburger').addEventListener('click', toggleMenu);

// Calcula a largura da imagem + gap entre elas
const imageWidth = (150 + 15) * 2; // Avança duas imagens


document.querySelector('.left-arrow').addEventListener('click', function() {
    document.querySelector('.scroll-gallery').scrollBy({
        left: -imageWidth,
        behavior: 'smooth'
    });
});

document.querySelector('.right-arrow').addEventListener('click', function() {
    document.querySelector('.scroll-gallery').scrollBy({
        left: imageWidth,
        behavior: 'smooth'
    });
});

const scrollGallery = document.querySelector('.scroll-gallery');

let isDown = false;
let startX;
let scrollLeft;

scrollGallery.addEventListener('mousedown', (e) => {
    isDown = true;
    scrollGallery.classList.add('active');
    startX = e.pageX - scrollGallery.offsetLeft;
    scrollLeft = scrollGallery.scrollLeft;
});

scrollGallery.addEventListener('mouseleave', () => {
    isDown = false;
    scrollGallery.classList.remove('active');
});

scrollGallery.addEventListener('mouseup', () => {
    isDown = false;
    scrollGallery.classList.remove('active');
});

scrollGallery.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - scrollGallery.offsetLeft;
    const walk = (x - startX) * 2; // Velocidade do arraste
    scrollGallery.scrollLeft = scrollLeft - walk;
});

const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');

// Abre a imagem em tela cheia ao clicar
scrollGallery.addEventListener('click', (e) => {
    if (e.target.tagName === 'IMG') { // Verifica se clicou em uma imagem
        lightbox.style.display = 'flex';
        lightboxImg.src = e.target.src;
    }
});

// Fecha o lightbox ao clicar fora da imagem
lightbox.addEventListener('click', () => {
    lightbox.style.display = 'none';
});
