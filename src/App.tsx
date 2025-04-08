import { useEffect, useRef, useState } from "react";
import { WebGLContext } from "./webgl/webglContext";
import ColorMultiplier from "./components/controls/ColorMultiplierController";
import { ThemeProvider } from "./components/theme-provider";
import TransformController from "./components/controls/TransformController";

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
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
