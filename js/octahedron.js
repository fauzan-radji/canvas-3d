class Octahedron extends Shape3d {
  constructor(size = 1, x = 0, y = 0, z = 0) {
    super(size, x, y, z);

    const points = [
      new Vertex(0 + x, 0 + y, size + z),
      new Vertex(0 + x, 0 + y, -size + z),
      new Vertex(size + x, 0 + y, 0 + z),
      new Vertex(0 + x, size + y, 0 + z),
      new Vertex(-size + x, 0 + y, 0 + z),
      new Vertex(0 + x, -size + y, 0 + z),
    ];

    this.points = points;

    this.tris = [
      // BACK
      new Triangle(points[0], points[2], points[3]),
      new Triangle(points[0], points[3], points[4]),
      new Triangle(points[0], points[4], points[5]),
      new Triangle(points[0], points[5], points[2]),

      // FRONT
      new Triangle(points[1], points[3], points[2]),
      new Triangle(points[1], points[4], points[3]),
      new Triangle(points[1], points[5], points[4]),
      new Triangle(points[1], points[2], points[5]),
    ];
  }
}
