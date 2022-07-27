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
  project(scene) {
    // by default, the z axis is pointing towards the camera, so we need to reverse it
    const z = -this.z;

    const aspect = scene.canvas.height / scene.canvas.width;
    const projected = new Vertex(this.x, this.y, z, 1)
      .toMatrix()
      .perspective(scene.fov, aspect, scene.znear, scene.zfar)
      .toVector();

    if (projected.w !== 0) {
      projected.x /= projected.w;
      projected.y /= projected.w;
      projected.z /= projected.w;
    }

    projected.x =
      scene.canvas.center.x + (projected.x * scene.canvas.width) / 2;
    projected.y =
      scene.canvas.center.y + (projected.y * scene.canvas.height) / 2;

    // Invert x axis
    projected.x = scene.canvas.width - projected.x;

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
   * Cross product of this Vector and v Vector
   * @param {Vector} v another vector
   * @returns {Vector}
   */
  cross(v) {
    return new Vector(
      this.y * v.z - this.z * v.y,
      this.z * v.x - this.x * v.z,
      this.x * v.y - this.y * v.x
    );
  }

  /**
   * Dot product of this Vector and v Vector
   * @param {Vector} v antoher Vector
   * @returns {Vector}
   */
  dot(v) {
    return this.x * v.x + this.y * v.y + this.z * v.z;
  }

  /**
   * Subtracting this Vector and v Vector
   * @param {Vector} v antoher Vector
   * @returns {Vector}
   */
  subtract(v) {
    return new Vector(this.x - v.x, this.y - v.y, this.z - v.z);
  }

  normalize() {
    const length = Math.sqrt(this.x ** 2 + this.y ** 2 + this.z ** 2);

    return new Vector(this.x / length, this.y / length, this.z / length);
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
