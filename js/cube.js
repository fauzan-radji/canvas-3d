class Cube {
  constructor(size = 1, x = 0, y = 0, z = 0) {
    const points = [
      new Vertex(-size / 2 + x, -size / 2 + y, -size / 2 + z),
      new Vertex(-size / 2 + x, size / 2 + y, -size / 2 + z),
      new Vertex(size / 2 + x, size / 2 + y, -size / 2 + z),
      new Vertex(size / 2 + x, -size / 2 + y, -size / 2 + z),
      new Vertex(-size / 2 + x, -size / 2 + y, size / 2 + z),
      new Vertex(-size / 2 + x, size / 2 + y, size / 2 + z),
      new Vertex(size / 2 + x, size / 2 + y, size / 2 + z),
      new Vertex(size / 2 + x, -size / 2 + y, size / 2 + z),
    ];

    this.points = points;

    this.tris = [
      // SOUTH
      new Triangle(points[0], points[1], points[2]),
      new Triangle(points[0], points[2], points[3]),

      // EAST
      new Triangle(points[3], points[2], points[6]),
      new Triangle(points[3], points[6], points[7]),

      // NORTH
      new Triangle(points[7], points[6], points[5]),
      new Triangle(points[7], points[5], points[4]),

      // WEST
      new Triangle(points[4], points[5], points[1]),
      new Triangle(points[4], points[1], points[0]),

      // TOP
      new Triangle(points[1], points[5], points[6]),
      new Triangle(points[1], points[6], points[2]),

      // BOTTOM
      new Triangle(points[4], points[0], points[3]),
      new Triangle(points[4], points[3], points[7]),
    ];
  }

  /**
   * Projecting 3D matrix to 2D matrix
   * @param {number} distance
   * @returns
   */
  project(distance = 5) {
    return this.points.map((point) => {
      return point.project(distance);
    });
  }

  /**
   * Rotate 3d matrix around X axis
   * @param {number} angle in degrees
   */
  rotateX(angle) {
    this.points = this.points.map((point) => point.rotateX(angle));
    // this.tris = this.tris.map((tri) => tri.rotateX(angle));

    return this;
  }

  /**
   * Rotate 3d matrix around Y axis
   * @param {number} angle in degrees
   */
  rotateY(angle) {
    this.points = this.points.map((point) => point.rotateY(angle));
    // this.tris = this.tris.map((tri) => tri.rotateY(angle));

    return this;
  }

  /**
   * Rotate 3d matrix around Z axis
   * @param {number} angle in degrees
   */
  rotateZ(angle) {
    // convert the angle to degrees
    this.points = this.points.map((point) => point.rotateZ(angle));
    // this.tris = this.tris.map((tri) => tri.rotateZ(angle));

    return this;
  }

  draw() {
    for (const tri of this.tris) tri.draw();
  }
}
