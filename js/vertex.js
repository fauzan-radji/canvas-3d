class Vertex extends Vector {
  constructor(x, y, z = false, w = false) {
    super(x, y, z, w);
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
