const canvas1 = new Canvas("canvas1", innerWidth / 2, innerHeight);
const canvas2 = new Canvas("canvas2", innerWidth / 2, innerHeight);

const fov = 90;
const znear = 1;
const zfar = 1000;
const vCamera = new Vector(0, 0, 0);
const vLightDirection = new Vector(0, 0, -1).normalize();

const scene1 = new Scene({
  canvas: canvas1,
  fov,
  znear,
  zfar,
  camera: vCamera,
  lightDirection: vLightDirection,
});

const scene2 = new Scene({
  canvas: canvas2,
  fov: fov,
  znear,
  zfar,
  camera: vCamera,
  lightDirection: vLightDirection,
});

const cube = new Cube(1.5);
const octahedron = new Octahedron(1);
cube.translateZ(3).draw(scene1).translateZ(-3);
octahedron.translateZ(3).draw(scene2).translateZ(-3);
const fps = 20;

setInterval(() => {
  scene1.canvas.clear();
  scene2.canvas.clear();
  rotate(cube);
  rotate(octahedron);

  draw(cube, scene1);
  draw(octahedron, scene2);
}, 1000 / fps);

function draw(shape, scene) {
  shape.translateZ(3).draw(scene).translateZ(-3);
}

function rotate(shape) {
  shape
    .rotateX(1 / (fps / 20))
    .rotateY(1.5 / (fps / 20))
    .rotateZ(0.5 / (fps / 20));
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
