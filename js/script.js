const canvas = new Canvas({
  id: "canvas",
  width: innerWidth,
  height: innerHeight - 51,
});

const fov = 90;
const znear = 0.1;
const zfar = 1000;
const vCamera = new Vector(0, 0, 0);
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

const object = Shape3d.fromString({ str: AXIS, size: 0.5 });
scene.addObjects(object);

// step back a lil bit before rendering
scene.camera.z -= 7;
scene.render();
const fps = 20;

// setInterval(() => {
//   for (const object of scene.objects)
//     object
//       .rotateX(1 / (fps / 20))
//       .rotateY(1.5 / (fps / 20))
//       .rotateZ(0.5 / (fps / 20));

//   scene.render();
// }, 1000 / fps);

window.addEventListener("resize", () => {
  scene.resize(innerWidth, innerHeight - 51);
  for (const object of scene.objects) draw(object);
});

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}
