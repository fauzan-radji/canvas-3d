class Matrix {
  constructor(m) {
    this.matrix = m;
    this.rows = m.length;
    this.cols = m[0].length;
  }

  /**
   * multiply mat1 and mat2
   * @param {matrix} mat1
   * @param {matrix} mat2
   * @returns {matrix}
   */
  multiply(mat1) {
    const m1 = mat1.rows;
    const m2 = mat1.cols;
    const n2 = this.cols;

    const mResult = makeArray(m1);
    for (let i = 0; i < m1; i++) {
      for (let j = 0; j < n2; j++) {
        mResult[i][j] = 0;
        for (let x = 0; x < m2; x++) {
          mResult[i][j] += mat1.matrix[i][x] * this.matrix[x][j];
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

  toVector() {
    return Vector.fromMatrix(this);
  }

  static rotateX(angle) {
    // convert the angle to radians
    angle = (angle * Math.PI) / 180;

    return new Matrix([
      [1, 0, 0],
      [0, Math.cos(angle), -Math.sin(angle)],
      [0, Math.sin(angle), Math.cos(angle)],
    ]);
  }

  static rotateY(angle) {
    // convert the angle to radians
    angle = (angle * Math.PI) / 180;

    return new Matrix([
      [Math.cos(angle), 0, Math.sin(angle)],
      [0, 1, 0],
      [-Math.sin(angle), 0, Math.cos(angle)],
    ]);
  }

  static rotateZ(angle) {
    // convert the angle to radians
    angle = (angle * Math.PI) / 180;

    return new Matrix([
      [Math.cos(angle), -Math.sin(angle), 0],
      [Math.sin(angle), Math.cos(angle), 0],
      [0, 0, 1],
    ]);
  }
}
