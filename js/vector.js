class Vector {
  constructor(x, y, z = false, w = false) {
    this.x = x;
    this.y = y;

    if (typeof z === "number") this.z = z;

    if (typeof w === "number") this.w = w;
  }

  /**
   * Convert vector to matrix
   * @return {matrix}
   */
  toMatrix() {
    const m = [];
    m.push([this.x]);
    m.push([this.y]);

    if (typeof this.z === "number") m.push([this.z]);

    if (typeof this.w === "number") m.push([this.w]);

    return m;
  }

  /**
   * Convert matrix to vector
   * @param {matrix} m
   * @returns {Vector}
   */
  static fromMatrix(m) {
    return new Vector(...m.flat());
  }
}

/**
 * multiply mat1 and mat2
 * @param {matrix} mat1
 * @param {matrix} mat2
 * @returns {matrix}
 */
function multiply(mat1, mat2) {
  const m1 = mat1.length;
  const m2 = mat1[0].length;
  const n2 = mat2[0].length;

  const mResult = makeArray(m1);
  for (let i = 0; i < m1; i++) {
    for (let j = 0; j < n2; j++) {
      mResult[i][j] = 0;
      for (let x = 0; x < m2; x++) {
        mResult[i][j] += mat1[i][x] * mat2[x][j];
      }
    }
  }

  return mResult;
}

function printMatrix(matrix) {
  console.log(matrix.map((row) => row.join(" ")).join("\n"));
}

function makeArray(len) {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr[i] = [];
  }

  return arr;
}
