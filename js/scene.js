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
    this.aspectRatio = canvas.height / canvas.width;
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

  sortTriangles() {
    this.triangles.sort((a, b) => {
      const z1 = (a.p1.z + a.p2.z + a.p3.z) / 3;
      const z2 = (b.p1.z + b.p2.z + b.p3.z) / 3;
      return z2 - z1;
    });
  }

  render() {
    this.sortTriangles();

    this.canvas.clear();
    for (const tri of this.triangles) {
      if (!tri.isFacingCamera(this.camera)) continue;
      tri.draw(this);
    }
  }

  stroke() {
    for (const tri of this.triangles) {
      tri.stroke(this, "#f00");
    }
  }

  resize(width, height) {
    this.canvas.resize(width, height);
    this.aspectRatio = height / width;
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

  set aspectRatio(aspectRatio) {
    this.aspectRatio_ = aspectRatio;
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

  get aspectRatio() {
    return this.aspectRatio_;
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
