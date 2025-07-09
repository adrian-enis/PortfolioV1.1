particlesJS('particles-js', {
  "particles": {
    "number": {
      "value": 60, // Aumentado para mayor visibilidad
      "density": {
        "enable": true,
        "value_area": 800
      }
    },
    "color": {
      "value": "#cccccc" // Color fijo, un gris claro
    },
    "shape": {
      "type": "circle", // Mantener círculo, la deformación vendrá de tamaño/opacidad aleatoria
    },
    "opacity": {
      "value": 0.8, // Ligeramente más opaco
      "random": true,
      "anim": {
        "enable": false,
      }
    },
    "size": {
      "value": 6, // Tamaño un poco más grande
      "random": true,
      "anim": {
        "enable": false,
      }
    },
    "line_linked": {
      "enable": false // Sin líneas
    },
    "move": {
      "enable": true,
      "speed": 0.8, // Movimiento más lento
      "direction": "none", // Movimiento en todas direcciones
      "random": true, // Movimiento aleatorio
      "straight": false,
      "out_mode": "out",
      "bounce": false,
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": {
        "enable": true,
        "mode": "bubble" // Efecto de burbuja al pasar el ratón
      },
      "onclick": {
        "enable": false,
      },
      "resize": true
    },
    "modes": {
      "bubble": {
        "distance": 200,
        "size": 8,
        "duration": 2,
        "opacity": 0.8,
        "speed": 3
      },
    }
  },
  "retina_detect": true
});