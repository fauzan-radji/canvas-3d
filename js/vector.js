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

    return new Matrix(m);
  }

  /**
   * Convert matrix to vector
   * @param {matrix} m
   * @returns {Vector}
   */
  static fromMatrix(m) {
    return new Vector(...m.matrix.flat());
  }
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
