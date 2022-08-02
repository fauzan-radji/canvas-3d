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

    const projected = new Vertex(this.x, this.y, z, 1)
      .toMatrix()
      .perspective(scene.fov, scene.aspectRatio, scene.znear, scene.zfar)
      .toVector();

    if (z !== 0) {
      projected.x /= z;
      projected.y /= z;
      projected.z /= z;
    }

    // scale the projected vector to the screen size
    projected.x *= scene.canvas.width;
    projected.y *= scene.canvas.height;

    // translate the projected vector to the center of the canvas
    projected.x += scene.canvas.center.x;
    projected.y += scene.canvas.center.y;

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

  /**
   * Adding this Vector and v Vector
   * @param {Vector} v antoher Vector
   * @returns {Vector}
   */
  add(v) {
    return new Vector(this.x + v.x, this.y + v.y, this.z + v.z);
  }

  /**
   * Multiply this Vector by k
   * @param {number} k scaling factor
   * @returns {Vector}
   */
  multiply(k) {
    return new Vector(this.x * k, this.y * k, this.z * k);
  }

  /**
   * Divide this Vector by k
   * @param {number} k scaling factor
   * @returns {Vector}
   */
  divide(k) {
    return new Vector(this.x / k, this.y / k, this.z / k);
  }

  normalize() {
    const length = Math.sqrt(this.x ** 2 + this.y ** 2 + this.z ** 2);

    return new Vector(this.x / length, this.y / length, this.z / length);
  }

  /**
   * Return signed shortest distance from point to plane, plane normal must be normalised
   * @param {Vector} plane_p a Point in a Plane
   * @param {Vector} plane_n a Normal in a Plane
   * @returns {number}
   */
  distance(plane_p, plane_n) {
    return this.dot(plane_n) - plane_n.dot(plane_p);
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

  /**
   * Test and returning a Point where a Line intersects with a Plane
   * @param {Vector} plane_p a Point in a Plane
   * @param {Vector} plane_n Normal vector to the Plane
   * @param {Vector} lineStart Line Start
   * @param {Vector} lineEnd Line End
   * @return {Vector}
   */
  static intersectPlane(plane_p, plane_n, lineStart, lineEnd) {
    plane_n = plane_n.normalize();
    const plane_d = -plane_n.dot(plane_p);
    const ad = lineStart.dot(plane_n);
    const bd = lineEnd.dot(plane_n);
    const t = (-plane_d - ad) / (bd - ad);
    const lineStartToEnd = lineEnd.subtract(lineStart);
    const lineToIntersect = lineStartToEnd.multiply(t);
    return lineStart.add(lineToIntersect);
  }
}
