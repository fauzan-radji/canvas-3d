class Triangle {
  /**
   * Create Triangle
   * @param {Object} properties - properties to set
   * @param {Vertex[3]|Vector[3]} properties.points - points of the triangle
   * @param {Object} properties.color - color of the triangle
   * @param {number} properties.color.red - red value of the color
   * @param {number} properties.color.green - green value of the color
   * @param {number} properties.color.blue - blue value of the color
   */
  constructor({ points, color }) {
    this.points = points;
    this.red = color.red;
    this.green = color.green;
    this.blue = color.blue;
    this.luminance = 1;
  }

  transform(m) {
    const newPoints = this.points.map((p) =>
      new Vertex(p.x, p.y, p.z, 1).transform(m)
    );

    const { red, green, blue } = this;
    return new Triangle({
      points: newPoints,
      color: { red, green, blue },
    });
  }

  calculateLuminance(lightDirection) {
    this.luminance = Math.max(0.1, this.normal.dot(lightDirection));
  }

  project(scene) {
    const p0 = this.points[0].project(scene);
    const p1 = this.points[1].project(scene);
    const p2 = this.points[2].project(scene);

    const { red, green, blue } = this;
    const newTriangle = new Triangle({
      points: [p0, p1, p2],
      color: { red, green, blue },
    });
    newTriangle.luminance = this.luminance;

    return newTriangle;
  }

  draw(scene) {
    const p0 = this.points[0];
    const p1 = this.points[1];
    const p2 = this.points[2];

    scene.canvas
      .beginPath()
      .moveTo(p0)
      .lineTo(p1)
      .lineTo(p2)
      .lineTo(p0)
      .fill(this.color)
      // .stroke(this.color)
      .closePath();
  }

  isFacingCamera(camera) {
    return this.normal.dot(this.points[0].subtract(camera)) < 0;
  }

  stroke(scene, color = "#000") {
    const p0 = this.points[0];
    const p1 = this.points[1];
    const p2 = this.points[2];

    scene.canvas
      .beginPath()
      .moveTo(p0)
      .lineTo(p1)
      .lineTo(p2)
      .lineTo(p0)
      .stroke(color)
      .closePath();
  }

  /**
   * Draws the triangle normal direction
   * @param {Scene} scene
   */
  // drawNormal(scene) {
  //   const center = this.center.project(scene);
  //   const normalVector = this.center.add(this.normal.divide(8)).project(scene);

  //   scene.canvas.beginPath().circle(center, 3).fill("#0ff").closePath();
  //   scene.canvas.beginPath().circle(normalVector, 2).fill("#f00").closePath();

  //   scene.canvas
  //     .beginPath()
  //     .moveTo(center)
  //     .lineTo(normalVector)
  //     .stroke("#0ff")
  //     .closePath();
  // }

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

      const { red, green, blue } = this;
      return [
        new Triangle({
          points: [p0, p1, p2],
          color: {
            red,
            green,
            blue,
          },
        }),
      ];
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

      const { red, green, blue } = this;
      return [
        new Triangle({
          points: [p0_a, p1_a, p2_a],
          color: {
            red,
            green,
            blue,
          },
        }),
        new Triangle({
          points: [p0_b, p1_b, p2_b],
          color: {
            red,
            green,
            blue,
          },
        }),
      ];
    }
  }

  set red(red) {
    this.red_ = red;
  }

  set green(green) {
    this.green_ = green;
  }

  set blue(blue) {
    this.blue_ = blue;
  }

  set luminance(lum) {
    this.luminance_ = lum;
  }

  get luminance() {
    return this.luminance_;
  }

  get color() {
    const lum = this.luminance;
    return `rgb(${lum * this.red},${lum * this.green},${lum * this.blue})`;
  }

  get red() {
    return this.red_;
  }

  get green() {
    return this.green_;
  }

  get blue() {
    return this.blue_;
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
