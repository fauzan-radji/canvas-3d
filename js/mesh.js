class Mesh {
  constructor({ size = 1, x = 0, y = 0, z = 0 }) {
    this.size = size;
    this.x = x;
    this.y = y;
    this.z = z;
    this.points = [];
    this.triangles = [];
  }

  project() {
    return this.points.map((point) => {
      return point.project();
    });
  }

  /**
   * Rotate 3d cube around X axis
   * @param {number} angle in degrees
   */
  rotateX(angle) {
    const m = Matrix.rotateX(angle);
    for (const point of this.points) point.transform(m);

    return this;
  }

  /**
   * Rotate 3d cube around Y axis
   * @param {number} angle in degrees
   */
  rotateY(angle) {
    const m = Matrix.rotateY(angle);
    for (const point of this.points) point.transform(m);

    return this;
  }

  /**
   * Rotate 3d cube around Z axis
   * @param {number} angle in degrees
   */
  rotateZ(angle) {
    const m = Matrix.rotateZ(angle);
    for (const point of this.points) point.transform(m);

    return this;
  }

  translateZ(distance) {
    for (const point of this.points) point.translateZ(distance);

    return this;
  }

  static async fromFile({ size = 1, x = 0, y = 0, z = 0 }) {
    const pickerOpts = {
      types: [
        {
          description: "3D object",
          accept: {
            "text/plain": [".obj"],
          },
        },
      ],
      excludeAcceptAllOption: true,
      multiple: false,
    };

    const [fileHandle] = await showOpenFilePicker(pickerOpts);

    const fileData = await fileHandle.getFile();
    const contents = await fileData.text();

    return Mesh.fromString({ str: contents, size, x, y, z });
  }

  static fromString({ str, color, size = 1, x = 0, y = 0, z = 0 }) {
    const lines = str.split(/\n/g);

    const mesh = new Mesh({ size, x, y, z });
    const COMMENT = "#";
    const VERTEX = "v";
    const FACE = "f";

    for (const line of lines) {
      if (line[0] === COMMENT) continue;
      const [junk, ...rest] = line.split(" ");
      switch (junk) {
        case VERTEX:
          const xPoint = rest[0] * size + x;
          const yPoint = rest[1] * size + y;
          const zPoint = rest[2] * size + z;
          mesh.points.push(new Vector(xPoint, yPoint, zPoint));
          break;

        case FACE:
          let [p1, p2, p3] = rest;

          p1 = mesh.points[+p1 - 1];
          p2 = mesh.points[+p2 - 1];
          p3 = mesh.points[+p3 - 1];

          mesh.triangles.push(
            new Triangle({
              points: [p1, p2, p3],
              color,
            })
          );
          break;
      }
    }

    return mesh;
  }
}
