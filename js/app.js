// --- LOGICA DE FRANJAS DEL HERO ---
const slideControls = document.querySelectorAll('.slide-control');
const indicador = document.getElementById('indicador');
let currentImageIndex = -1;

const imagenesHero = [
    'assets/VOLCANO.jpg',
    'assets/BANDERA.jpg',
    'assets/CDMX.jpeg',
    'assets/MX.jpeg',
    'assets/GODZILLA.jpg',
    'assets/CANCHA.jpg',
    'assets/CERRO.jpg',
    'assets/VOLCAN.jpg',
    'assets/AULA.jpg',
    /*10*/
    'assets/CU.jpg',
    /* */
    'assets/MONUMENTO.jpg',
    'assets/SALON.jpg',
    'assets/DRUMS.jpg',
    'assets/PECES.jpg',
    'assets/PISTA.jpg',
    'assets/RUN.jpg',
    'assets/ECU.jpg',
    'assets/GALERIA.jpg'
];

// Preload images
imagenesHero.forEach(src => {
    const img = new Image();
    img.src = src;
});

slideControls.forEach(control => {
    control.addEventListener('mouseenter', (event) => {
        const newIndex = parseInt(event.target.getAttribute('data-index'));
        if (newIndex !== currentImageIndex) {
            currentImageIndex = newIndex;
            triggerThreeJsTransition(currentImageIndex);
        }
    });
});

function triggerThreeJsTransition(index) {
    // 3. Aplicamos la imagen directamente al fondo del contenedor Hero
    const hero = document.getElementById('hero');
    hero.style.backgroundImage = `url('${imagenesHero[index]}')`;
}

// --- LÓGICA: ANIMACIÓN DE DISPERSIÓN AL HACER SCROLL ---
const textGrid = document.getElementById('text-grid');
const polaroids = document.querySelectorAll('.polaroid');

window.addEventListener('scroll', () => {
        // Obtenemos la posición de las cajas de texto relativas a la pantalla
        const rect = textGrid.getBoundingClientRect();

        // Definimos cuándo empieza y termina la animación
        // Empieza cuando el texto entra en el 90% inferior de la pantalla
        const triggerPoint = window.innerHeight * 0.5;
        // Termina (máxima dispersión) cuando el texto llega al 40% de la pantalla
        const endPoint = window.innerHeight * 0.2;

        let progress = 0;
            if (rect.top < triggerPoint) {
                // Calculamos un valor de 0 a 1 dependiendo de qué tanto hemos bajado
                progress = (triggerPoint - rect.top) / (triggerPoint - endPoint);
                progress = Math.max(0, Math.min(1, progress)); // Forzamos que se mantenga entre 0 y 1
            }

            // Aplicamos el progreso a las variables CSS de cada tarjeta
            polaroids.forEach(polaroid => {
                const isLeft = polaroid.dataset.side === 'left';
                const isTop = polaroid.dataset.position === 'top';

                // Valores máximos de separación (ajusta estos si quieres que se separen más o menos)
                const targetX = isLeft ? -35 : 35; // vw (Viewport Width - Ancho de pantalla)
                const targetY = isTop ? 0 : 250;   // px (Píxeles hacia abajo)

                // Inyectamos el valor calculado en las variables CSS
                polaroid.style.setProperty('--spread-x', `${progress * targetX}vw`);
                polaroid.style.setProperty('--spread-y', `${progress * targetY}px`);
        });
});

// --- LÓGICA: GIRO DE TARJETAS 3D (PORTFOLIO) ---
const flipCards = document.querySelectorAll('.flip-card');
    flipCards.forEach(card => {
        card.addEventListener('click', () => {
            // Cada vez que das click en la tarjeta, "prende" o "apaga" el giro
            card.classList.toggle('is-flipped');
    });
});