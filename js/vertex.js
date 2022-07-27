class Vertex extends Vector {
  constructor(x, y, z = undefined, w = undefined) {
    super(x, y, z, w);
  }

  draw(scene) {
    const point = this.project(scene);

    scene.canvas.beginPath().circle(point, 5).fill().closePath();
  }

  connect(point, scene) {
    const p1 = this.project(scene);
    const p2 = point.project(scene);

    scene.canvas.beginPath().line(p1, p2).stroke().closePath();
  }
}
