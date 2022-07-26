class Vector {
  constructor(x, y, z = undefined, w = undefined) {
    this.x = x;
    this.y = y;

    if (typeof z === "number") this.z = z;

    if (typeof w === "number") this.w = w;
  }

  /**
   * Projecting 3D matrix to 2D matrix
   * @param {number} distance
   * @returns
   */
  project() {
    // translating before projecting
    const z = -this.z - 3;

    const aspect = canvas.height / canvas.width;
    const fov = 90;
    const znear = 1;
    const zfar = 1000;
    const projected = new Vertex(this.x, this.y, z, 1)
      .toMatrix()
      .perspective(fov, aspect, znear, zfar)
      .toVector();

    if (projected.w !== 0) {
      projected.x /= projected.w;
      projected.y /= projected.w;
      projected.z /= projected.w;
    }

    projected.x = canvas.center.x + (projected.x * canvas.width) / 2;
    projected.y = canvas.center.y + (projected.y * canvas.height) / 2;

    // Invert x axis
    projected.x = canvas.width - projected.x;

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

  rotateZ(angle) {
    const newPoint = this.toMatrix().rotateZ(angle).toVector();

    this.x = newPoint.x;
    this.y = newPoint.y;
    this.z = newPoint.z;

    return this;
  }

  translateX(distance) {
    this.x += distance;
    return this;
  }

  translateY(distance) {
    this.y += distance;
    return this;
  }

  translateZ(distance) {
    this.z += distance;
    return this;
  }

  /**
   * Convert Vector to Matrix
   * @return {Matrix}
   */
  toMatrix() {
    const m = [];
    m.push([this.x]);
    m.push([this.y]);

    if (typeof this.z === "number") m.push([this.z]);

    if (typeof this.w === "number") m.push([this.w]);

    return new Matrix(m);
  }

  /**
   * Convert matrix to vector
   * @param {Matrix} m
   * @returns {Vector}
   */
  static fromMatrix(m) {
    return new Vector(...m.matrix.flat());
  }
}
