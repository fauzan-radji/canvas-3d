class Scene {
  #fov;
  #znear;
  #zfar;
  #canvas;
  #camera;
  #width;
  #height;
  #aspectRatio;
  #lightDirection;
  #onEveryFrame;
  #meshes;
  #triangles;

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
    this.#meshes = [];
    this.#triangles = [];
    this.#onEveryFrame = [];

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

  addMesh(mesh) {
    this.meshes.push(mesh);
    this.triangles.push(...mesh.triangles);
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
      const { camera, meshes } = this;
      this.onEveryFrame({ camera, meshes });
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
    this.#fov = fov;

    this.updateProjectionMatrix();
  }

  set znear(znear) {
    this.#znear = znear;

    this.updateProjectionMatrix();
  }

  set zfar(zfar) {
    this.#zfar = zfar;

    this.updateProjectionMatrix();
  }

  set canvas(canvas) {
    this.#canvas = canvas;
  }

  set camera(camera) {
    this.#camera = camera;
  }

  set width(width) {
    this.#width = width;
  }

  set height(height) {
    this.#height = height;
  }

  set aspectRatio(aspectRatio) {
    this.#aspectRatio = aspectRatio;

    this.updateProjectionMatrix();
  }

  set lightDirection(lightDirection) {
    this.#lightDirection = lightDirection;
  }

  set onEveryFrame(callbacks) {
    this.#onEveryFrame = callbacks;
  }

  get fov() {
    return this.#fov;
  }

  get znear() {
    return this.#znear;
  }

  get zfar() {
    return this.#zfar;
  }

  get canvas() {
    return this.#canvas;
  }

  get camera() {
    return this.#camera;
  }

  get width() {
    return this.#width;
  }

  get height() {
    return this.#height;
  }

  get aspectRatio() {
    return this.#aspectRatio;
  }

  get lightDirection() {
    return this.#lightDirection;
  }

  get onEveryFrame() {
    return this.#onEveryFrame;
  }

  get meshes() {
    return this.#meshes;
  }

  get triangles() {
    return this.#triangles;
  }

  static sortTriangles(triangles) {
    triangles.sort((a, b) => {
      const z1 = (a.points[0].z + a.points[1].z + a.points[2].z) / 3;
      const z2 = (b.points[0].z + b.points[1].z + b.points[2].z) / 3;
      return z2 - z1;
    });
  }
}
