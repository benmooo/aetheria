import { Triangle } from "../graphics/geometry/triangle";
import { Shader } from "../graphics/shader/shader";
import vertexShaderSource from "@/shaders/basic.vert?raw";
import fragmentShaderSource from "@/shaders/basic.frag?raw";
import { vec3 } from "gl-matrix";
import { Cube } from "@/graphics/geometry/cube";

export class WebGLContext {
  canvas: HTMLCanvasElement;
  gl: WebGL2RenderingContext;
  shader: Shader | null = null;
  triangle: Triangle;
  cube: Cube;
  vertexBuffer: WebGLBuffer | null = null;

  // add color multiplier
  colorMultiplier: vec3;
  modelMatrixLocation: WebGLUniformLocation | null = null;

  constructor(
    canvasId: string,
    colorMultiplier = vec3.fromValues(1.0, 1.0, 1.0),
  ) {
    this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    if (!this.canvas) throw new Error(`Canvas with id ${canvasId} not found`);

    this.gl = this.canvas.getContext("webgl2") as WebGL2RenderingContext;
    if (!this.gl) throw new Error("WebGL2 not supported");

    this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0); // Black background
    this.gl.enable(this.gl.DEPTH_TEST); // Enable depth testing

    this.triangle = new Triangle();
    this.cube = new Cube();
    this.colorMultiplier = colorMultiplier;

    this.initShaders();
    this.initBuffers();
  }

  async initShaders() {
    this.shader = new Shader(this.gl, vertexShaderSource, fragmentShaderSource);

    if (!this.shader.program) {
      throw new Error("Failed to initialize shader program.");
    }
    // get the uniform location
    this.modelMatrixLocation = this.gl.getUniformLocation(
      this.shader.program,
      "uModelMatrix",
    );

    if (!this.modelMatrixLocation) {
      console.warn("Uniform 'uModelMatrix' not found in shader.");
    }
  }

  async initBuffers() {
    this.vertexBuffer = this.gl.createBuffer();
    if (!this.vertexBuffer) throw new Error("Failed to create vertex buffer");

    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexBuffer);
    this.gl.bufferData(
      this.gl.ARRAY_BUFFER,
      this.cube.vertices,
      this.gl.STATIC_DRAW,
    );
  }

  drawTriangle() {
    if (!this.shader || !this.shader.program || !this.vertexBuffer) return;
    this.shader.use();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexBuffer);

    const positionAttribLocation = this.gl.getAttribLocation(
      this.shader.program,
      "aPos",
    );

    this.gl.enableVertexAttribArray(positionAttribLocation);
    this.gl.vertexAttribPointer(
      positionAttribLocation,
      3,
      this.gl.FLOAT,
      false,
      6 * Float32Array.BYTES_PER_ELEMENT,
      0,
    );

    const colorAttribLocation = this.gl.getAttribLocation(
      this.shader.program,
      "aColor",
    );
    this.gl.enableVertexAttribArray(colorAttribLocation);
    this.gl.vertexAttribPointer(
      colorAttribLocation,
      3, // size (r, g, b)
      this.gl.FLOAT, // type of data in buffer
      false, // don't normalize
      6 * Float32Array.BYTES_PER_ELEMENT, // stride: size of one vertex (position + color)
      3 * Float32Array.BYTES_PER_ELEMENT, // offset: color starts after position
    );

    const colorMultiplierLocation = this.gl.getUniformLocation(
      this.shader.program,
      "uColorMultiplier",
    );

    this.gl.uniform3fv(colorMultiplierLocation, this.colorMultiplier);

    // model matrix
    if (this.modelMatrixLocation) {
      this.gl.uniformMatrix4fv(
        this.modelMatrixLocation,
        false,
        this.triangle.transform.matrix,
      );
    }
    this.gl.drawArrays(this.gl.TRIANGLES, 0, this.triangle.numVertices);
  }

  drawCube() {
    if (!this.shader || !this.shader.program || !this.vertexBuffer) return;
    this.shader.use();

    this.gl.bufferData(this.gl.ARRAY_BUFFER, this.cube.vertices, this.gl.STATIC_DRAW)
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexBuffer);

    const positionAttribLocation = this.gl.getAttribLocation(
      this.shader.program,
      "aPos",
    );

    this.gl.enableVertexAttribArray(positionAttribLocation);
    this.gl.vertexAttribPointer(
      positionAttribLocation,
      3,
      this.gl.FLOAT,
      false,
      9 * Float32Array.BYTES_PER_ELEMENT,
      0,
    );

    const colorAttribLocation = this.gl.getAttribLocation(
      this.shader.program,
      "aColor",
    );

    this.gl.enableVertexAttribArray(colorAttribLocation);
    this.gl.vertexAttribPointer(
      colorAttribLocation,
      3, // size (r, g, b)
      this.gl.FLOAT, // type of data in buffer
      false, // don't normalize
      9 * Float32Array.BYTES_PER_ELEMENT, // stride: size of one vertex (position + normal + color)
      6 * Float32Array.BYTES_PER_ELEMENT, // offset: color starts after position
    );

    const colorMultiplierLocation = this.gl.getUniformLocation(
      this.shader.program,
      "uColorMultiplier",
    );

    this.gl.uniform3fv(colorMultiplierLocation, this.colorMultiplier);

    // model matrix
    if (this.modelMatrixLocation) {
      this.gl.uniformMatrix4fv(
        this.modelMatrixLocation,
        false,
        this.cube.transform.matrix,
      );
    }
    this.gl.drawArrays(this.gl.TRIANGLES, 0, this.cube.numVertices);
  }


  clear() {
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
  }
  resize() {
    this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
  }
  render() {
    this.clear();
    // this.drawTriangle();
    this.drawCube();
  }
}
