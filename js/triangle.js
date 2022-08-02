class Triangle {
  /**
   *
   * @param {Vertex | Vector} p1
   * @param {Vertex | Vector} p2
   * @param {Vertex | Vector} p3
   */
  constructor(p1, p2, p3) {
    this.points = [p1, p2, p3];
    this.luminance = 1;
  }

  transform(m) {
    const newPoints = this.points.map((p) => {
      const v = new Vector(p.x, p.y, p.z, 1);

      return Vertex.fromMatrix(m.multiply(v.toMatrix()));
    });

    return new Triangle(newPoints[0], newPoints[1], newPoints[2]);
  }

  calculateLuminance(lightDirection) {
    this.luminance = this.normal.dot(lightDirection);
  }

  draw(scene) {
    const p1 = this.points[0].project(scene);
    const p2 = this.points[1].project(scene);
    const p3 = this.points[2].project(scene);

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
    return this.normal.dot(this.points[0].subtract(camera)) < 0;
  }

  stroke(scene, color = "#000") {
    const p1 = this.points[0].project(scene);
    const p2 = this.points[1].project(scene);
    const p3 = this.points[2].project(scene);

    scene.canvas
      .beginPath()
      .moveTo(p1)
      .lineTo(p2)
      .lineTo(p3)
      .lineTo(p1)
      .stroke(color)
      .closePath();
  }

  /**
   * Draws the triangle normal direction
   * @param {Scene} scene
   */
  drawNormal(scene) {
    const center = this.center.project(scene);
    const normalVector = this.center.add(this.normal.divide(8)).project(scene);

    scene.canvas.beginPath().circle(center, 3).fill("#0ff").closePath();
    scene.canvas.beginPath().circle(normalVector, 2).fill("#f00").closePath();

    scene.canvas
      .beginPath()
      .moveTo(center)
      .lineTo(normalVector)
      .stroke("#0ff")
      .closePath();
  }

  /**
   * Clipping this Triangle against a Plane and returning new Triangles
   * @param {Vector} plane_p a Point in a Plane
   * @param {Vector} plane_n Normal vector to the Plane
   * @returns {Triangle[]}
   */
  clipAgainstPlane(plane_p, plane_n) {
    // Make sure plane_n is normalized
    plane_n = plane_n.normalize();

    // Create two temporary storage arrays to classify points either side of the plane
    // If distance sign is positive, point lies on "inside" of plane
    const inside = [];
    const outside = [];

    // Get signed distance of each point in triangle from plane
    const d0 = this.points[0].distance(plane_p, plane_n);
    const d1 = this.points[1].distance(plane_p, plane_n);
    const d2 = this.points[2].distance(plane_p, plane_n);

    if (d0 >= 0) inside.push(this.points[0]);
    else outside.push(this.points[0]);

    if (d1 >= 0) inside.push(this.points[1]);
    else outside.push(this.points[1]);

    if (d2 >= 0) inside.push(this.points[2]);
    else outside.push(this.points[2]);

    // Now classify triangle points, and break the input triangle into smaller output triangles if necessary. There are four possible cases:
    // 1. All points outside plane, no clipping required
    if (inside.length === 0) return [];

    // 2. All points inside plane, no clipping required
    if (inside.length === 3) return [this];

    // 3. One point inside and two points outside plane.
    if (inside.length === 1 && outside.length === 2) {
      // Triangle should be clipped. As two points lie outside plane, the triangle simply becomes a smaller triangle

      // The inside point is valid, so keep that
      const p0 = inside[0];

      // But the two new points are at the locations where the original triangle and the plane intersect
      const p1 = Vector.intersectPlane(plane_p, plane_n, p0, outside[0]);
      const p2 = Vector.intersectPlane(plane_p, plane_n, p0, outside[1]);

      return [new Triangle(p0, p1, p2)];
    }

    // 4. Two points inside and one point outside plane.
    if (inside.length === 2 && outside.length === 1) {
      // Triangle should be clipped. As two points lie inside plane, the clipped triangle becomes a "quad". Fortunately we can represent a quad with two new triangles

      // The first triangle consists of the two inside points and the intersection point
      const p0_a = inside[0];
      const p1_a = inside[1];
      const p2_a = Vector.intersectPlane(plane_p, plane_n, p0_a, outside[0]);

      // The second triangle is composed the inside point, the intersection point, and the newly created point above
      const p0_b = p1_a;
      const p1_b = p2_a;
      const p2_b = Vector.intersectPlane(plane_p, plane_n, p0_b, outside[0]);

      return [new Triangle(p0_a, p1_a, p2_a), new Triangle(p0_b, p1_b, p2_b)];
    }
  }

  set luminance(lum) {
    this.luminance_ = lum;

    this.color = `hsl(0,0%,${this.luminance * 80 + 10}%)`;
  }

  get luminance() {
    return this.luminance_;
  }

  get normal() {
    const line1 = this.points[1].subtract(this.points[0]);
    const line2 = this.points[2].subtract(this.points[0]);

    return line1.cross(line2).normalize();
  }

  get center() {
    const p0 = this.points[0];
    const p1 = this.points[1];
    const p2 = this.points[2];
    return p0.add(p1).add(p2).divide(3);
  }
}
