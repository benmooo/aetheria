import { useEffect, useRef, useState } from "react";
import { WebGLContext } from "./webgl/webglContext";
import ColorMultiplier from "./components/controls/ColorMultiplierController";
import { ThemeProvider } from "./components/theme-provider";
import TransformController from "./components/controls/TransformController";
import CameraController from "./components/controls/CameraController";

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [red, setRed] = useState(1.0);
  const [green, setGreen] = useState(1.0);
  const [blue, setBlue] = useState(1.0);

  const [width, setWidth] = useState(innerWidth);
  const [height, setHeight] = useState(innerHeight);

  // transform
  const [translationX, setTranslationX] = useState(0);
  const [translationY, setTranslationY] = useState(0);
  const [translationZ, setTranslationZ] = useState(0);
  const [rotationX, setRotationX] = useState(0);
  const [rotationY, setRotationY] = useState(0);
  const [rotationZ, setRotationZ] = useState(0);
  const [scaleX, setScaleX] = useState(1);
  const [scaleY, setScaleY] = useState(1);
  const [scaleZ, setScaleZ] = useState(1);

  // camera
  const [positionX, setPositionX] = useState(-5);
  const [positionY, setPositionY] = useState(5);
  const [positionZ, setPositionZ] = useState(5);
  const [targetX, setTargetX] = useState(0);
  const [targetY, setTargetY] = useState(0);
  const [targetZ, setTargetZ] = useState(0);
  const [fov, setFov] = useState(Math.PI / 4); // 45 degrees
  const [near, setNear] = useState(0.1);
  const [far, setFar] = useState(100);

  const handleResize = () => {
    setWidth(innerWidth);
    setHeight(innerHeight);
  };

  const handleTransformChange = (values: {
    translationX: number;
    translationY: number;
    translationZ: number;
    rotationX: number;
    rotationY: number;
    rotationZ: number;
    scaleX: number;
    scaleY: number;
    scaleZ: number;
  }) => {
    setTranslationX(values.translationX);
    setTranslationY(values.translationY);
    setTranslationZ(values.translationZ);
    setRotationX(values.rotationX);
    setRotationY(values.rotationY);
    setRotationZ(values.rotationZ);
    setScaleX(values.scaleX);
    setScaleY(values.scaleY);
    setScaleZ(values.scaleZ);
  };
  const handleResetTransform = () => {
    setTranslationX(0);
    setTranslationY(0);
    setTranslationZ(0);
    setRotationX(0);
    setRotationY(0);
    setRotationZ(0);
    setScaleX(1);
    setScaleY(1);
    setScaleZ(1);
  };

  const handleCameraChange = (values: {
    positionX: number;
    positionY: number;
    positionZ: number;
    targetX: number;
    targetY: number;
    targetZ: number;
    fov: number;
    near: number;
    far: number;
  }) => {
    setPositionX(values.positionX);
    setPositionY(values.positionY);
    setPositionZ(values.positionZ);
    setTargetX(values.targetX);
    setTargetY(values.targetY);
    setTargetZ(values.targetZ);
    setFov(values.fov);
    setNear(values.near);
    setFar(values.far);
  };

  const handleResetCamera = () => {
    setPositionX(0);
    setPositionY(0);
    setPositionZ(5);
    setTargetX(0);
    setTargetY(0);
    setTargetZ(0);
    setFov(Math.PI / 4);
    setNear(0.1);
    setFar(100);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;

    let webGLContext: WebGLContext | null = null;
    try {
      webGLContext = new WebGLContext(canvasRef.current.id); // 'webglCanvas'

      canvasRef.current.width = width;
      canvasRef.current.height = height;
      webGLContext.gl.viewport(0, 0, width, height);
      webGLContext.colorMultiplier = [red, green, blue];
      webGLContext.cube.transform.translateX(translationX);
      webGLContext.cube.transform.translateY(translationY);
      webGLContext.cube.transform.translateZ(translationZ);
      webGLContext.cube.transform.rotateX(rotationX);
      webGLContext.cube.transform.rotateY(rotationY);
      webGLContext.cube.transform.rotateZ(rotationZ);
      webGLContext.cube.transform.scaleX(scaleX);
      webGLContext.cube.transform.scaleY(scaleY);
      webGLContext.cube.transform.scaleZ(scaleZ);

      // Update camera properties
      webGLContext.camera.position[0] = positionX;
      webGLContext.camera.position[1] = positionY;
      webGLContext.camera.position[2] = positionZ;
      webGLContext.camera.target[0] = targetX;
      webGLContext.camera.target[1] = targetY;
      webGLContext.camera.target[2] = targetZ;
      webGLContext.camera.fov = fov;
      webGLContext.camera.near = near;
      webGLContext.camera.far = far;
      webGLContext.camera.aspect = width / height;
      webGLContext.camera.updateViewMatrix();
      webGLContext.camera.updateProjectionMatrix();

      const renderLoop = () => {
        if (webGLContext) {
          webGLContext.render();
        }
        requestAnimationFrame(renderLoop);
      };

      renderLoop();
    } catch (error) {
      console.error(error);
    }

    return () => {};
  }, [
    red,
    green,
    blue,
    width,
    height,
    translationX,
    translationY,
    translationZ,
    rotationX,
    rotationY,
    rotationZ,
    scaleX,
    scaleY,
    scaleZ,
  ]);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="relative">
        <canvas
          id="webglCanvas"
          ref={canvasRef}
          height={width}
          width={height}
        />

        <div className="absolute top-0 right-0 w-52 h-full p-2 flex flex-col space-y-2">
          <ColorMultiplier
            red={red}
            green={green}
            blue={blue}
            onRedChange={setRed}
            onGreenChange={setGreen}
            onBlueChange={setBlue}
          ></ColorMultiplier>

          <TransformController
            translationX={translationX}
            translationY={translationY}
            translationZ={translationZ}
            rotationX={rotationX}
            rotationY={rotationY}
            rotationZ={rotationZ}
            scaleX={scaleX}
            scaleY={scaleY}
            scaleZ={scaleZ}
            onChange={handleTransformChange}
            onReset={handleResetTransform}
          ></TransformController>

          <CameraController
            positionX={positionX}
            positionY={positionY}
            positionZ={positionZ}
            targetX={targetX}
            targetY={targetY}
            targetZ={targetZ}
            fov={fov}
            near={near}
            far={far}
            onChange={handleCameraChange}
            onReset={handleResetCamera}
          />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
