class Triangle {
  /**
   *
   * @param {Vertex | Vector} p1
   * @param {Vertex | Vector} p2
   * @param {Vertex | Vector} p3
   */
  constructor(p1, p2, p3) {
    this.points = [p1, p2, p3];
  }

  transform(m) {
    const newPoints = this.points.map((p) => {
      const v = new Vector(p.x, p.y, p.z, 1);

      return Vertex.fromMatrix(m.multiply(v.toMatrix()));
    });

    return new Triangle(newPoints[0], newPoints[1], newPoints[2]);
  }

  draw(scene) {
    this.luminance = this.normal.dot(scene.lightDirection);
    const p1 = this.points[0].project(scene);
    const p2 = this.points[1].project(scene);
    const p3 = this.points[2].project(scene);

    scene.canvas
      .beginPath()
      .moveTo(p1)
      .lineTo(p2)
      .lineTo(p3)
      .lineTo(p1)
      .fill(this.color)
      .stroke(this.color)
      .closePath();
  }

  isFacingCamera(camera) {
    return this.normal.dot(this.points[0].subtract(camera)) < 0;
  }

  stroke(scene, color = "#000") {
    const p1 = this.points[0].project(scene);
    const p2 = this.points[1].project(scene);
    const p3 = this.points[2].project(scene);

    scene.canvas
      .beginPath()
      .moveTo(p1)
      .lineTo(p2)
      .lineTo(p3)
      .lineTo(p1)
      .stroke(color)
      .closePath();
  }

  set luminance(lum) {
    this.luminance_ = lum * 100;

    this.color = `hsl(0,0%,${this.luminance}%)`;
  }

  get luminance() {
    return this.luminance_;
  }

  get normal() {
    const line1 = this.points[1].subtract(this.points[0]);
    const line2 = this.points[2].subtract(this.points[0]);

    return line1.cross(line2).normalize();
  }
}
