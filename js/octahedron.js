class Octahedron extends Shape3d {
  constructor(size = 1, x = 0, y = 0, z = 0) {
    super(size, x, y, z);

    const points = [
      // back 0
      new Vertex(0, 0, 1),

      // front 1
      new Vertex(0, 0, -1),

      // right 2
      new Vertex(1, 0, 0),

      // top 3
      new Vertex(0, 1, 0),

      // left 4
      new Vertex(-1, 0, 0),

      // bottom 5
      new Vertex(0, -1, 0),
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
