# Aetheria


**Milestone 1: Core Rendering Engine**

*   **Task 1: Basic Geometry (Triangle)**
    *   [ ] Create `Triangle` class/function to define vertex data (position, color - initially hardcoded).
    *   [ ] Implement a function to create a vertex buffer object (VBO) and populate it with triangle vertex data.
    *   [ ] Write a simple vertex shader (pass vertex position and color through).
    *   [ ] Write a simple fragment shader (output the interpolated color).
    *   [ ] Create a shader program from the vertex and fragment shaders.
    *   [ ] Implement a `drawTriangle` function that:
        *   [ ] Binds the VBO.
        *   [ ] Sets up attribute pointers for vertex position and color.
        *   [ ] Uses `gl.drawArrays` to render the triangle.
    *   [ ] Integrate `drawTriangle` into the main render loop in `App.tsx`.

*   **Task 2: Transformations (Translation)**
    *   [ ] Install `gl-matrix` (if not already done): `bun add gl-matrix`
    *   [ ] Add a uniform variable for the model matrix in the vertex shader.
    *   [ ] Create a `Transform` class/interface to hold translation, rotation, and scale.
    *   [ ] Implement a function to create a translation matrix using `gl-matrix`.
    *   [ ] Update the `drawTriangle` function to:
        *   [ ] Calculate the translation matrix based on the triangle's `Transform`.
        *   [ ] Upload the translation matrix to the uniform in the vertex shader.
        *   [ ] Multiply the vertex position by the model matrix in the vertex shader.
    *   [ ] Add UI (even basic text input) to control the triangle's translation.

*   **Task 3: Camera (Simple Perspective)**
    *   [ ] Create a `Camera` class to hold camera parameters (position, target, up vector, FOV, aspect ratio, near, far).
    *   [ ] Implement a function to create a perspective projection matrix using `gl-matrix`.
    *   [ ] Implement a function to create a view matrix using `gl-matrix` (camera transform).
    *   [ ] Add uniform variables for the projection and view matrices in the vertex shader.
    *   [ ] Calculate the projection and view matrices based on the camera parameters.
    *   [ ] Upload the projection and view matrices to the uniforms.
    *   [ ] Update the vertex shader to multiply the vertex position by the model, view, and projection matrices.
    *   [ ] Add UI to control camera position/rotation.

*   **Task 4: Scene Graph (Basic)**
    *   [ ] Create a `SceneNode` class:
        *   [ ] Contains a `Transform`.
        *   [ ] Can hold child `SceneNode` objects.
    *   [ ] Implement a function to recursively traverse the scene graph.
    *   [ ] Modify the rendering loop to:
        *   [ ] Traverse the scene graph.
        *   [ ] Calculate the model matrix for each node (based on its parent's transform).
        *   [ ] Draw the geometry associated with each node.
    *   [ ] Create a basic scene with a few triangles organized in a hierarchy.

*   **Task 5: Basic Shading (Lambertian)**
    *   [ ] Add a uniform variable for a directional light in the fragment shader.
    *   [ ] Add a uniform variable for the object color in the fragment shader.
    *   [ ] Add a vertex attribute for the vertex normal.
    *   [ ] Calculate the normal vector for the triangle in the `Triangle` class/function.
    *   [ ] Modify the vertex shader to pass the normal vector to the fragment shader.
    *   [ ] Implement the Lambertian shading model in the fragment shader (dot product of normal and light direction).
    *   [ ] Add UI to control the light direction and object color.

**Milestone 2: Advanced Shading & Texturing**

*   **Task 6: Phong Shading**
    *   [ ] Implement specular highlights in the fragment shader (Phong or Blinn-Phong).
    *   [ ] Add a uniform variable for the specular color and shininess.
    *   [ ] Add UI to control specular properties.

*   **Task 7: Diffuse Texturing**
    *   [ ] Find or create a simple texture image.
    *   [ ] Implement a function to load a texture image and create a WebGL texture object.
    *   [ ] Add texture coordinates to the triangle vertex data.
    *   [ ] Add a vertex attribute for texture coordinates.
    *   [ ] Modify the vertex shader to pass texture coordinates to the fragment shader.
    *   [ ] Add a sampler2D uniform in the fragment shader.
    *   [ ] Use `texture2D` in the fragment shader to sample the texture.
    *   [ ] Bind the texture object before drawing.
    *   [ ] Add UI to select different textures.

*   **Task 8: Normal Mapping**
    *   [ ] Find or create a normal map image.
    *   [ ] Calculate tangents and bitangents for the triangle.
    *   [ ] Create a TBN matrix (Tangent, Bitangent, Normal) per vertex.
    *   [ ] Pass the TBN matrix to the fragment shader.
    *   [ ] Sample the normal map in the fragment shader.
    *   [ ] Transform the sampled normal from tangent space to world space.
    *   [ ] Use the transformed normal in the lighting calculations.

*   **Task 9: PBR (Roughness/Metallic)**
    *   [ ] Add roughness and metallic maps.
    *   [ ] Implement a simplified PBR shading model (e.g., using the Disney BRDF).

**Milestone 3: Post-Processing & Effects**

(Tasks will be added as milestones are completed)

This is a detailed starting point.  Remember to focus on one small subtask at a time, and test frequently. Good luck building Aetheria!
