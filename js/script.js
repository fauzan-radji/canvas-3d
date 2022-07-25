const cube = new Cube();
const axis = [
  // CENTER
  new Vertex(0, 0, 0),

  // UP
  new Vertex(0, 1, 0),

  // RIGHT
  new Vertex(1, 0, 0),

  // FRONT
  new Vertex(0, 0, 1),
];

// const points = [
//   new Vertex(0, 0, 1),
//   new Vertex(0, 1, 0),
//   new Vertex(1, 0, 0),
//   new Vertex(0, 0, -1),
//   new Vertex(0, -1, 0),
//   new Vertex(-1, 0, 0),
// ];

cube.draw();
// draw();

// axis.forEach((point) => {
//   point.translateX(-2).translateY(-2);
//   point.draw();
// });

// for (let i = 1; i < axis.length; i++) {
//   axis[i].connect(axis[0]);
// }

setInterval(() => {
  canvas.clear();
  cube.rotateX(1).rotateY(1.5).rotateZ(0.5).draw();
  // for (const point of points) point.rotateX(2).rotateY(-1.5).rotateZ(0.5);
  // draw();
}, 50);

function draw() {
  points[0].connect(points[5]);
  points[0].connect(points[4]);
  points[0].connect(points[2]);
  points[0].connect(points[1]);

  points[3].connect(points[5]);
  points[3].connect(points[4]);
  points[3].connect(points[2]);
  points[3].connect(points[1]);

  points[1].connect(points[5]);
  points[5].connect(points[4]);
  points[4].connect(points[2]);
  points[2].connect(points[1]);
}

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}
