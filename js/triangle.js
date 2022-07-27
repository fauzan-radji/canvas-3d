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
    this.p1.connect(this.p2, scene);
    this.p2.connect(this.p3, scene);
    this.p3.connect(this.p1, scene);
  }
}
