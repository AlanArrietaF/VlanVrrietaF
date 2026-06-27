// --- LOGICA DE FRANJAS DEL HERO ---
const slideControls = document.querySelectorAll('.slide-control');
const indicador = document.getElementById('indicador');
const hero = document.getElementById('hero');
const desktopText = document.getElementById('desktop-text');
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

function triggerThreeJsTransition(index) {
    if (window.innerWidth <= 900) {
    // 3. Aplicamos la imagen directamente al fondo del contenedor Hero
    const hero = document.getElementById('hero');
    hero.style.backgroundImage = `url('${imagenesHero[index]}')`;
    }
}



const targetName = ">AlanArrietaF";

// Escuchamos el movimiento del ratón en toda la sección
hero.addEventListener('mousemove', (event) => {
    if (window.innerWidth > 900) {
        const screenWidth = window.innerWidth;
        const clientX = event.clientX;

        // Calculamos el porcentaje de derecha a izquierda
        // Si clientX es el ancho total (derecha), porcentaje es 0.
        // Si clientX es 0 (izquierda), porcentaje es 1 (100%).
        let percentage = 1 - (clientX / screenWidth);

        // Mapeamos ese porcentaje a la cantidad de letras que vamos a mostrar
        let charCount = Math.floor(percentage * targetName.length);
        charCount = Math.max(0, Math.min(charCount, targetName.length));

        if (charCount === 0) {
            desktopText.innerText = "Desliza a la izquierda \u2190";
        } else {
            // Se va revelando el nombre y le agregamos un cursor al final
            desktopText.innerText = targetName.substring(0, charCount) + "_";
        }
    }
});

// --- 2. LÓGICA PARA MÓVILES: EVENTOS TOUCH ---
function handleTouch(event) {
    if (window.innerWidth <= 900) {
        const touch = event.touches[0];
        const clientX = touch.clientX;
        const screenWidth = window.innerWidth;

        let MathIndex = Math.floor((clientX / screenWidth) * imagenesHero.length);
        let newIndex = Math.max(0, Math.min(MathIndex, imagenesHero.length - 1));

        if (newIndex !== currentImageIndex) {
            currentImageIndex = newIndex;
            triggerThreeJsTransition(currentImageIndex);
        }
    }
}

const slideContainer = document.getElementById('slide-container');
if (slideContainer) {
    // Eventos táctiles para el celular
    slideContainer.addEventListener('touchstart', handleTouch, { passive: true });
    slideContainer.addEventListener('touchmove', handleTouch, { passive: true });
}

window.addEventListener('load', () => {
    // Al iniciar, si es celular mostramos la primera foto
    if (window.innerWidth <= 900) {
        currentImageIndex = 0;
        triggerThreeJsTransition(0);
    }
});

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