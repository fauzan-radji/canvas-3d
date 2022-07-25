class Triangle {
  constructor(p1, p2, p3) {
    this.p1 = p1;
    this.p2 = p2;
    this.p3 = p3;
  }

  rotateX(angle) {
    this.p1.rotateX(angle);
    this.p2.rotateX(angle);
    this.p3.rotateX(angle);

    return this;
  }

  rotateY(angle) {
    this.p1.rotateY(angle);
    this.p2.rotateY(angle);
    this.p3.rotateY(angle);

    return this;
  }

  rotateZ(angle) {
    this.p1.rotateZ(angle);
    this.p2.rotateZ(angle);
    this.p3.rotateZ(angle);

    return this;
  }

  draw() {
    this.p1.connect(this.p2);
    this.p2.connect(this.p3);
    this.p3.connect(this.p1);
  }
}
