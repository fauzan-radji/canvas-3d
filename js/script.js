const cube = new Cube();

// const distance = 2.5;
const distance = 5;
draw(cube.rotateX(45).rotateY(35).project(distance));

// setInterval(() => {
//   canvas.clear();
//   const point = cube.rotateZ(1).project(distance);
//   draw(point);
// }, 50);

function scale(point, s = 300) {
  return point * s;
}

function draw(points, type = "3d") {
  points = points.map((point) => {
    point.x = canvas.center.x + scale(point.x);
    point.y = canvas.center.y + scale(point.y);

    return point;
  });

  for (let point of points) {
    canvas.beginPath().circle(point, 5).fill().closePath();
  }

  for (let i = 0; i < 4; i++) {
    connect(i + 4, ((i + 1) % 4) + 4, points);
    connect(i, i + 4, points);
    connect(i, (i + 1) % 4, points);
  }
}

function connect(a, b, points) {
  canvas.beginPath().line(points[a], points[b]).stroke().closePath();
}

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}
