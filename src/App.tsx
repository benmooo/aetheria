import { useEffect, useRef } from "react";

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    let gl: WebGL2RenderingContext;

    try {
      gl = canvasRef.current.getContext("webgl2")!; // 'webglCanvas'
      const render = () => {};

      render();
    } catch (error) {
      console.error(error);
    }

    return () => {};
  }, []);

  return (
    <div className="h-full bg-black">
      <canvas ref={canvasRef} height={innerHeight} width={innerWidth} />
    </div>
  );
}

export default App;
