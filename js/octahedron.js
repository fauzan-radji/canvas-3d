class Octahedron extends Mesh {
  constructor({ size = 1, x = 0, y = 0, z = 0, color }) {
    super({ size, x, y, z });

    const points = [
      new Vector(0 + x, 0 + y, size + z),
      new Vector(0 + x, 0 + y, -size + z),
      new Vector(size + x, 0 + y, 0 + z),
      new Vector(0 + x, size + y, 0 + z),
      new Vector(-size + x, 0 + y, 0 + z),
      new Vector(0 + x, -size + y, 0 + z),
    ];

    this.points = points;

    this.triangles = [
      // BACK
      new Triangle({
        points: [points[0], points[2], points[3]],
        color,
      }),
      new Triangle({
        points: [points[0], points[3], points[4]],
        color,
      }),
      new Triangle({
        points: [points[0], points[4], points[5]],
        color,
      }),
      new Triangle({
        points: [points[0], points[5], points[2]],
        color,
      }),

      // FRONT
      new Triangle({
        points: [points[1], points[3], points[2]],
        color,
      }),
      new Triangle({
        points: [points[1], points[4], points[3]],
        color,
      }),
      new Triangle({
        points: [points[1], points[5], points[4]],
        color,
      }),
      new Triangle({
        points: [points[1], points[2], points[5]],
        color,
      }),
    ];
  }
}
