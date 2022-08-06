const openfileButton = document.getElementById("open-file");

const camera = new Camera(0, 0, 0);
const lightDirection = new Vector(0, 1, -1).normalize();
const canvas = new Canvas({
  id: "canvas",
  width: innerWidth,
  height: innerHeight - 51,
});

const scene = new Scene({
  fov: 90,
  znear: 0.1,
  zfar: 1000,
  canvas,
  camera,
  lightDirection,
});

const mesh = Mesh.fromString({
  str: MOUNTAINS,
  size: 1.5,
  color: {
    red: 255,
    green: 150,
    blue: 60,
  },
});
scene.addMesh(mesh);

// go up a lil bit before rendering
scene.camera.up(10);

// controls
scene.onEveryFrame = ({ meshes, camera }) => {
  scene.lightDirection.rotateY(1);

  // pressedKeys just contains lowercase letters

  // move forward
  if (pressedKeys.includes("w")) camera.forward(0.5);

  // move backward
  if (pressedKeys.includes("s")) camera.backward(0.5);

  // move left
  if (pressedKeys.includes("a")) camera.left(0.5);

  // move right
  if (pressedKeys.includes("d")) camera.right(0.5);

  // move up
  if (pressedKeys.includes(SPACE)) camera.up(0.5);

  // move down
  if (pressedKeys.includes("shift")) camera.down(0.5);

  // turn left
  if (pressedKeys.includes("arrowleft")) camera.turnLeft(1);

  // turn right
  if (pressedKeys.includes("arrowright")) camera.turnRight(1);

  // turn up
  if (pressedKeys.includes("arrowup")) camera.turnUp(1);

  // turn down
  if (pressedKeys.includes("arrowdown")) camera.turnDown(1);

  if (pressedKeys.includes("z")) {
    // zoom in
    scene.fov = 60;
  } else if (pressedKeys.includes("x")) {
    // zoom out
    scene.fov = 120;
  } else if (scene.fov !== 90) {
    // zoom reset
    scene.fov = 90;
  }
};

// render
scene.render();

openfileButton.addEventListener("click", async (e) => {
  const mesh = await Mesh.fromFile({
    size: 1,
    x: 0,
    y: 0,
    z: 0,
  });

  scene.addObjects(mesh);
});

window.addEventListener("resize", () => {
  scene.resize(innerWidth, innerHeight - 51);
});

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}
