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
    this.width = canvas.width;
    this.height = canvas.height;
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
      const z1 = (a.points[0].z + a.points[1].z + a.points[2].z) / 3;
      const z2 = (b.points[0].z + b.points[1].z + b.points[2].z) / 3;
      return z2 - z1;
    });
  }

  render() {
    const vTarget = this.camera.vTarget;
    const matCamera = this.camera.pointAt(vTarget);
    const matView = matCamera.quickInverse;

    const trianglesClipped = [];

    for (const tri of this.triangles) {
      if (!tri.isFacingCamera(this.camera)) continue;

      const triViewed = tri.transform(matView);
      triViewed.calculateLuminance(this.lightDirection);

      const clippedTriangles = triViewed.clipAgainstPlane(
        new Vector(0, 0, this.znear),
        new Vector(0, 0, 1)
      );

      for (const tri of clippedTriangles) tri.luminance = triViewed.luminance;

      trianglesClipped.push(...clippedTriangles);
    }

    Scene.sortTriangles(trianglesClipped);

    const trianglesToRender = [];
    const planes = [
      // Top
      {
        point: new Vector(0, 0, 0),
        normal: new Vector(0, 1, 0),
      },
      // Bottom
      {
        point: new Vector(0, this.height - 1, 0),
        normal: new Vector(0, -1, 0),
      },
      // Left
      {
        point: new Vector(0, 0, 0),
        normal: new Vector(1, 0, 0),
      },
      // Right
      {
        point: new Vector(this.width - 1, 0, 0),
        normal: new Vector(-1, 0, 0),
      },
    ];

    for (const plane of planes) {
      for (const tri of trianglesClipped) {
        const clippedTriangles = tri
          .project(this)
          .clipAgainstPlane(plane.point, plane.normal);
        if (clippedTriangles.length <= 0) continue;
        for (const clipped of clippedTriangles)
          clipped.luminance = tri.luminance;
        trianglesToRender.push(...clippedTriangles);
      }
    }

    this.canvas.clear();
    for (const tri of trianglesToRender) {
      tri.draw(this);

      // for debugging
      // tri.stroke(this, "#ff0");
      // tri.drawNormal(this);
    }
  }

  stroke() {
    this.canvas.clear();
    for (const tri of this.triangles) {
      tri.stroke(this, "#f00");
    }
  }

  resize(width, height) {
    this.canvas.resize(width, height);
    this.width = width;
    this.height = height;
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

  static sortTriangles(triangles) {
    triangles.sort((a, b) => {
      const z1 = (a.points[0].z + a.points[1].z + a.points[2].z) / 3;
      const z2 = (b.points[0].z + b.points[1].z + b.points[2].z) / 3;
      return z2 - z1;
    });
  }
}
