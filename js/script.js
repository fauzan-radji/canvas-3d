const cubes = [
  new Cube(-2, -2, 0),
  new Cube(-2, 0, 0),
  new Cube(-2, 2, 0),
  new Cube(0, -2, 0),
  new Cube(0, 0, 0),
  new Cube(0, 2, 0),
  new Cube(2, -2, 0),
  new Cube(2, 0, 0),
  new Cube(2, 2, 0),
];
const points = [
  new Point(0, 0, 1),
  new Point(0, 1, 0),
  new Point(1, 0, 0),
  new Point(0, 0, -1),
  new Point(0, -1, 0),
  new Point(-1, 0, 0),
];

// const distance = 2.5;
const distance = 5;
cubes.forEach((cube) => {
  cube.draw(distance);
});

points.forEach((point) => {
  point.draw(distance);
});

draw();

// setInterval(() => {
//   canvas.clear();
//   cube.rotateX(1).rotateY(-1).rotateZ(-1).draw(distance);
// }, 50);

function scale(point, s = 300) {
  return point * s;
}

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

function connect(a, b, points) {
  points[a].connect(points[b]);
}

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}
