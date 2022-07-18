class Canvas {
  constructor(id) {
    this.id = id;
    this.canvas = document.getElementById(id);
    this.ctx = this.canvas.getContext("2d");

    this.ctx.fillStyle = "#fff";
    this.ctx.strokeStyle = "#fff";
    this.ctx.lineWidth = 1;

    this.setup();
    window.addEventListener("resize", () => this.setup());
  }

  setup() {
    this.canvas.width = innerWidth;
    this.canvas.height = innerHeight;

    this.center = {
      x: Math.round(this.canvas.width / 2),
      y: Math.round(this.canvas.height / 2),
    };

    this.ctx.fillStyle = "#fff";
    this.ctx.strokeStyle = "#fff";
    this.ctx.lineWidth = 1;

    return this;
  }

  circle(x, y, radius) {
    this.ctx.arc(x, y, radius, 0, 2 * Math.PI);

    return this;
  }

  line(x1, y1, x2, y2) {
    this.ctx.moveTo(x1, y1);
    this.ctx.lineTo(x2, y2);

    return this;
  }

  beginPath() {
    this.ctx.beginPath();

    return this;
  }

  closePath() {
    this.ctx.closePath();

    return this;
  }

  stroke() {
    this.ctx.stroke();

    return this;
  }

  fill() {
    this.ctx.fill();

    return this;
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    return this;
  }
}

// canvas setup
// const canvas = document.getElementById("canvas");
// const ctx = canvas.getContext("2d");
// canvas.width = innerWidth;
// canvas.height = innerHeight;

const canvas = new Canvas("canvas");

// window.addEventListener("resize", () => {
//   canvas.width = innerWidth;
//   canvas.height = innerHeight;
//   canvasCenter.x = Math.round(canvas.width / 2);
//   canvasCenter.y = Math.round(canvas.height / 2);

//   draw(cube.project(distance));
// });

window.addEventListener("resize", () => {
  draw(cube.project(distance));
});

// const canvasCenter = {
//   x: Math.round(canvas.width / 2),
//   y: Math.round(canvas.height / 2),
// };

// function circle(x, y, radius, fillColor = "#fff") {
//   ctx.fillStyle = fillColor;
//   ctx.beginPath();
//   ctx.arc(x, y, radius, 0, 2 * Math.PI);
//   ctx.fill();
// }

// function line(x1, y1, x2, y2, width = 1, strokeColor = "#fff") {
//   ctx.strokeStyle = strokeColor;
//   ctx.beginPath();
//   ctx.lineWidth = width;
//   ctx.moveTo(x1, y1);
//   ctx.lineTo(x2, y2);
//   ctx.stroke();
// }

// function clearCanvas() {
//   ctx.clearRect(0, 0, canvas.width, canvas.height);
// }
