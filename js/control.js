const startPoint = { x: 0, y: 0 };
const moves = { x: 0, y: 0 };
const SPACE = " ";
let mousedown = false;
const pressedKeys = [];

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

  scene.camera.turnLeft(moves.x * 0.25);
  scene.camera.turnUp(moves.y * 0.25);
});

window.addEventListener("keydown", (e) => {
  const key = e.key.toLowerCase();
  if (pressedKeys.includes(key)) return;

  pressedKeys.push(key);
});

window.addEventListener("keyup", (e) => {
  const index = pressedKeys.indexOf(e.key.toLowerCase());
  if (index === -1) return;

  pressedKeys.splice(index, 1);
});
