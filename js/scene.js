class Scene {
  constructor({
    canvas,
    fov = 90,
    znear = 1,
    zfar = 1000,
    camera,
    lightDirection,
  }) {
    this.fov = fov;
    this.znear = znear;
    this.zfar = zfar;
    this.canvas = canvas;
    this.camera = camera;
    this.lightDirection = lightDirection;

    this.objects_ = [];
    this.triangles_ = [];
  }

  addObjects(...objects) {
    this.objects.push(...objects);
    for (const object of objects) {
      this.triangles.push(...object.triangles);
    }
  }

  sortTriangles(triangles) {
    triangles.sort((a, b) => {
      const z1 = (a.p1.z + a.p2.z + a.p3.z) / 3;
      const z2 = (b.p1.z + b.p2.z + b.p3.z) / 3;
      return z2 - z1;
    });
  }

  render() {
    const trianglesFacingCamera = this.triangles.filter((tri) =>
      tri.isFacingCamera(this.camera)
    );
    this.sortTriangles(trianglesFacingCamera);

    this.canvas.clear();
    for (const tri of trianglesFacingCamera) {
      tri.draw(this);
    }
  }

  stroke() {
    for (const tri of this.triangles) {
      tri.stroke(this, "#f00");
    }
  }

  set fov(fov) {
    this.fov_ = fov;
  }

  set znear(znear) {
    this.znear_ = znear;
  }

  set zfar(zfar) {
    this.zfar_ = zfar;
  }

  set canvas(canvas) {
    this.canvas_ = canvas;
  }

  set camera(camera) {
    this.camera_ = camera;
  }

  set lightDirection(lightDirection) {
    this.lightDirection_ = lightDirection;
  }

  get fov() {
    return this.fov_;
  }

  get znear() {
    return this.znear_;
  }

  get zfar() {
    return this.zfar_;
  }

  get canvas() {
    return this.canvas_;
  }

  get camera() {
    return this.camera_;
  }

  get lightDirection() {
    return this.lightDirection_;
  }

  get objects() {
    return this.objects_;
  }

  get triangles() {
    return this.triangles_;
  }
}
