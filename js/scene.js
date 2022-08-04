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

    this.updateProjectionMatrix();
    this.objects_ = [];
    this.triangles_ = [];
    this.onEveryFrame_ = [];

    this.edges = [
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
    if (this.onEveryFrame) {
      const { camera, objects } = this;
      this.onEveryFrame({ camera, objects });
    }

    const matView = this.camera.matrix.quickInverse;

    const trianglesClipped = [];

    for (const tri of this.triangles) {
      if (!tri.isFacingCamera(this.camera)) continue;

      tri.calculateLuminance(this.lightDirection);

      const triViewed = tri.transform(matView);
      triViewed.luminance = tri.luminance;

      // clip against znear plane
      const clippedTriangles = triViewed.clipAgainstPlane(
        new Vector(0, 0, this.znear),
        new Vector(0, 0, 1)
      );

      for (const tri of clippedTriangles) tri.luminance = triViewed.luminance;

      trianglesClipped.push(...clippedTriangles);
    }

    Scene.sortTriangles(trianglesClipped);

    const trianglesToRender = [];

    for (let tri of trianglesClipped) {
      tri = tri.project(this);

      for (const plane of this.edges) {
        const clippedTriangles = tri.clipAgainstPlane(
          plane.point,
          plane.normal
        );

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

    this.requestAnimationFrameId = requestAnimationFrame(
      this.render.bind(this)
    );
  }

  stopRender() {
    cancelAnimationFrame(this.requestAnimationFrameId);
  }

  // stroke() {
  //   this.canvas.clear();
  //   for (const tri of this.triangles) {
  //     tri.stroke(this, "#f00");
  //   }
  // }

  resize(width, height) {
    this.canvas.resize(width, height);
    this.width = width;
    this.height = height;
    this.aspectRatio = height / width;
  }

  updateProjectionMatrix() {
    this.projectionMatrix = Matrix.perspective(
      this.fov,
      this.aspectRatio,
      this.znear,
      this.zfar
    );
  }

  set fov(fov) {
    this.fov_ = fov;

    this.updateProjectionMatrix();
  }

  set znear(znear) {
    this.znear_ = znear;

    this.updateProjectionMatrix();
  }

  set zfar(zfar) {
    this.zfar_ = zfar;

    this.updateProjectionMatrix();
  }

  set canvas(canvas) {
    this.canvas_ = canvas;
  }

  set camera(camera) {
    this.camera_ = camera;
  }

  set width(width) {
    this.width_ = width;
  }

  set height(height) {
    this.height_ = height;
  }

  set aspectRatio(aspectRatio) {
    this.aspectRatio_ = aspectRatio;

    this.updateProjectionMatrix();
  }

  set lightDirection(lightDirection) {
    this.lightDirection_ = lightDirection;
  }

  set onEveryFrame(callbacks) {
    this.onEveryFrame_ = callbacks;
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

  get width() {
    return this.width_;
  }

  get height() {
    return this.height_;
  }

  get aspectRatio() {
    return this.aspectRatio_;
  }

  get lightDirection() {
    return this.lightDirection_;
  }

  get onEveryFrame() {
    return this.onEveryFrame_;
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
