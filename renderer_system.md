# Designing a Modular and Extensible Renderer System

A modular and extensible renderer is crucial for a maintainable and feature-rich rendering engine. Let's outline a design that supports this.

## Goals

1. **Interchangeable Render Paths**: Support forward rendering, deferred rendering, and potentially custom render paths.
2. **Customizable Pipeline Stages**: Allow developers to insert their own render stages.
3. **Extensible Material System**: Easily add new materials and shading models.
4. **Hardware Abstraction**: Design the system to allow potential future abstraction for WebGPU or other APIs.

## Key Components for Modularity

### 1. Render Pipeline Abstraction

- `RenderPipeline` interface: Defines the core operations: culling, shadow mapping, rendering, post-processing.
- Concrete Implementations:
  - `ForwardRenderPipeline`: Classic forward rendering.
  - `DeferredRenderPipeline`: Deferred shading implementation.
  - `CustomRenderPipeline`: Allows users to define their own pipeline stages.

### 2. Render Stage System

- `RenderStage` abstract class/interface:
  - `execute(scene: Scene, camera: Camera, renderTarget: RenderTarget): void`
  - `beforeRender(scene: Scene, camera: Camera, renderTarget: RenderTarget): void`
  - `afterRender(scene: Scene, camera: Camera, renderTarget: RenderTarget): void`
- Concrete Implementations:
  - `CullingStage`: Frustum culling, visibility checks
  - `ShadowMappingStage`: Generates shadow maps.
  - `GeometryStage`: Prepares geometry for rendering.
  - `LightingStage`: Applies lighting calculations.
  - `RenderStage`: Actual WebGL draw calls.
  - `PostProcessingStage`: Applies screen-space effects.

### 3. Material System

- `Material` abstract class: Defines the surface properties and rendering logic.
  - `getShader(lightMode: string): ShaderProgram`
  - `setUniforms(gl: WebGL2RenderingContext, shader: ShaderProgram, scene: Scene, camera: Camera): void`
- Concrete Implementations:
  - `StandardMaterial`: PBR material.
  - `UnlitMaterial`: For debugging or special effects.
  - `CustomMaterial`: Allows user-defined shader programs.

### 4. Shader Variants

- `ShaderVariant` class: Combines a base shader with specific feature flags and defines its parameters.
- `ShaderGenerator`: Dynamically creates shader variants based on material properties and scene settings.

### 5. Render Queue

- `RenderQueue`: Stores renderables sorted by material, shader, and distance to camera.
- Sorting options: Front-to-back, back-to-front, state-based, custom.
- Batching: Combines multiple draw calls into a single call to reduce overhead.

### 6. Render Target Abstraction

- `RenderTarget` abstract class: Manages framebuffers for off-screen rendering.
- Concrete Implementations:
  - `ScreenRenderTarget`: The default render target (the canvas).
  - `TextureRenderTarget`: Render to a texture.
  - `CubeRenderTarget`: Render to a cubemap.

## Extensibility Points

1.  **Custom Render Stages**: Allow users to create and insert their own `RenderStage` implementations into the `RenderPipeline`.

    ```typescript
    class MyCustomStage extends RenderStage {
      execute(scene: Scene, camera: Camera, renderTarget: RenderTarget) {
        // Custom rendering logic
      }
    }

    const pipeline = new ForwardRenderPipeline();
    pipeline.addStage(new MyCustomStage(), "before", "LightingStage"); // Insert before lighting
    ```

2.  **Custom Materials**: Provide a `CustomMaterial` class that allows users to specify their own vertex and fragment shaders.

    ```typescript
    const myMaterial = new CustomMaterial({
      vertexShader: myVertexShaderSource,
      fragmentShader: myFragmentShaderSource,
      uniforms: {
        // Define custom uniforms
      },
    });
    ```

3.  **Shader Plugins**: Use shader plugins to inject code snippets into the shader generation process.

    ```typescript
    class NormalMappingPlugin {
      static getVertexShaderCode() {
        return `
          // Vertex shader code for normal mapping
        `;
      }
      static getFragmentShaderCode() {
        return `
          // Fragment shader code for normal mapping
        `;
      }
    }

    // Add the plugin to the material
    material.addShaderPlugin(NormalMappingPlugin);
    ```

4.  **Render Pass Configuration**: Allow users to configure the render passes used by the pipeline.
    ```typescript
    const pipeline = new ForwardRenderPipeline();
    pipeline.configureRenderPass("shadowMapping", {
      enabled: true,
      resolution: 1024,
    });
    ```

## Data Flow

```
 ┌─────────────┐    ┌──────────────┐    ┌──────────────────┐    ┌─────────────────┐
 │   Scene     │ -> │  Render      │ -> │  Render Stages   │ -> │   Render        │
 │   Graph     │    │  Pipeline    │    │  (Culling,       │    │  Target         │
 │             │    │             │    │  Lighting,       │    │                 │
 └─────────────┘    └──────────────┘    │  Geometry,       │    └─────────────────┘
                  │               │    │  Shadowing...)   │
                  │               │    └──────────────────┘
                  │  ┌──────────┐ │
                  │  │ Materials│ │
                  │  └──────────┘ │
                  └──────────────┘
```

## Benefits

1. **Flexibility**: Easily switch between render paths, add new stages, and customize materials.
2. **Reusability**: Components can be reused across different render paths.
3. **Maintainability**: Clear separation of concerns makes the code easier to maintain and extend.
4. **Performance**: Optimize individual stages without affecting the entire pipeline.
5. **Hardware Abstraction**: Future-proof your engine by designing the system to allow potential abstraction for WebGPU or other APIs.

By implementing these principles, you'll create a rendering system that can adapt to a wide range of rendering techniques and hardware configurations.



## Core Renderer Architecture

### 1. Pipeline-Based Design

```typescript
// The foundation - a modular rendering pipeline
class RenderPipeline {
  private stages: RenderStage[] = [];

  addStage(stage: RenderStage, index?: number): this {
    if (index !== undefined) {
      this.stages.splice(index, 0, stage);
    } else {
      this.stages.push(stage);
    }
    return this;
  }

  removeStage(stageOrIndex: RenderStage | number): this {
    if (typeof stageOrIndex === 'number') {
      this.stages.splice(stageOrIndex, 1);
    } else {
      const index = this.stages.indexOf(stageOrIndex);
      if (index >= 0) this.stages.splice(index, 1);
    }
    return this;
  }

  execute(scene: Scene, camera: Camera, target?: RenderTarget): void {
    const context: RenderContext = {
      scene,
      camera,
      target: target || null,
      visibleObjects: [],
      lights: [],
      // Add other shared state as needed
    };

    // Execute each stage in sequence
    for (const stage of this.stages) {
      if (stage.enabled) {
        stage.execute(context);
      }
    }
  }
}
```

### 2. Plugin-Based Rendering Stages

```typescript
// Base interface for all rendering stages
interface RenderStage {
  name: string;
  enabled: boolean;
  execute(context: RenderContext): void;
}

// Examples of specialized stages
class CullingStage implements RenderStage {
  name = "culling";
  enabled = true;

  execute(context: RenderContext): void {
    // Frustum culling logic
    context.visibleObjects = context.scene.objects.filter(
      obj => context.camera.frustum.intersectsObject(obj)
    );
  }
}

class ShadowMapStage implements RenderStage {
  name = "shadowMap";
  enabled = true;

  execute(context: RenderContext): void {
    // Generate shadow maps for all lights
    for (const light of context.lights) {
      if (light.castShadow) {
        this.renderShadowMap(light, context.visibleObjects);
      }
    }
  }

  private renderShadowMap(light: Light, objects: Object3D[]): void {
    // Shadow map implementation
  }
}

class GeometryStage implements RenderStage {
  name = "geometry";
  enabled = true;

  execute(context: RenderContext): void {
    // Update geometry buffers, etc.
  }
}

class RenderStage implements RenderStage {
  name = "render";
  enabled = true;

  execute(context: RenderContext): void {
    // Main rendering logic
    this.renderObjects(context.visibleObjects, context.camera, context.target);
  }

  private renderObjects(objects: Object3D[], camera: Camera, target: RenderTarget | null): void {
    // Sort objects by material/state
    // Bind appropriate shader and render
  }
}

class PostProcessStage implements RenderStage {
  name = "postProcess";
  enabled = true;
  effects: PostProcessEffect[] = [];

  execute(context: RenderContext): void {
    // Apply post-processing effects
    for (const effect of this.effects) {
      if (effect.enabled) {
        effect.apply(context);
      }
    }
  }
}
```

### 3. Flexible Renderer Configuration

```typescript
// Main renderer class
class Renderer {
  private gl: WebGL2RenderingContext;
  private state: WebGLState;
  private pipeline: RenderPipeline;

  constructor(canvas: HTMLCanvasElement, options?: RendererOptions) {
    this.gl = canvas.getContext('webgl2', options?.contextAttributes)!;
    this.state = new WebGLState(this.gl);
    this.pipeline = this.createDefaultPipeline();

    // Apply configuration
    if (options) {
      this.configure(options);
    }
  }

  private createDefaultPipeline(): RenderPipeline {
    const pipeline = new RenderPipeline();

    // Add default stages
    pipeline
      .addStage(new CullingStage())
      .addStage(new ShadowMapStage())
      .addStage(new GeometryStage())
      .addStage(new RenderStage())
      .addStage(new PostProcessStage());

    return pipeline;
  }

  configure(options: RendererOptions): this {
    // Apply configuration options
    if (options.pixelRatio) {
      this.setPixelRatio(options.pixelRatio);
    }

    if (options.size) {
      this.setSize(options.size.width, options.size.height);
    }

    if (options.clearColor) {
      this.setClearColor(options.clearColor);
    }

    // Enable/disable features
    if (options.shadows !== undefined) {
      this.setShadowsEnabled(options.shadows);
    }

    return this;
  }

  // Methods to customize pipeline
  addStage(stage: RenderStage, index?: number): this {
    this.pipeline.addStage(stage, index);
    return this;
  }

  removeStage(stageOrName: RenderStage | string): this {
    if (typeof stageOrName === 'string') {
      const stage = this.findStageByName(stageOrName);
      if (stage) this.pipeline.removeStage(stage);
    } else {
      this.pipeline.removeStage(stageOrName);
    }
    return this;
  }

  private findStageByName(name: string): RenderStage | undefined {
    return this.pipeline.stages.find(stage => stage.name === name);
  }

  // Main render method
  render(scene: Scene, camera: Camera, target?: RenderTarget): void {
    this.pipeline.execute(scene, camera, target);
  }
}
```

### 4. Rendering Techniques as Plugins

```typescript
// Example render techniques that can be swapped
class ForwardRenderStage implements RenderStage {
  name = "forwardRender";
  enabled = true;

  execute(context: RenderContext): void {
    // Standard forward rendering
    // For each object, set all light uniforms and render
  }
}

class DeferredRenderStage implements RenderStage {
  name = "deferredRender";
  enabled = true;

  // GBuffer setup
  private gBuffer: {
    position: RenderTarget;
    normal: RenderTarget;
    albedo: RenderTarget;
    material: RenderTarget;
  };

  constructor(gl: WebGL2RenderingContext, width: number, height: number) {
    // Initialize GBuffer
    this.gBuffer = {
      position: new RenderTarget(gl, width, height, { format: gl.RGBA16F }),
      normal: new RenderTarget(gl, width, height, { format: gl.RGBA16F }),
      albedo: new RenderTarget(gl, width, height),
      material: new RenderTarget(gl, width, height)
    };
  }

  execute(context: RenderContext): void {
    // 1. Geometry pass - render to GBuffer
    this.geometryPass(context);

    // 2. Lighting pass - compute lighting using GBuffer
    this.lightingPass(context);
  }

  private geometryPass(context: RenderContext): void {
    // Render scene data to GBuffer textures
  }

  private lightingPass(context: RenderContext): void {
    // Apply lighting calculations using GBuffer data
  }
}
```

## Extensibility Mechanisms

### 1. Material System Integration

```typescript
// Material interface with rendering hooks
interface Material {
  name: string;
  type: string;
  uniforms: Record<string, Uniform>;

  // Shader management
  onBeforeCompile(shader: Shader): void;
  customProgramCacheKey(): string;

  // Rendering hooks
  onBeforeRender(renderer: Renderer, scene: Scene, camera: Camera, geometry: Geometry, object: Object3D): void;
  onAfterRender(renderer: Renderer, scene: Scene, camera: Camera, geometry: Geometry, object: Object3D): void;
}

// Example of a custom material
class CustomWaterMaterial implements Material {
  name = "WaterMaterial";
  type = "custom";
  uniforms = {
    time: { value: 0 },
    waveHeight: { value: 0.5 },
    waveSpeed: { value: 1.0 },
    normalMap: { value: null }
  };

  onBeforeCompile(shader: Shader): void {
    // Inject custom shader code
    shader.vertexShader = shader.vertexShader.replace(
      '#include <begin_vertex>',
      `
      #include <begin_vertex>
      float waveHeight = ${this.uniforms.waveHeight.value};
      float waveSpeed = ${this.uniforms.waveSpeed.value};
      float time = ${this.uniforms.time.value};

      // Apply wave effect
      transformed.y += sin(transformed.x * 10.0 + time * waveSpeed) * waveHeight;
      `
    );
  }

  onBeforeRender(renderer: Renderer, scene: Scene, camera: Camera): void {
    // Update time uniform
    this.uniforms.time.value = performance.now() * 0.001;
  }

  customProgramCacheKey(): string {
    // Ensure unique shader for this material
    return `water-${this.uniforms.waveHeight.value}-${this.uniforms.waveSpeed.value}`;
  }

  // Other required methods...
}
```

### 2. Post-Processing Framework

```typescript
// Post-processing effect interface
interface PostProcessEffect {
  name: string;
  enabled: boolean;

  // Core method to apply the effect
  apply(context: RenderContext): void;

  // Optional lifecycle methods
  initialize?(renderer: Renderer): void;
  resize?(width: number, height: number): void;
  dispose?(): void;
}

// Example post-process effect
class BloomEffect implements PostProcessEffect {
  name = "bloom";
  enabled = true;

  private blurTarget1: RenderTarget;
  private blurTarget2: RenderTarget;
  private threshold: number = 0.8;
  private intensity: number = 1.0;

  initialize(renderer: Renderer): void {
    const { width, height } = renderer.getSize();
    this.blurTarget1 = new RenderTarget(renderer.gl, width/2, height/2);
    this.blurTarget2 = new RenderTarget(renderer.gl, width/2, height/2);
  }

  apply(context: RenderContext): void {
    // 1. Extract bright pixels
    this.extractBrightPixels(context.target!, this.blurTarget1);

    // 2. Apply gaussian blur
    this.applyBlur(this.blurTarget1, this.blurTarget2);
    this.applyBlur(this.blurTarget2, this.blurTarget1);

    // 3. Composite with original scene
    this.composite(context.target!, this.blurTarget1, this.intensity);
  }

  // Implementation details for each step...

  resize(width: number, height: number): void {
    this.blurTarget1.resize(width/2, height/2);
    this.blurTarget2.resize(width/2, height/2);
  }
}
```

### 3. Renderer Extensions

```typescript
// Extension mechanism for renderer
interface RendererExtension {
  name: string;

  // Lifecycle hooks
  init(renderer: Renderer): void;
  beforeRender?(scene: Scene, camera: Camera): void;
  afterRender?(scene: Scene, camera: Camera): void;
  dispose?(): void;
}

// Example extension - FPS counter
class FPSMonitorExtension implements RendererExtension {
  name = "fpsMonitor";

  private frameCount = 0;
  private lastTime = 0;
  private fps = 0;
  private element: HTMLElement | null = null;

  init(renderer: Renderer): void {
    this.lastTime = performance.now();

    // Create display element
    this.element = document.createElement('div');
    this.element.style.position = 'absolute';
    this.element.style.top = '10px';
    this.element.style.left = '10px';
    this.element.style.color = 'white';
    this.element.style.backgroundColor = 'rgba(0,0,0,0.5)';
    this.element.style.padding = '5px';
    document.body.appendChild(this.element);
  }

  afterRender(): void {
    this.frameCount++;

    const now = performance.now();
    const elapsed = now - this.lastTime;

    if (elapsed >= 1000) {
      this.fps = Math.round((this.frameCount * 1000) / elapsed);
      this.frameCount = 0;
      this.lastTime = now;

      if (this.element) {
        this.element.textContent = `FPS: ${this.fps}`;
      }
    }
  }

  dispose(): void {
    if (this.element && this.element.parentNode) {
      this.element.parentNode.removeChild(this.element);
    }
  }
}
```

## Putting It All Together: Usage Example

```typescript
// Creating a customized renderer
const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const renderer = new Renderer(canvas, {
  clearColor: [0.1, 0.1, 0.1, 1.0],
  shadows: true,
  pixelRatio: window.devicePixelRatio
});

// Add extensions
renderer.addExtension(new FPSMonitorExtension());

// Configure post-processing
const postProcess = renderer.findStageByName('postProcess') as PostProcessStage;
postProcess.effects.push(new BloomEffect());

// Switch rendering technique (if needed)
renderer.removeStage('render');
renderer.addStage(new DeferredRenderStage(renderer.gl, canvas.width, canvas.height));

// Create scene and camera
const scene = new Scene();
const camera = new PerspectiveCamera(75, canvas.width / canvas.height, 0.1, 1000);

// Add custom water material
const waterGeometry = new PlaneGeometry(10, 10, 100, 100);
const waterMaterial = new CustomWaterMaterial();
const water = new Mesh(waterGeometry, waterMaterial);
scene.add(water);

// Animation loop
function animate() {
  requestAnimationFrame(animate);

  // Update scene
  water.rotation.x += 0.01;

  // Render scene
  renderer.render(scene, camera);
}
animate();
```

## Benefits of This Design

1. **Modularity**: Each component has a single responsibility
2. **Extensibility**: Easy to add new features via stages, materials, effects
3. **Configurability**: Easy to swap components or change behavior
4. **Maintainability**: Components can be developed and tested in isolation
5. **Performance**: Can optimize critical paths independently
6. **Reusability**: Components can be reused across projects
7. **Adaptability**: Can adapt to different rendering techniques (forward/deferred/etc.)
