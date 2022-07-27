const canvas1 = new Canvas({
  id: "canvas1",
  width: innerWidth / 2,
  height: innerHeight - 51,
});

const canvas2 = new Canvas({
  id: "canvas2",
  width: innerWidth / 2,
  height: innerHeight - 51,
});

const fov = 90;
const znear = 0.1;
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

const openfile1 = document.getElementById("canvas1-open");
const openfile2 = document.getElementById("canvas2-open");

const objects = [];

openfile1.addEventListener("click", async (e) => {
  const object = await Shape3d.fromFile();

  objects.push(object);
});

const cube = new Cube(3);
const octahedron = new Octahedron(2);

objects.push(cube, octahedron);

for (const object of objects) draw(object);

const fps = 20;

setInterval(() => {
  scene1.canvas.clear();
  scene2.canvas.clear();
  for (const object of objects) {
    object
      .rotateX(1 / (fps / 20))
      .rotateY(1.5 / (fps / 20))
      .rotateZ(0.5 / (fps / 20));
    draw(object);
  }
}, 1000 / fps);

function draw(shape) {
  shape.translateZ(7).draw(scene1).draw(scene2).translateZ(-7);
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
