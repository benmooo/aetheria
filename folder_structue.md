### Folder Structure

```
aetheria/
├── node_modules/          # Dependencies (managed by bun)
├── public/                # Static assets (HTML, images, etc.)
├── src/                   # Source code
│   ├── components/          # React components (UI)
│   │   ├── App.tsx          # Main application component
│   │   ├── Canvas.tsx       # Component for WebGL canvas
│   │   ├── Controls/        # UI controls for parameters
│   │   │   ├── CameraControls.tsx
│   │   │   ├── LightControls.tsx
│   │   │   ├── MaterialControls.tsx
│   │   │   └── ...
│   │   └── ...
│   ├── core/               # Core engine classes
│   │   ├── WebGLContext.ts  # WebGL context initialization
│   │   ├── Engine.ts          # Rendering Loop Management, Overall Orchestration
│   │   ├── Scene.ts           # Scene Management
│   │   └── ...
│   ├── graphics/           # Graphics-related classes
│   │   ├── geometry/        # Geometry definitions
│   │   │   ├── Triangle.ts
│   │   │   ├── Mesh.ts          # Handles more complex geometries
│   │   │   └── ...
│   │   ├── material/        # Material definitions
│   │   │   ├── Material.ts      # Base material class
│   │   │   ├── PBRMaterial.ts   # PBR material
│   │   │   └── ...
│   │   ├── shader/          # Shader management
│   │   │   ├── Shader.ts        # Shader program management
│   │   │   ├── ShaderLibrary.ts # Pre-defined shaders (e.g., Lambert, Phong)
│   │   │   └── ...
│   │   ├── texture/         # Texture loading and management
│   │   │   ├── Texture.ts
│   │   │   └── TextureLoader.ts
│   │   ├── lighting/        # Lighting classes
│   │   │   ├── Light.ts
│   │   │   ├── DirectionalLight.ts
│   │   │   ├── PointLight.ts
│   │   │   └── ...
│   │   ├── camera/           # Camera classes
│   │   │   ├── Camera.ts
│   │   │   ├── PerspectiveCamera.ts
│   │   │   ├── OrthographicCamera.ts
│   │   │   └── ...
│   │   └── ...
│   ├── math/               # Math utilities
│   │   ├── Matrix4.ts       # Custom or gl-matrix wrapper
│   │   ├── Vector3.ts       # Custom or gl-matrix wrapper
│   │   └── ...
│   ├── scene/              # Scene graph and object management
│   │   ├── SceneNode.ts     # Scene node class
│   │   ├── Transform.ts       # Transformation class
│   │   └── ...
│   ├── utils/              # Utility functions
│   │   ├── GLUtils.ts       # WebGL helper functions (e.g., shader compilation)
│   │   ├── AssetLoader.ts   # Generic asset loading
│   │   └── ...
│   ├── shaders/            # GLSL shader source files
│   │   ├── basic.vert        # Basic vertex shader
│   │   ├── basic.frag        # Basic fragment shader
│   │   ├── lambert.vert
│   │   ├── lambert.frag
│   │   ├── phong.vert
│   │   ├── phong.frag
│   │   └── ...
│   ├── types/              # Global type definitions
│   │   ├── index.d.ts
│   ├── App.tsx              # Main React component
│   ├── main.tsx             # Entry point
│   ├── vite-env.d.ts       # Vite environment types
│   └── assets/              # React assets
│       └── vite.svg
├── .gitignore
├── index.html
├── package.json
├── bun.lockb              # bun lock file
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

**Explanation:**

- **`components/`:** React components for UI elements, controls, and potentially higher-level scene objects.
- **`core/`:** Fundamental engine components: WebGL context management, the main rendering loop, and the scene graph root. This is the heart of the engine.
- **`graphics/`:** Classes related to rendering: geometry definitions, material properties, shader management, textures, and lighting.
  - **`geometry/`:** Classes to define different geometries such as triangle, cube, sphere, plane, custom meshes.
  - **`material/`:** Definition of the different materials in the scene.
  - **`shader/`:** Management of shaders, shader programs and predefined shaders.
  - **`texture/`:** Manage and load textures.
- **`math/`:** Math classes (you could use `gl-matrix` directly, or create wrappers).
- **`scene/`:** Scene graph implementation, including nodes and transformations.
- **`utils/`:** Helper functions for WebGL operations, asset loading, and other tasks.
- **`shaders/`:** GLSL shader source files, organized by shader type (vertex, fragment) and shading model. This keeps the shaders separate from the TypeScript code.
- **`types/`:** Global TypeScript type definitions to improve code clarity and prevent errors.
