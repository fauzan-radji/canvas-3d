class Shape3d {
  constructor(size = 1, x = 0, y = 0, z = 0) {
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
    this.points = this.points.map((point) => point.rotateX(angle));

    return this;
  }

  /**
   * Rotate 3d cube around Y axis
   * @param {number} angle in degrees
   */
  rotateY(angle) {
    this.points = this.points.map((point) => point.rotateY(angle));

    return this;
  }

  /**
   * Rotate 3d cube around Z axis
   * @param {number} angle in degrees
   */
  rotateZ(angle) {
    // convert the angle to degrees
    this.points = this.points.map((point) => point.rotateZ(angle));

    return this;
  }

  translateZ(distance) {
    this.points = this.points.map((point) => point.translateZ(distance));

    return this;
  }

  draw(scene) {
    const camera = scene.camera;
    const trianglesFacingCamera = this.triangles.filter((triangle) =>
      triangle.isFacingCamera(camera)
    );

    for (const tri of trianglesFacingCamera) {
      tri.draw(scene);
    }

    return this;
  }

  static async fromFile(size = 1, x = 0, y = 0, z = 0) {
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

    const lines = contents.split("\r\n");

    const theObject = new Shape3d();
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
          theObject.points.push(new Vertex(xPoint, yPoint, zPoint));
          break;

        case FACE:
          let [p1, p2, p3] = rest;

          p1 = theObject.points[+p1 - 1];
          p2 = theObject.points[+p2 - 1];
          p3 = theObject.points[+p3 - 1];

          theObject.triangles.push(new Triangle(p1, p2, p3));
          break;
      }
    }

    return theObject;
  }
}
