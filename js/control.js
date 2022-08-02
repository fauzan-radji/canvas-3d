const startPoint = { x: 0, y: 0 };
const moves = { x: 0, y: 0 };
const SPACE = " ";
let mousedown = false;

window.addEventListener("mousedown", (e) => {
  startPoint.x = e.clientX;
  startPoint.y = e.clientY;
  moves.x = 0;
  moves.y = 0;
  mousedown = true;
});

window.addEventListener("mouseup", (e) => {
  mousedown = false;
});

window.addEventListener("mousemove", (e) => {
  if (!mousedown) return;
  moves.x = (e.clientX - startPoint.x) / 2;
  moves.y = (e.clientY - startPoint.y) / 2;

  startPoint.x = e.clientX;
  startPoint.y = e.clientY;

  scene.camera.turnLeft(moves.x * 0.5);
  scene.camera.turnUp(moves.y * 0.5);

  draw();
});

window.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "W":
    case "w":
      scene.camera.forward(0.1);
      break;

    case "S":
    case "s":
      scene.camera.backward(0.1);
      break;

    case "A":
    case "a":
      scene.camera.left(0.1);
      break;

    case "D":
    case "d":
      scene.camera.right(0.1);
      break;

    case SPACE:
      scene.camera.up(0.1);
      break;

    case "Shift":
      scene.camera.down(0.1);
      break;

    case "ArrowLeft":
      scene.camera.turnLeft(1);
      break;

    case "ArrowRight":
      scene.camera.turnRight(1);
      break;

    case "ArrowUp":
      scene.camera.turnUp(1);
      break;

    case "ArrowDown":
      scene.camera.turnDown(1);
      break;
  }

  draw();
});
