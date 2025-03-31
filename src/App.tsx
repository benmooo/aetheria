import { useEffect, useRef, useState } from "react";
import { WebGLContext } from "./webgl/webglContext";
import ColorMultiplier from "./components/controls/ColorMultiplier";
import { ThemeProvider } from "./components/theme-provider";

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [red, setRed] = useState(1.0);
  const [green, setGreen] = useState(1.0);
  const [blue, setBlue] = useState(1.0);

  const [width, setWidth] = useState(innerWidth);
  const [height, setHeight] = useState(innerHeight);

  const handleResize = () => {
    setWidth(innerWidth);
    setHeight(innerHeight);
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
      webGLContext.gl.viewport(0, 0, width, height)
      const renderLoop = () => {
        if (webGLContext) {
          webGLContext.colorMultiplier = [red, green, blue];
          webGLContext.render();
        }
        requestAnimationFrame(renderLoop);
      };

      renderLoop();
    } catch (error) {
      console.error(error);
    }

    return () => {};
  }, [red, green, blue, width, height]);

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
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
