import { mat4, quat, vec3 } from "gl-matrix";

export class Transform {
  translation: vec3;
  rotation: quat;
  scale: vec3;
  matrix: mat4;

  constructor() {
    this.translation = vec3.create();
    this.rotation = quat.create();
    this.scale = vec3.fromValues(1, 1, 1);
    this.matrix = mat4.create();

    this.updateMatrix();
  }

  updateMatrix() {
    mat4.fromRotationTranslationScale(
      this.matrix,
      this.rotation,
      this.translation,
      this.scale,
    );
  }

  translate(x: number, y: number, z: number) {
    vec3.set(this.translation, x, y, z);
    this.updateMatrix();
  }

  translateX(x: number) {
    vec3.set(this.translation, x, this.translation[1], this.translation[2]);
    this.updateMatrix();
  }

  translateY(y: number) {
    vec3.set(this.translation, this.translation[0], y, this.translation[2]);
    this.updateMatrix();
  }

  translateZ(z: number) {
    vec3.set(this.translation, this.translation[0], this.translation[1], z);
    this.updateMatrix();
  }

  rotate(radians: number, axis: vec3) {
    const rotationQuat = quat.create();
    quat.setAxisAngle(rotationQuat, axis, radians);

    quat.mul(this.rotation, rotationQuat, this.rotation);
    this.updateMatrix();
  }

  rotateX(radians: number) {
    const rotationQuat = quat.create();
    quat.setAxisAngle(rotationQuat, vec3.fromValues(1, 0, 0), radians);

    quat.mul(this.rotation, rotationQuat, this.rotation);
    this.updateMatrix();
  }

  rotateY(radians: number) {
    const rotationQuat = quat.create();
    quat.setAxisAngle(rotationQuat, vec3.fromValues(0, 1, 0), radians);

    quat.mul(this.rotation, rotationQuat, this.rotation);
    this.updateMatrix();
  }

  rotateZ(radians: number) {
    const rotationQuat = quat.create();
    quat.setAxisAngle(rotationQuat, vec3.fromValues(0, 0, 1), radians);

    quat.mul(this.rotation, rotationQuat, this.rotation);
    this.updateMatrix();
  }

  scaleTransform(x: number, y: number, z: number) {
    vec3.set(this.scale, x, y, z);
    this.updateMatrix();
  }

  scaleX(x: number) {
    vec3.set(this.scale, x, this.scale[1], this.scale[2]);
    this.updateMatrix();
  }

  scaleY(y: number) {
    vec3.set(this.scale, this.scale[0], y, this.scale[2]);
    this.updateMatrix();
  }

  scaleZ(z: number) {
    vec3.set(this.scale, this.scale[0], this.scale[1], z);
    this.updateMatrix();
  }
}
