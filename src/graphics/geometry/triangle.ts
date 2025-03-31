export class Triangle {
  vertices: Float32Array;

  numVertices: number;

  constructor() {
    // define vertex data with position and color
    // x, y, z, r, g, b
    this.vertices = new Float32Array([
      0.0,  0.5, 0.0,   1.0, 0.0, 0.0,  // Top vertex, Red
     -0.5, -0.5, 0.0,   0.0, 1.0, 0.0,  // Bottom-left vertex, Green
      0.5, -0.5, 0.0,   0.0, 0.0, 1.0   // Bottom-right vertex, Blue
    ]);

    this.numVertices = 3;
  }
}
