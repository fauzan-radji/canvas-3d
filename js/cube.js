class Cube extends Shape3d {
  constructor(size = 1, x = 0, y = 0, z = 0) {
    super(size, x, y, z);
    const points = [
      new Vertex(-size / 2 + x, -size / 2 + y, -size / 2 + z),
      new Vertex(-size / 2 + x, size / 2 + y, -size / 2 + z),
      new Vertex(size / 2 + x, size / 2 + y, -size / 2 + z),
      new Vertex(size / 2 + x, -size / 2 + y, -size / 2 + z),
      new Vertex(-size / 2 + x, -size / 2 + y, size / 2 + z),
      new Vertex(-size / 2 + x, size / 2 + y, size / 2 + z),
      new Vertex(size / 2 + x, size / 2 + y, size / 2 + z),
      new Vertex(size / 2 + x, -size / 2 + y, size / 2 + z),
    ];

    this.points = points;

    this.tris = [
      // SOUTH
      new Triangle(points[0], points[1], points[2]),
      new Triangle(points[0], points[2], points[3]),

      // EAST
      new Triangle(points[3], points[2], points[6]),
      new Triangle(points[3], points[6], points[7]),

      // NORTH
      new Triangle(points[7], points[6], points[5]),
      new Triangle(points[7], points[5], points[4]),

      // WEST
      new Triangle(points[4], points[5], points[1]),
      new Triangle(points[4], points[1], points[0]),

      // TOP
      new Triangle(points[1], points[5], points[6]),
      new Triangle(points[1], points[6], points[2]),

      // BOTTOM
      new Triangle(points[4], points[0], points[3]),
      new Triangle(points[4], points[3], points[7]),
    ];
  }
}
