const cube = new Cube();

// const distance = 2.5;
const distance = 5;
draw(cube.rotateX(45).rotateY(35).project(distance));

// setInterval(() => {
//   clearCanvas();
//   const point = cube.rotateZ(1).project(distance);
//   draw(point);
// }, 50);

function scale(point, s = 300) {
  return point * s;
}

function draw(points, type = "3d") {
  points = points.map((point) => {
    // point.x = canvasCenter.x + scale(point.x);
    // point.y = canvasCenter.y + scale(point.y);
    point.x = canvas.center.x + scale(point.x);
    point.y = canvas.center.y + scale(point.y);
    return point;
    return point;
  });

  for (let point of points) {
    // circle(point.x, point.y, 3, "#fff");
    canvas.beginPath().circle(point.x, point.y, 5).fill().closePath();
  }

  for (let i = 0; i < 4; i++) {
    // inner cube
    connect(i + 4, ((i + 1) % 4) + 4, points);
    connect(i, i + 4, points);
    connect(i, (i + 1) % 4, points);
  }

  if (type === "4d") {
    for (let i = 0; i < 4; i++) {
      // outer cube
      connect(i + 8, ((i + 9) % 4) + 8, points);
      connect(i + 12, ((i + 9) % 4) + 12, points);
      connect(i + 8, i + 12, points);

      connect(i, i + 8, points);
      connect(i + 4, i + 12, points);
    }
  }
}

function connect(a, b, points) {
  // line(points[a].x, points[a].y, points[b].x, points[b].y, 0.5, "#fff");
  canvas
    .beginPath()
    .line(points[a].x, points[a].y, points[b].x, points[b].y)
    .stroke()
    .closePath();
}

// const tesseract = new Tesseract();
// draw(tesseract.rotateW(22).project(distance), "4d");
// setInterval(() => {
//   clearCanvas();
//   draw(tesseract.rotateX(1).rotateW(-1.5).project(distance), "4d");
// }, 20);

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}
