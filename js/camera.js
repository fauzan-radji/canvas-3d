class Camera extends Vector {
  constructor(x, y, z) {
    super(x, y, z);

    this.vLookDir = new Vector(0, 0, 1);
    this.vUp = new Vector(0, 1, 0);

    this.yaw = 0;
  }

  forward(distance) {
    const vForward = this.vLookDir.multiply(distance);
    const newVect = this.add(vForward);
    this.x = newVect.x;
    this.y = newVect.y;
    this.z = newVect.z;
  }

  backward(distance) {
    const vForward = this.vLookDir.multiply(distance);
    const newVect = this.subtract(vForward);
    this.x = newVect.x;
    this.y = newVect.y;
    this.z = newVect.z;
  }

  left(distance) {
    this.x += distance;
  }

  right(distance) {
    this.x -= distance;
  }

  turnLeft(angle) {
    this.yaw -= angle;
  }

  turnRight(angle) {
    this.yaw += angle;
  }

  up(distance) {
    this.y += distance;
  }

  down(distance) {
    this.y -= distance;
  }

  pointAt(vTarget) {
    return Matrix.pointAt(this, vTarget, this.vUp);
  }

  get vTarget() {
    this.vLookDir = new Vector(0, 0, 1).rotateY(this.yaw);
    return this.add(this.vLookDir);
  }
}
