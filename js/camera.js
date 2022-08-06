class Camera extends Vector {
  #yaw;
  #pitch;
  #vLookDir;
  #vUp;

  constructor(x, y, z) {
    super(x, y, z);

    this.#vLookDir = new Vector(0, 0, 1);
    this.#vUp = new Vector(0, 1, 0);

    this.#yaw = 0;
    this.#pitch = 0;
  }

  forward(distance) {
    const vForward = this.#vLookDir.multiply(distance);
    const newVect = this.add(vForward);
    this.x = newVect.x;
    this.y = newVect.y;
    this.z = newVect.z;

    return this;
  }

  backward(distance) {
    const vForward = this.#vLookDir.multiply(distance);
    const newVect = this.subtract(vForward);
    this.x = newVect.x;
    this.y = newVect.y;
    this.z = newVect.z;

    return this;
  }

  left(distance) {
    const vMove = this.#vLookDir.cross(this.#vUp).multiply(distance);
    const newVect = this.subtract(vMove);
    this.x = newVect.x;
    this.y = newVect.y;
    this.z = newVect.z;

    return this;
  }

  right(distance) {
    const vMove = this.#vLookDir.cross(this.#vUp).multiply(distance);
    const newVect = this.add(vMove);
    this.x = newVect.x;
    this.y = newVect.y;
    this.z = newVect.z;

    return this;
  }

  up(distance) {
    this.y += distance;

    return this;
  }

  down(distance) {
    this.y -= distance;

    return this;
  }

  turnLeft(angle) {
    this.yaw -= angle;

    return this;
  }

  turnRight(angle) {
    this.yaw += angle;

    return this;
  }

  turnUp(angle) {
    this.pitch -= angle;

    return this;
  }

  turnDown(angle) {
    this.pitch += angle;

    return this;
  }

  set yaw(angle) {
    if (angle > 360) angle -= 360;
    if (angle < 0) angle += 360;

    if (angle === this.yaw) return;
    this.#yaw = angle;
  }

  set pitch(angle) {
    // pitch must be between -90 and 90
    angle = Math.max(-90, Math.min(90, angle));

    if (angle === this.pitch) return;
    this.#pitch = angle;
  }

  get yaw() {
    return this.#yaw;
  }

  get pitch() {
    return this.#pitch;
  }

  get matrix() {
    return Matrix.pointAt(this, this.vTarget, this.#vUp);
  }

  get vTarget() {
    this.#vLookDir = new Vector(0, 0, 1).rotateX(this.pitch).rotateY(this.yaw);

    return this.add(this.#vLookDir);
  }
}
