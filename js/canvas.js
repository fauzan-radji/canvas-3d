class Canvas {
  constructor(id) {
    this.id = id;
    this.canvas = document.getElementById(id);
    this.ctx = this.canvas.getContext("2d");

    this.setup();
    window.addEventListener("resize", () => this.setup());
  }

  setup() {
    this.canvas.width = innerWidth;
    this.canvas.height = innerHeight;

    this.width = innerWidth;
    this.height = innerHeight;

    this.center = new Vector(
      Math.round(this.canvas.width / 2),
      Math.round(this.canvas.height / 2)
    );

    this.ctx.fillStyle = "#fff";
    this.ctx.strokeStyle = "#fff";
    this.ctx.lineWidth = 1;

    return this;
  }

  circle(point, radius) {
    this.ctx.arc(point.x, point.y, radius, 0, 2 * Math.PI);

    return this;
  }

  line(point1, point2) {
    this.ctx.moveTo(point1.x, point1.y);
    this.ctx.lineTo(point2.x, point2.y);

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

const canvas = new Canvas("canvas");

window.addEventListener("resize", () => {
  draw(cube.project(distance));
});
