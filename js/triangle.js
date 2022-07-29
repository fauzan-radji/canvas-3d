class Triangle {
  /**
   *
   * @param {Vertex | Vector} p1
   * @param {Vertex | Vector} p2
   * @param {Vertex | Vector} p3
   */
  constructor(p1, p2, p3) {
    this.p1 = p1;
    this.p2 = p2;
    this.p3 = p3;
  }

  draw(scene) {
    this.luminance = this.normal.dot(scene.lightDirection);
    const p1 = this.p1.project(scene);
    const p2 = this.p2.project(scene);
    const p3 = this.p3.project(scene);

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
    return this.normal.dot(this.p1.subtract(camera)) < 0;
  }

  stroke(scene, color = "#000") {
    scene.canvas
      .beginPath()
      .moveTo(this.p1.project(scene))
      .lineTo(this.p2.project(scene))
      .lineTo(this.p3.project(scene))
      .lineTo(this.p1.project(scene))
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
    const line1 = this.p2.subtract(this.p1);
    const line2 = this.p3.subtract(this.p1);

    return line1.cross(line2).normalize();
  }
}
