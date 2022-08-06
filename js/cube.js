class Cube extends Mesh {
  constructor({ size = 1, x = 0, y = 0, z = 0, color }) {
    super({ size, x, y, z });

    const points = [
      new Vector(-size / 2 + x, -size / 2 + y, -size / 2 + z),
      new Vector(-size / 2 + x, size / 2 + y, -size / 2 + z),
      new Vector(size / 2 + x, size / 2 + y, -size / 2 + z),
      new Vector(size / 2 + x, -size / 2 + y, -size / 2 + z),
      new Vector(-size / 2 + x, -size / 2 + y, size / 2 + z),
      new Vector(-size / 2 + x, size / 2 + y, size / 2 + z),
      new Vector(size / 2 + x, size / 2 + y, size / 2 + z),
      new Vector(size / 2 + x, -size / 2 + y, size / 2 + z),
    ];

    this.points = points;

    this.triangles = [
      // SOUTH
      new Triangle({
        points: [points[0], points[1], points[2]],
        color,
      }),
      new Triangle({
        points: [points[0], points[2], points[3]],
        color,
      }),

      // EAST
      new Triangle({
        points: [points[3], points[2], points[6]],
        color,
      }),
      new Triangle({
        points: [points[3], points[6], points[7]],
        color,
      }),

      // NORTH
      new Triangle({
        points: [points[7], points[6], points[5]],
        color,
      }),
      new Triangle({
        points: [points[7], points[5], points[4]],
        color,
      }),

      // WEST
      new Triangle({
        points: [points[4], points[5], points[1]],
        color,
      }),
      new Triangle({
        points: [points[4], points[1], points[0]],
        color,
      }),

      // TOP
      new Triangle({
        points: [points[1], points[5], points[6]],
        color,
      }),
      new Triangle({
        points: [points[1], points[6], points[2]],
        color,
      }),

      // BOTTOM
      new Triangle({
        points: [points[4], points[0], points[3]],
        color,
      }),
      new Triangle({
        points: [points[4], points[3], points[7]],
        color,
      }),
    ];
  }
}
