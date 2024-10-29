let mapWidth = 0;
let mapHeight = 0;
let viewportWidth = 700;
let viewportHeight = 700;
let characterWidth = 100;
let characterHeight = 100;
let scale = 2;

function initializeMap() {
    const map = document.getElementById('map');
    mapWidth = map.naturalWidth * scale;
    mapHeight = map.naturalHeight * scale;
}

document.addEventListener('DOMContentLoaded', () => {
    const map = document.getElementById('map');
    let posX = 0;
    let posY = 0;
    const speed = 5;
    const keys = {
        up: false,    // W o ArrowUp
        left: false,  // A o ArrowLeft
        down: false,  // S o ArrowDown
        right: false  // D o ArrowRight
    };

    // Función para manejar el keydown
    function handleKeyDown(e) {
        switch(e.key.toLowerCase()) {
            case 'w':
            case 'arrowup':
                keys.up = true;
                break;
            case 'a':
            case 'arrowleft':
                keys.left = true;
                break;
            case 's':
            case 'arrowdown':
                keys.down = true;
                break;
            case 'd':
            case 'arrowright':
                keys.right = true;
                break;
        }
    }

    // Función para manejar el keyup
    function handleKeyUp(e) {
        switch(e.key.toLowerCase()) {
            case 'w':
            case 'arrowup':
                keys.up = false;
                break;
            case 'a':
            case 'arrowleft':
                keys.left = false;
                break;
            case 's':
            case 'arrowdown':
                keys.down = false;
                break;
            case 'd':
            case 'arrowright':
                keys.right = false;
                break;
        }
    }

    // Registrar los event listeners
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    // Prevenir el desplazamiento de la página con las flechas
    document.addEventListener('keydown', (e) => {
        if(['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 
            'Space'].indexOf(e.code) > -1) {
            e.preventDefault();
        }
    });

    // Función para verificar límites
    function checkBounds(newX, newY) {
        // Límite derecho e izquierdo
        if (newX > viewportWidth / 4 - characterWidth / 4) newX = viewportWidth / 4 - characterWidth / 4;
        if (newX < viewportWidth / 4 - mapWidth + characterWidth / 4) newX = viewportWidth / 4 - mapWidth + characterWidth / 4;

        // Límite superior e inferior
        if (newY > viewportHeight / 4 - characterHeight / 4) newY = viewportHeight / 4 - characterHeight / 4;
        if (newY < viewportHeight / 4 - mapHeight + characterHeight / 4) newY = viewportHeight / 4 - mapHeight + characterHeight / 4;

        return { x: newX, y: newY };
    }

    // Función de actualización del movimiento
    function updatePosition() {
        let newX = posX;
        let newY = posY;

        if (keys.up) newY += speed;
        if (keys.down) newY -= speed;
        if (keys.left) newX += speed;
        if (keys.right) newX -= speed;

        // Verificar límites antes de actualizar la posición
        const boundedPosition = checkBounds(newX, newY);
        posX = boundedPosition.x;
        posY = boundedPosition.y;

        map.style.transform = `translate(${posX}px, ${posY}px) scale(${scale})`;
        requestAnimationFrame(updatePosition);
    }

    // Iniciar la animación
    updatePosition();
});