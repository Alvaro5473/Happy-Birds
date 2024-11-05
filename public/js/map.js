const sprite = document.getElementById('character');
const viewport = document.getElementById('viewport');
const characterId = sprite.dataset.id;

let posX = parseInt(sprite.dataset.positionX);
let posY = parseInt(sprite.dataset.positionY);
const spriteSpeed = 10;

sprite.style.left = posX + 'px';
sprite.style.top = posY + 'px';

async function savePosition() {
  try {
      const response = await fetch('/characters/updatePosition', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              id: characterId,
              x: posX,
              y: posY
          })
      });

      if (!response.ok) {
          throw new Error('Error al guardar la posición');
      }
  } catch (error) {
      console.error('Error:', error);
  }
}

function moveSprite(dx, dy) {
  posX += dx;
  posY += dy;

  // Asegurarse de que el sprite no salga del viewport
  posX = Math.max(0, Math.min(posX, viewport.offsetWidth - sprite.offsetWidth));
  posY = Math.max(0, Math.min(posY, viewport.offsetHeight - sprite.offsetHeight));

  sprite.style.left = posX + 'px';
  sprite.style.top = posY + 'px';
  savePosition();
}

document.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'ArrowUp':
      moveSprite(0, -spriteSpeed);
      break;
    case 'ArrowDown':
      moveSprite(0, spriteSpeed);
      break;
    case 'ArrowLeft':
      sprite.classList.remove('right');
      moveSprite(-spriteSpeed, 0);
      break;
    case 'ArrowRight':
      sprite.classList.add('right');
      moveSprite(spriteSpeed, 0);
      break;
  }
});