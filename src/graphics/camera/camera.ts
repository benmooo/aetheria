// create a camera class
import { mat4, vec3 } from "gl-matrix";

export class Camera {
  position: vec3;
  target: vec3;
  up: vec3;
  fov: number;
  aspect: number;
  near: number;
  far: number;
  viewMatrix: mat4;
  projectionMatrix: mat4;

  constructor(
    position = vec3.fromValues(0, 0, 5),
    target = vec3.fromValues(0, 0, 0),
    up = vec3.fromValues(0, 1, 0),
    fov = Math.PI / 4, // 45 degrees
    aspect = 1.0,

    near = 0.1,
    far = 100.0,
  ) {
    this.position = position;
    this.target = target;
    this.up = up;
    this.fov = fov;
    this.aspect = aspect;
    this.near = near;
    this.far = far;

    this.viewMatrix = mat4.create();
    this.projectionMatrix = mat4.create();

    this.updateViewMatrix();
    this.updateProjectionMatrix();
  }

  updateViewMatrix() {
    mat4.lookAt(this.viewMatrix, this.position, this.target, this.up);
    return this.viewMatrix;
  }

  updateProjectionMatrix() {
    mat4.perspective(
      this.projectionMatrix,
      this.fov,
      this.aspect,
      this.near,
      this.far,
    );
    return this.projectionMatrix;
  }

  moveForward(distance: number) {
    const direction = vec3.create();
    vec3.subtract(direction, this.target, this.position);
    vec3.normalize(direction, direction);
    vec3.scaleAndAdd(this.position, this.position, direction, distance);

    vec3.scaleAndAdd(this.target, this.position, direction, 1); // Keep target 1 unit ahead
    this.updateViewMatrix();
  }

  moveRight(distance: number) {
    const direction = vec3.create();
    vec3.subtract(direction, this.target, this.position);
    const right = vec3.create();
    vec3.cross(right, direction, this.up);
    vec3.normalize(right, right);
    vec3.scaleAndAdd(this.position, this.position, right, distance);
    vec3.scaleAndAdd(this.target, this.position, direction, 1); // Keep target 1 unit ahead
    this.updateViewMatrix();
  }

  moveUp(distance: number) {
    const upNormalized = vec3.create();
    vec3.normalize(upNormalized, this.up);
    vec3.scaleAndAdd(this.position, this.position, upNormalized, distance);
    vec3.scaleAndAdd(this.target, this.target, upNormalized, distance);
    this.updateViewMatrix();
  }

  // Pan (rotate) camera horizontally
  pan(angle: number) {
    const direction = vec3.create();
    vec3.subtract(direction, this.target, this.position);

    // Rotate direction around up vector
    const rotationMatrix = mat4.create();
    mat4.rotate(rotationMatrix, rotationMatrix, angle, this.up);

    vec3.transformMat4(direction, direction, rotationMatrix);
    vec3.add(this.target, this.position, direction);
    this.updateViewMatrix();
  }

  // Tilt (rotate) camera vertically
  tilt(angle: number) {
    const direction = vec3.create();
    vec3.subtract(direction, this.target, this.position);

    // Calculate right vector
    const right = vec3.create();
    vec3.cross(right, direction, this.up);
    vec3.normalize(right, right);

    // Rotate direction around right vector
    const rotationMatrix = mat4.create();
    mat4.rotate(rotationMatrix, rotationMatrix, angle, right);

    vec3.transformMat4(direction, direction, rotationMatrix);
    vec3.add(this.target, this.position, direction);
    this.updateViewMatrix();
  }
}
