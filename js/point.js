class Point extends Vector {
  constructor(x, y, z = false, w = false) {
    super(x, y, z, w);
  }

  /**
   * Projecting 3D matrix to 2D matrix
   * @param {number} distance
   * @returns
   */
  project(distance = 5) {
    const point = this;
    const z = 1 / (distance - point.z);
    const projection = [
      [z, 0, 0],
      [0, z, 0],
    ];

    const projected = this.applyMatrixToPoint(projection, point);

    projected.x = canvas.center.x + scale(projected.x);
    projected.y = canvas.center.y + scale(projected.y);

    return projected;
  }

  /**
   * Rotate 3d matrix around X axis
   * @param {number} angle in degrees
   */
  rotateX(angle) {
    // convert the angle to degrees
    angle = (angle * Math.PI) / 180;
    const rotationMatrix = [
      [1, 0, 0],
      [0, Math.cos(angle), -Math.sin(angle)],
      [0, Math.sin(angle), Math.cos(angle)],
    ];

    const newPoint = this.applyMatrixToPoint(rotationMatrix, this);

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
    // convert the angle to degrees
    angle = (angle * Math.PI) / 180;
    const rotationMatrix = [
      [Math.cos(angle), 0, Math.sin(angle)],
      [0, 1, 0],
      [-Math.sin(angle), 0, Math.cos(angle)],
    ];

    const newPoint = this.applyMatrixToPoint(rotationMatrix, this);

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
    // convert the angle to degrees
    angle = (angle * Math.PI) / 180;
    const rotationMatrix = [
      [Math.cos(angle), -Math.sin(angle), 0],
      [Math.sin(angle), Math.cos(angle), 0],
      [0, 0, 1],
    ];

    const newPoint = this.applyMatrixToPoint(rotationMatrix, this);

    this.x = newPoint.x;
    this.y = newPoint.y;
    this.z = newPoint.z;

    return this;
  }

  applyMatrixToPoint(matrix, point) {
    const vec = point.toMatrix();
    const projected = multiply(matrix, vec);

    const newVec = Point.fromMatrix(projected);
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

  static fromMatrix(m) {
    return new Point(...m.flat());
  }
}
