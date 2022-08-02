const canvas = new Canvas({
  id: "canvas",
  width: innerWidth,
  height: innerHeight - 51,
});

const fov = 90;
const znear = 0.1;
const zfar = 1000;
const vCamera = new Camera(0, 0, 0);
const vLightDirection = new Vector(0, 0, -1).normalize();

const scene = new Scene({
  canvas: canvas,
  fov,
  znear,
  zfar,
  camera: vCamera,
  lightDirection: vLightDirection,
});

const openfileButton = document.getElementById("open-file");

openfileButton.addEventListener("click", async (e) => {
  const object = await Shape3d.fromFile();

  scene.addObjects(object);
  draw();
});

const object = Shape3d.fromString({ str: MOUNTAINS, size: 0.5 });
scene.addObjects(object);

// go up a lil bit before rendering
scene.camera.up(5);
draw();
// const fps = 10;

// setInterval(() => {
//   for (const object of scene.objects)
//     object
//       .rotateX(1 / (fps / 20))
//       .rotateY(1.5 / (fps / 20))
//       .rotateZ(0.5 / (fps / 20));

//   draw();
// }, 1000 / fps);

window.addEventListener("resize", () => {
  scene.resize(innerWidth, innerHeight - 51);
  draw();
});

function draw() {
  scene.render();
}

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}
