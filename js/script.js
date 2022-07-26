const canvas = new Canvas("canvas");
const cube = new Cube(1.5);
cube.draw();

setInterval(() => {
  canvas.clear();
  cube.rotateX(1).rotateY(1.5).rotateZ(0.5).draw();
}, 50);

window.addEventListener("resize", () => {
  cube.draw();
});

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}
