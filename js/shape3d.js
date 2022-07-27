class Shape3d {
  constructor(size = 1, x = 0, y = 0, z = 0) {
    this.size = size;
    this.x = x;
    this.y = y;
    this.z = z;
    this.points = [];
    this.tris = [];
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

    for (const tri of this.tris) {
      const normal = tri.normal;
      const point = tri.p1;

      if (normal.dot(point.subtract(camera)) < 0) tri.draw(scene);
    }

    return this;
  }

  static async fromFile() {
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

    for (const line of lines) {
      if (line[0] === "#") continue;
      const [junk, ...rest] = line.split(" ");
      if (junk === "v") {
        const [x, y, z] = rest;
        theObject.points.push(new Vector(+x, +y, +z));
      } else if (junk === "f") {
        let [p1, p2, p3] = rest;

        p1 = theObject.points[+p1 - 1];
        p2 = theObject.points[+p2 - 1];
        p3 = theObject.points[+p3 - 1];

        theObject.tris.push(new Triangle(p1, p2, p3));
      }
    }

    return theObject;
  }
}
