const startPoint = { x: 0, y: 0 };
const moves = { x: 0, y: 0 };
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

  scene1.canvas.clear();
  scene2.canvas.clear();

  // rotate the cube
  cube.rotateY(moves.x).rotateX(-moves.y);
  octahedron.rotateY(moves.x).rotateX(-moves.y);

  draw(cube, scene1);
  draw(octahedron, scene2);
});
