class Tesseract {
  points = [
    new Vector(-1, -1, -1, -1),
    new Vector(-1, 1, -1, -1),
    new Vector(1, 1, -1, -1),
    new Vector(1, -1, -1, -1),
    new Vector(-1, -1, 1, -1),
    new Vector(-1, 1, 1, -1),
    new Vector(1, 1, 1, -1),
    new Vector(1, -1, 1, -1),

    new Vector(-1, -1, -1, 1),
    new Vector(-1, 1, -1, 1),
    new Vector(1, 1, -1, 1),
    new Vector(1, -1, -1, 1),
    new Vector(-1, -1, 1, 1),
    new Vector(-1, 1, 1, 1),
    new Vector(1, 1, 1, 1),
    new Vector(1, -1, 1, 1),
  ];

  /**
   * Projecting 4D matrix to 2D matrix
   * @param {number} distance
   * @returns
   */
  project(distance = 5) {
    return this.points.map((point) => {
      const w = 1 / (distance - point.w);
      const projection = [
        [w, 0, 0, 0],
        [0, w, 0, 0],
        [0, 0, w, 0],
      ];

      const projected3d = this.applyMatrixToPoint(projection, point);

      const z = 1 / (distance - projected3d.z);
      const projection3d = [
        [z, 0, 0],
        [0, z, 0],
      ];

      return this.applyMatrixToPoint(projection3d, projected3d);
    });
  }

  translateX(distance) {
    this.points = this.points.map((point) => {
      point.x += distance;
      return point;
    });

    return this;
  }

  /**
   * Rotate 4d matrix around X axis
   * @param {number} angle in degrees
   */
  rotateX(angle) {
    // convert the angle to degrees
    angle = (angle * Math.PI) / 180;
    const rotationMatrix = [
      [1, 0, 0, 0],
      [0, Math.cos(angle), -Math.sin(angle), 0],
      [0, Math.sin(angle), Math.cos(angle), 0],
      [0, 0, 0, 1],
    ];

    this.points = this.applyMatrixToPoints(rotationMatrix);
    return this;
  }

  /**
   * Rotate 4d matrix around Y axis
   * @param {number} angle in degrees
   */
  rotateY(angle) {
    // convert the angle to degrees
    angle = (angle * Math.PI) / 180;
    const rotationMatrix = [
      [Math.cos(angle), 0, Math.sin(angle), 0],
      [0, 1, 0, 0],
      [-Math.sin(angle), 0, Math.cos(angle), 0],
      [0, 0, 0, 1],
    ];

    this.points = this.applyMatrixToPoints(rotationMatrix);
    return this;
  }

  /**
   * Rotate 3d matrix around Z axis
   * @param {number} angle in degrees
   */
  rotateZ(angle) {
    // convert the angle to degrees
    angle = (angle * Math.PI) / 180;
    const rotationMatrix = [
      [Math.cos(angle), -Math.sin(angle), 0, 0],
      [Math.sin(angle), Math.cos(angle), 0, 0],
      [0, 0, 1, 0],
      [0, 0, 0, 1],
    ];

    this.points = this.applyMatrixToPoints(rotationMatrix);
    return this;
  }

  /**
   * Rotate 4d matrix around W axis
   * @param {number} angle in degrees
   */
  rotateW(angle) {
    // convert the angle to degrees
    angle = (angle * Math.PI) / 180;
    const rotationMatrix = [
      [Math.cos(angle), 0, 0, Math.sin(angle)],
      [0, 1, 0, 0],
      [0, 0, 1, 0],
      [-Math.sin(angle), 0, 0, Math.cos(angle)],
    ];

    this.points = this.applyMatrixToPoints(rotationMatrix);
    return this;
  }

  applyMatrixToPoints(matrix, points = this.points) {
    const newPoints = points.map((point) => {
      return this.applyMatrixToPoint(matrix, point);
    });
    return newPoints;
  }

  applyMatrixToPoint(matrix, point) {
    const vec = point.toMatrix();
    const projected = multiply(matrix, vec);

    const newVec = point.fromMatrix(projected);
    return newVec;
  }
}
