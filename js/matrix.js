class Matrix {
  constructor(m) {
    this.matrix = m;
    this.rows = m.length;
    this.cols = m[0].length;
  }

  /**
   * multiply this with another matrix or by scalar
   * @param {Matrix | number} m
   * @returns {Matrix}
   */
  multiply(m) {
    if (typeof m === "number")
      return new Matrix(this.matrix.map((row) => row.map((cell) => cell * m)));

    const m1 = this.rows;
    const m2 = this.cols;
    const n2 = m.cols;

    const mResult = makeArray(m1);
    for (let i = 0; i < m1; i++) {
      for (let j = 0; j < n2; j++) {
        mResult[i][j] = 0;
        for (let x = 0; x < m2; x++) {
          mResult[i][j] += this.matrix[i][x] * m.matrix[x][j];
        }
      }
    }

    return new Matrix(mResult);
  }

  rotateX(angle) {
    const newMatrix = Matrix.rotateX(angle).multiply(this);

    this.matrix = newMatrix.matrix;
    this.rows = newMatrix.rows;
    this.cols = newMatrix.cols;

    return this;
  }

  rotateY(angle) {
    const newMatrix = Matrix.rotateY(angle).multiply(this);

    this.matrix = newMatrix.matrix;
    this.rows = newMatrix.rows;
    this.cols = newMatrix.cols;

    return this;
  }

  rotateZ(angle) {
    const newMatrix = Matrix.rotateZ(angle).multiply(this);

    this.matrix = newMatrix.matrix;
    this.rows = newMatrix.rows;
    this.cols = newMatrix.cols;

    return this;
  }

  perspective(fov, aspect, znear, zfar) {
    const newMatrix = Matrix.perspective(fov, aspect, znear, zfar).multiply(
      this
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

  print(line = 0) {
    console.log(
      this.matrix.map((row) => row.join(" ")).join("\n"),
      "\nat line: " + line
    );
  }

  cofactor(i, j) {
    const minor = [];
    for (let x = 0; x < this.rows; x++) {
      if (x === i) continue;

      const row = [];
      for (let y = 0; y < this.cols; y++) {
        if (y === j) continue;

        row.push(this.matrix[x][y]);
      }

      minor.push(row);
    }

    return new Matrix(minor).determinant;
  }

  get transpose() {
    const m = this.matrix;
    const mResult = makeArray(this.cols);
    for (let i = 0; i < this.cols; i++) {
      for (let j = 0; j < this.rows; j++) {
        mResult[i][j] = m[j][i];
      }
    }

    return new Matrix(mResult);
  }

  get determinant() {
    if (this.rows !== this.cols) {
      throw new Error("Matrix is not square");
    }

    if (this.rows === 2) {
      return (
        this.matrix[0][0] * this.matrix[1][1] -
        this.matrix[0][1] * this.matrix[1][0]
      );
    }

    let a = 0;
    let b = 0;
    for (let i = 0; i <= this.cols - 1; i++) {
      a +=
        this.matrix[0][i] *
        this.matrix[1][(i + 1) % this.cols] *
        this.matrix[2][(i + 2) % this.cols];
      b +=
        this.matrix[0][(i + 2) % this.cols] *
        this.matrix[1][(i + 1) % this.cols] *
        this.matrix[2][i];
    }

    const det = a - b;
    return det;
  }

  get adjoint() {
    const mResult = makeArray(this.rows);
    let sign = 1;
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        mResult[i][j] = sign * this.cofactor(i, j);

        sign = -sign;
      }
    }

    return new Matrix(mResult).transpose;
  }

  get inverse() {
    const det = this.determinant;
    if (det === 0) {
      throw new Error("Matrix is not invertible");
    }

    return this.adjoint.multiply(1 / det);
  }

  get quickInverse() {
    const matrix = makeArray(this.rows);

    matrix[0][0] = this.matrix[0][0];
    matrix[0][1] = this.matrix[0][1];
    matrix[0][2] = this.matrix[0][2];
    matrix[0][3] = -(
      this.matrix[3][0] * matrix[0][0] +
      this.matrix[3][1] * matrix[0][1] +
      this.matrix[3][2] * matrix[0][2]
    );

    matrix[1][0] = this.matrix[1][0];
    matrix[1][1] = this.matrix[1][1];
    matrix[1][2] = this.matrix[1][2];
    matrix[1][3] = -(
      this.matrix[3][0] * matrix[1][0] +
      this.matrix[3][1] * matrix[1][1] +
      this.matrix[3][2] * matrix[1][2]
    );

    matrix[2][0] = this.matrix[2][0];
    matrix[2][1] = this.matrix[2][1];
    matrix[2][2] = this.matrix[2][2];
    matrix[2][3] = -(
      this.matrix[3][0] * matrix[2][0] +
      this.matrix[3][1] * matrix[2][1] +
      this.matrix[3][2] * matrix[2][2]
    );

    matrix[3][0] = 0;
    matrix[3][1] = 0;
    matrix[3][2] = 0;
    matrix[3][3] = 1;

    return new Matrix(matrix);
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
    // since the z axis is pointing in the same direction as the camera, we need to reverse the angle
    // so, from the camera's perspective, the rotation is counterclockwise

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
      [0, 0, q, -q * znear],
      [0, 0, 1, 0],
    ]);
  }

  static pointAt(pos, target, up) {
    // Calculate new forward direction
    const newForward = target.subtract(pos).normalize();

    // Calculate new up direction
    const a = newForward.multiply(up.dot(newForward));
    const newUp = up.subtract(a).normalize();

    // New right direction is easy, because it's just cross product
    const newRight = newUp.cross(newForward);

    return new Matrix([
      [newRight.x, newRight.y, newRight.z, 0],
      [newUp.x, newUp.y, newUp.z, 0],
      [newForward.x, newForward.y, newForward.z, 0],
      [pos.x, pos.y, pos.z, 1],
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
