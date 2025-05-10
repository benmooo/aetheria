Q: i have defined a cube class with vertices data, the question is how to render it with webgl2. why should we care rendering a cube? because we will use it to test the camera's perspective and lighting effects. otherwise we can not test the camera's perspective and lighting effects.

A:
 1. create and bind the vertex buffer object (VBO)
 2. we do not need bind the index buffer object (IBO) since we defined all the triangles that make up the cube.
