document.addEventListener('DOMContentLoaded', () => {
    const projects = [
        { name: 'Slider-Carousel', link: 'https://inquisitive-sprite-a6ef8a.netlify.app/', imageUrl: 'assets/slider-carousel.png' },
        { name: 'TafaMadrid', link: 'https://spontaneous-souffle-b44c98.netlify.app/', imageUrl: 'assets/tafamadrid.png' },
        { name: 'Random-Colors', link: 'https://randomcolor02.netlify.app/', imageUrl: 'assets/random-colors.png' },
        { name: 'Lebomar', link: 'https://melodic-tiramisu-841958.netlify.app/', imageUrl: 'assets/lebomar.png' },
        { name: 'Menu de comida', link: 'https://curious-lily-ab5e20.netlify.app/', imageUrl: 'assets/menu-comida.png' },
        { name: 'Calculadora de Gastos', link: 'https://radiant-pavlova-b62f1f.netlify.app/', imageUrl: 'assets/calculadora-gastos.png' },
        { name: 'CriptoMonedas', link: 'https://rococo-lebkuchen-99ae94.netlify.app/', imageUrl: 'assets/criptomonedas.png' }
    ];

    const carouselContainer = document.querySelector('.carousel');
    const dotsContainer = document.querySelector('.carousel-dots');
    let currentIndex = 0;
    let isTransitioning = false;

    function changeSlide(newIndex) {
        if (isTransitioning || newIndex === currentIndex) {
            return; // Evita clicks rápidos o cambios innecesarios
        }
        isTransitioning = true;

        const slide = carouselContainer.querySelector('.carousel-slide');
        
        // 1. Inicia la transición de salida
        slide.classList.add('is-transitioning');

        // 2. Espera a que termine la transición de salida
        setTimeout(() => {
            // 3. Actualiza el contenido del slide mientras está invisible
            currentIndex = newIndex;
            const project = projects[currentIndex];
            const img = slide.querySelector('img');
            const h3 = slide.querySelector('h3');
            const a = slide.querySelector('a');

            img.src = project.imageUrl;
            img.alt = project.name;
            h3.textContent = project.name;
            a.href = project.link;
            
            updateDots();

            // 4. Inicia la transición de entrada
            slide.classList.remove('is-transitioning');
            
            // 5. Libera el bloqueo después de que la animación de entrada termine
            setTimeout(() => {
                isTransitioning = false;
            }, 400);

        }, 400); // Esta duración debe coincidir con la de la transición en CSS
    }

    function createDots() {
        dotsContainer.innerHTML = '';
        projects.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.classList.add('carousel-dot');
            dot.addEventListener('click', () => changeSlide(index));
            dotsContainer.appendChild(dot);
        });
    }

    function updateDots() {
        const dots = dotsContainer.querySelectorAll('.carousel-dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    // --- Event Listeners ---
    document.querySelector('.carousel-button.next').addEventListener('click', () => {
        changeSlide((currentIndex + 1) % projects.length);
    });

    document.querySelector('.carousel-button.prev').addEventListener('click', () => {
        changeSlide((currentIndex - 1 + projects.length) % projects.length);
    });

    document.querySelectorAll('header nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
        });
    });

    // --- Renderizado Inicial ---
    function initialRender() {
        const project = projects[currentIndex];
        carouselContainer.innerHTML = `
            <div class="carousel-slide">
                <a href="${project.link}" target="_blank">
                    <img src="${project.imageUrl}" alt="${project.name}">
                    <h3>${project.name}</h3>
                </a>
            </div>
        `;
        createDots();
        updateDots();
    }

    initialRender();
});
