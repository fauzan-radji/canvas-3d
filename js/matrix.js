class Matrix {
  constructor(m) {
    this.matrix = m;
    this.rows = m.length;
    this.cols = m[0].length;
  }

  /**
   * multiply this with another matrix
   * @param {Matrix} m
   * @returns {Matrix}
   */
  multiply(m) {
    const m1 = m.rows;
    const m2 = m.cols;
    const n2 = this.cols;

    const mResult = makeArray(m1);
    for (let i = 0; i < m1; i++) {
      for (let j = 0; j < n2; j++) {
        mResult[i][j] = 0;
        for (let x = 0; x < m2; x++) {
          mResult[i][j] += m.matrix[i][x] * this.matrix[x][j];
        }
      }
    }

    return new Matrix(mResult);
  }

  rotateX(angle) {
    const newMatrix = this.multiply(Matrix.rotateX(angle));

    this.matrix = newMatrix.matrix;
    this.rows = newMatrix.rows;
    this.cols = newMatrix.cols;

    return this;
  }

  rotateY(angle) {
    const newMatrix = this.multiply(Matrix.rotateY(angle));

    this.matrix = newMatrix.matrix;
    this.rows = newMatrix.rows;
    this.cols = newMatrix.cols;

    return this;
  }

  rotateZ(angle) {
    const newMatrix = this.multiply(Matrix.rotateZ(angle));

    this.matrix = newMatrix.matrix;
    this.rows = newMatrix.rows;
    this.cols = newMatrix.cols;

    return this;
  }

  perspective(fov, aspect, znear, zfar) {
    const newMatrix = this.multiply(
      Matrix.perspective(fov, aspect, znear, zfar)
    );

    this.matrix = newMatrix.matrix;
    this.rows = newMatrix.rows;
    this.cols = newMatrix.cols;

    return this;
  }

  /**
   * Convert this Matrix to Vector
   * @returns {Vector}
   */
  toVector() {
    return Vector.fromMatrix(this);
  }

  print() {
    console.log(this.matrix.map((row) => row.join(" ")).join("\n"));
  }

  /**
   * Generate a matrix for a rotation around the X axis
   * @param {number} angle angle in degrees
   * @returns {Matrix}
   */
  static rotateX(angle) {
    // convert the angle to radians
    angle = (angle * Math.PI) / 180;

    return new Matrix([
      [1, 0, 0],
      [0, Math.cos(angle), -Math.sin(angle)],
      [0, Math.sin(angle), Math.cos(angle)],
    ]);
  }

  /**
   * Generate a matrix for a rotation around the Y axis
   * @param {number} angle angle in degrees
   * @returns {Matrix}
   */
  static rotateY(angle) {
    // I dunno what's wrong with this, but the rotation is getting reversed
    // so I have to use the opposite angle

    // convert the angle to radians
    angle = (angle * Math.PI) / -180;

    return new Matrix([
      [Math.cos(angle), 0, Math.sin(angle)],
      [0, 1, 0],
      [-Math.sin(angle), 0, Math.cos(angle)],
    ]);
  }

  /**
   * Generate a matrix for a rotation around the Z axis
   * @param {number} angle angle in degrees
   * @returns {Matrix}
   */
  static rotateZ(angle) {
    // I dunno what's wrong with this, but the rotation is getting reversed
    // so I have to use the opposite angle

    // convert the angle to radians
    angle = (angle * Math.PI) / -180;

    return new Matrix([
      [Math.cos(angle), -Math.sin(angle), 0],
      [Math.sin(angle), Math.cos(angle), 0],
      [0, 0, 1],
    ]);
  }

  /**
   *
   * @param {number} fov field of view in degrees
   * @param {number} aspect aspect ratio of the screen (width / height)
   * @param {number} znear near plane distance (closest objects)
   * @param {number} zfar far plane distance (farthest objects)
   * @returns {Matrix}
   */
  static perspective(fov, aspect, znear, zfar) {
    // convert the angle to radians
    fov = (fov * Math.PI) / 180;

    const f = 1 / Math.tan(fov / 2);
    const q = zfar / (zfar - znear);

    return new Matrix([
      [aspect * f, 0, 0, 0],
      [0, f, 0, 0],
      [0, 0, q, q * znear],
      [0, 0, 1, 0],
    ]);
  }
}

function makeArray(len) {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr[i] = [];
  }

  return arr;
}
