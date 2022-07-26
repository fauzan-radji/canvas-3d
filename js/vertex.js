class Vertex extends Vector {
  constructor(x, y, z = undefined, w = undefined) {
    super(x, y, z, w);
  }

  draw() {
    const point = this.project();

    canvas.beginPath().circle(point, 5).fill().closePath();
  }

  connect(point) {
    const p1 = this.project();
    const p2 = point.project();

    canvas.beginPath().line(p1, p2).stroke().closePath();
  }
}
