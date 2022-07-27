const canvas1 = new Canvas("canvas1", innerWidth / 2, innerHeight);
const canvas2 = new Canvas("canvas2", innerWidth / 2, innerHeight);

const fov = 90;
const znear = 1;
const zfar = 1000;

const scene1 = new Scene({
  canvas: canvas1,
  fov,
  znear,
  zfar,
});

const scene2 = new Scene({
  canvas: canvas2,
  fov: fov,
  znear,
  zfar,
});

const cube = new Cube(1.5);
const octahedron = new Octahedron(1, 5);
cube.draw(scene1);
octahedron.draw(scene2);
const fps = 20;

setInterval(() => {
  scene1.canvas.clear();
  scene2.canvas.clear();
  draw(cube, scene1);

  draw(octahedron, scene2);
}, 1000 / fps);

function draw(shape, scene) {
  shape
    .rotateX(1 / (fps / 20))
    .rotateY(1.5 / (fps / 20))
    .rotateZ(0.5 / (fps / 20))
    .draw(scene);
}

window.addEventListener("resize", () => {
  scene1.canvas.resize(innerWidth / 2, innerHeight);
  scene2.canvas.resize(innerWidth / 2, innerHeight);
  cube.draw(scene1);
  octahedron.draw(scene2);
});

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}
