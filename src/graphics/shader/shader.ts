import { GLUtils } from "../../utils/glUtils";

export class Shader {
  program: WebGLProgram | null = null;

  gl: WebGL2RenderingContext;

  constructor(
    gl: WebGL2RenderingContext,
    vertexShaderSource: string,
    fragmentShaderSource: string,
  ) {
    this.gl = gl;
    const vertexShader = GLUtils.createShader(
      gl,
      gl.VERTEX_SHADER,
      vertexShaderSource,
    );
    const fragmentShader = GLUtils.createShader(
      gl,
      gl.FRAGMENT_SHADER,
      fragmentShaderSource,
    );

    if (!vertexShader || !fragmentShader) {
      console.error("Failed to create or compile shaders.");
      return;
    }

    this.program = GLUtils.createProgram(gl, vertexShader, fragmentShader);

    if (!this.program) {
      console.error("Failed to create shader program.");
    }
  }

  use() {
    if (this.program) {
      this.gl.useProgram(this.program);
    }
  }

  delete() {
    if (this.program) {
      this.gl.deleteProgram(this.program);
      this.program = null;
    }
  }
}
