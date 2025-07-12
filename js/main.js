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

    const workContent = document.querySelector('#work .work-content');
    const carouselWrapper = document.querySelector('.carousel-wrapper');
    const isMobile = window.innerWidth < 1024;

    // --- Dark Mode Logic ---
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const body = document.body;

    if (localStorage.getItem('darkMode') === 'enabled') {
        body.classList.add('dark-mode');
    }

    darkModeToggle.addEventListener('click', () => {
        if (body.classList.contains('dark-mode')) {
            body.classList.remove('dark-mode');
            localStorage.setItem('darkMode', 'disabled');
        } else {
            body.classList.add('dark-mode');
            localStorage.setItem('darkMode', 'enabled');
        }
    });

    // --- Navigation Logic ---
    document.querySelectorAll('header nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
        });
    });

    // --- Content Rendering Logic ---
    if (isMobile) {
        renderProjectList();
    } else {
        renderCarousel();
    }

    function renderProjectList() {
        carouselWrapper.style.display = 'none'; // Hide the entire carousel section

        const projectList = document.createElement('div');
        projectList.classList.add('project-list');

        projects.forEach(project => {
            const projectCard = document.createElement('div');
            projectCard.classList.add('project-card');
            projectCard.innerHTML = `
                <a href="${project.link}" target="_blank">
                    <img src="${project.imageUrl}" alt="${project.name}">
                    <h3>${project.name}</h3>
                </a>
            `;
            projectList.appendChild(projectCard);
        });

        workContent.appendChild(projectList);
    }

    function renderCarousel() {
        const carouselContainer = document.querySelector('.carousel');
        const dotsContainer = document.querySelector('.carousel-dots');
        let currentIndex = 0;
        let isTransitioning = false;
        let touchStartX = 0;
        let touchEndX = 0;

        function changeSlide(newIndex) {
            if (isTransitioning || newIndex === currentIndex) {
                return;
            }
            isTransitioning = true;
            const slide = carouselContainer.querySelector('.carousel-slide');
            slide.classList.add('is-transitioning');

            setTimeout(() => {
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
                slide.classList.remove('is-transitioning');
                
                setTimeout(() => {
                    isTransitioning = false;
                }, 400);
            }, 400);
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

        function handleSwipe() {
            const swipeThreshold = 50;
            if (touchEndX < touchStartX - swipeThreshold) {
                changeSlide((currentIndex + 1) % projects.length);
            } else if (touchEndX > touchStartX + swipeThreshold) {
                changeSlide((currentIndex - 1 + projects.length) % projects.length);
            }
        }

        document.querySelector('.carousel-button.next').addEventListener('click', () => {
            changeSlide((currentIndex + 1) % projects.length);
        });

        document.querySelector('.carousel-button.prev').addEventListener('click', () => {
            changeSlide((currentIndex - 1 + projects.length) % projects.length);
        });

        carouselContainer.addEventListener('touchstart', e => {
            touchStartX = e.changedTouches[0].screenX;
        });

        carouselContainer.addEventListener('touchend', e => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });

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
    }
});
