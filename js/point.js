class Vertex extends Vector {
  constructor(x, y, z = false, w = false) {
    super(x, y, z, w);
  }

  /**
   * Projecting 3D matrix to 2D matrix
   * @param {number} distance
   * @returns
   */
  project(distance = 5) {
    const z = 1 / (distance - this.z);
    const projection = new Matrix([
      [z, 0, 0],
      [0, z, 0],
    ]);

    const projected = this.applyMatrixToPoint(projection, this);

    projected.x = canvas.center.x + scale(projected.x);
    projected.y = canvas.center.y + scale(projected.y);

    return projected;
  }

  /**
   * Rotate 3d matrix around X axis
   * @param {number} angle in degrees
   */
  rotateX(angle) {
    const newPoint = this.toMatrix().rotateX(angle).toVector();

    this.x = newPoint.x;
    this.y = newPoint.y;
    this.z = newPoint.z;

    return this;
  }

  /**
   * Rotate 3d matrix around Y axis
   * @param {number} angle in degrees
   */
  rotateY(angle) {
    const newPoint = this.toMatrix().rotateY(angle).toVector();

    this.x = newPoint.x;
    this.y = newPoint.y;
    this.z = newPoint.z;

    return this;
  }

  /**
   * Rotate 3d matrix around Z axis
   * @param {number} angle in degrees
   */
  rotateZ(angle) {
    const newPoint = this.toMatrix().rotateZ(angle).toVector();

    this.x = newPoint.x;
    this.y = newPoint.y;
    this.z = newPoint.z;

    return this;
  }

  applyMatrixToPoint(matrix, point) {
    const vec = point.toMatrix();
    const projected = vec.multiply(matrix);

    const newVec = Vertex.fromMatrix(projected);
    return newVec;
  }

  draw(distance) {
    const point = this.project(distance);

    canvas.beginPath().circle(point, 5).fill().closePath();

    return point;
  }

  connect(point) {
    const p1 = this.project(distance);
    const p2 = point.project(distance);

    canvas.beginPath().line(p1, p2).stroke().closePath();
  }
}
