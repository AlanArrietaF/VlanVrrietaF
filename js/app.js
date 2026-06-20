        // 1. Seleccionamos todas las franjas y el texto indicador
        const slideControls = document.querySelectorAll('.slide-control');
        const indicador = document.getElementById('indicator');

        // 2. Variable para almacenar el índice
        let currentImageIndex = -1; // Empezamos en -1 para que la franja 0 dispare el evento

        // Array de colores para simular el cambio de imágenes (reutilicé tu paleta)
        const coloresSimulados = [
            '#050A15', '#3A455C', '#4D5CD6', '#72B5ED', '#F1F9FE',
            '#1a1a2e', '#16213e', '#0f3460', '#e94560', '#533483',
            '#2e0249', '#570a57', '#a91079', '#e81899', '#ffaa00',
            '#00adb5', '#393e46', '#222831'
        ];

        // 3. Añadimos el escuchador a cada franja
        slideControls.forEach(control => {
            control.addEventListener('mouseenter', (event) => {
                const newIndex = parseInt(event.target.getAttribute('data-index'));

                if (newIndex !== currentImageIndex) {
                    currentImageIndex = newIndex;
                    triggerThreeJsTransition(currentImageIndex);
                }
            });
        });

        // 4. La función que se comunica con el entorno visual
        function triggerThreeJsTransition(index) {
            console.log(`Cambiando a la imagen ${index}`);

            // Actualizamos el texto
            indicador.innerText = `Mostrando Imagen ${index}`;

            // Cambiamos el color de fondo temporalmente para simular el efecto
            // En el futuro, aquí le dirías a Three.js que cambie la textura/imagen
            document.body.style.backgroundColor = coloresSimulados[index];

            // Si el fondo es muy claro (índice 4), oscurecemos el texto para que se lea
            if(index === 4) {
                indicador.style.color = 'black';
            } else {
                indicador.style.color = 'white';
            }
        }