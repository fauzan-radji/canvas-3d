class Cube {
  constructor(x = 0, y = 0, z = 0) {
    this.points = [
      new Vertex(-1 + x, -1 + y, -1 + z),
      new Vertex(-1 + x, 1 + y, -1 + z),
      new Vertex(1 + x, 1 + y, -1 + z),
      new Vertex(1 + x, -1 + y, -1 + z),
      new Vertex(-1 + x, -1 + y, 1 + z),
      new Vertex(-1 + x, 1 + y, 1 + z),
      new Vertex(1 + x, 1 + y, 1 + z),
      new Vertex(1 + x, -1 + y, 1 + z),
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

  translateX(distance) {
    this.points = this.points.map((point) => {
      point.x += distance;
      return point;
    });
    return this;
  }

  /**
   * Rotate 3d matrix around X axis
   * @param {number} angle in degrees
   */
  rotateX(angle) {
    this.points = this.points.map((point) => point.rotateX(angle));

    return this;
  }

  /**
   * Rotate 3d matrix around Y axis
   * @param {number} angle in degrees
   */
  rotateY(angle) {
    this.points = this.points.map((point) => point.rotateY(angle));
    return this;
  }

  /**
   * Rotate 3d matrix around Z axis
   * @param {number} angle in degrees
   */
  rotateZ(angle) {
    // convert the angle to degrees
    this.points = this.points.map((point) => point.rotateZ(angle));
    return this;
  }

  applyMatrixToPoints(matrix) {
    const newPoints = this.points.map((point) => {
      return this.applyMatrixToPoint(matrix, point);
    });
    return newPoints;
  }

  applyMatrixToPoint(matrix, point) {
    const vec = point.toMatrix();
    const projected = multiply(matrix, vec);

    const newVec = point.fromMatrix(projected);
    return newVec;
  }

  draw(distance) {
    const points = this.points;
    points.forEach((point) => point.draw(distance));

    for (let i = 0; i < 4; i++) {
      points[i].connect(points[(i + 1) % 4]);

      points[i + 4].connect(points[((i + 1) % 4) + 4]);

      points[i].connect(points[i + 4]);
    }
  }
}
