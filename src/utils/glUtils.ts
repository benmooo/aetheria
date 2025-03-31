export class GLUtils {
  static createShader(
    gl: WebGL2RenderingContext,
    type: GLenum,
    source: string,
  ): WebGLShader | null {
    const shader = gl.createShader(type);
    if (!shader) return null;

    gl.shaderSource(shader, source); // set source code
    gl.compileShader(shader); // compile shader

    // check if shader compiled successfully
    const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (!success) {
      const infoLog = gl.getShaderInfoLog(shader);
      console.error(`Shader compilation failed: ${infoLog}`);
      gl.deleteShader(shader);
      return null;
    }

    return shader;
  }

  static createProgram(
    gl: WebGL2RenderingContext,
    vertexShader: WebGLShader,
    fragmentShader: WebGLShader,
  ): WebGLProgram | null {
    const program = gl.createProgram();
    if (!program) return null;

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    const success = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (!success) {
      const infoLog = gl.getProgramInfoLog(program);
      console.error(`Program linking failed: ${infoLog}`);
      gl.deleteProgram(program);
      return null;
    }

    return program;
  }
}
