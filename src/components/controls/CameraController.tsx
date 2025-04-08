import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

interface CameraControllerProps {
  // Camera position
  positionX: number;
  positionY: number;
  positionZ: number;

  // Look target
  targetX: number;
  targetY: number;
  targetZ: number;

  // Camera parameters
  fov: number;
  near: number;
  far: number;

  onChange: (values: {
    positionX: number;
    positionY: number;
    positionZ: number;
    targetX: number;
    targetY: number;
    targetZ: number;
    fov: number;
    near: number;
    far: number;
  }) => void;

  onReset: () => void;
}

const CameraController: React.FC<CameraControllerProps> = ({
  positionX,
  positionY,
  positionZ,
  targetX,
  targetY,
  targetZ,
  fov,
  near,
  far,
  onChange,
  onReset,
}) => {
  // Helper function to update a single property
  const updateProperty = (property: string, value: number) => {
    const newValues = {
      positionX,
      positionY,
      positionZ,
      targetX,
      targetY,
      targetZ,
      fov,
      near,
      far,
    };

    (newValues as any)[property] = value;
    onChange(newValues);
  };

  return (
    <div className="flex flex-col gap-2 p-4 border-1 rounded-md">
      <label className="text-xs text-muted-foreground">Camera Controls</label>

      <Tabs defaultValue="position">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="position">P</TabsTrigger>
          <TabsTrigger value="target">T</TabsTrigger>
          <TabsTrigger value="settings">S</TabsTrigger>
        </TabsList>

        <TabsContent value="position" className="space-y-3 pt-2">
          <div className="flex space-x-2 items-center">
            <Label htmlFor="positionX" className="w-10">
              X
            </Label>
            <Slider
              id="positionX"
              value={[positionX]}
              min={-20}
              max={20}
              step={0.1}
              onValueChange={(value) => updateProperty("positionX", value[0])}
            />
            <span className="text-xs w-12 text-right">
              {positionX.toFixed(1)}
            </span>
          </div>

          <div className="flex space-x-2 items-center">
            <Label htmlFor="positionY" className="w-10">
              Y
            </Label>
            <Slider
              id="positionY"
              value={[positionY]}
              min={-20}
              max={20}
              step={0.1}
              onValueChange={(value) => updateProperty("positionY", value[0])}
            />
            <span className="text-xs w-12 text-right">
              {positionY.toFixed(1)}
            </span>
          </div>

          <div className="flex space-x-2 items-center">
            <Label htmlFor="positionZ" className="w-10">
              Z
            </Label>
            <Slider
              id="positionZ"
              value={[positionZ]}
              min={-20}
              max={20}
              step={0.1}
              onValueChange={(value) => updateProperty("positionZ", value[0])}
            />
            <span className="text-xs w-12 text-right">
              {positionZ.toFixed(1)}
            </span>
          </div>
        </TabsContent>

        <TabsContent value="target" className="space-y-3 pt-2">
          <div className="flex space-x-2 items-center">
            <Label htmlFor="targetX" className="w-10">
              X
            </Label>
            <Slider
              id="targetX"
              value={[targetX]}
              min={-20}
              max={20}
              step={0.1}
              onValueChange={(value) => updateProperty("targetX", value[0])}
            />
            <span className="text-xs w-12 text-right">
              {targetX.toFixed(1)}
            </span>
          </div>

          <div className="flex space-x-2 items-center">
            <Label htmlFor="targetY" className="w-10">
              Y
            </Label>
            <Slider
              id="targetY"
              value={[targetY]}
              min={-20}
              max={20}
              step={0.1}
              onValueChange={(value) => updateProperty("targetY", value[0])}
            />
            <span className="text-xs w-12 text-right">
              {targetY.toFixed(1)}
            </span>
          </div>

          <div className="flex space-x-2 items-center">
            <Label htmlFor="targetZ" className="w-10">
              Z
            </Label>
            <Slider
              id="targetZ"
              value={[targetZ]}
              min={-20}
              max={20}
              step={0.1}
              onValueChange={(value) => updateProperty("targetZ", value[0])}
            />
            <span className="text-xs w-12 text-right">
              {targetZ.toFixed(1)}
            </span>
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-3 pt-2">
          <div className="flex space-x-2 items-center">
            <Label htmlFor="fov" className="w-10">
              FOV
            </Label>
            <Slider
              id="fov"
              value={[fov]}
              min={0.1}
              max={Math.PI}
              step={0.05}
              onValueChange={(value) => updateProperty("fov", value[0])}
            />
            <span className="text-xs w-12 text-right">
              {Math.round((fov * 180) / Math.PI)}°
            </span>
          </div>

          <div className="flex space-x-2 items-center">
            <Label htmlFor="near" className="w-10">
              Near
            </Label>
            <Slider
              id="near"
              value={[near]}
              min={0.01}
              max={10}
              step={0.01}
              onValueChange={(value) => updateProperty("near", value[0])}
            />
            <span className="text-xs w-12 text-right">{near.toFixed(2)}</span>
          </div>

          <div className="flex space-x-2 items-center">
            <Label htmlFor="far" className="w-10">
              Far
            </Label>
            <Slider
              id="far"
              value={[far]}
              min={10}
              max={1000}
              step={10}
              onValueChange={(value) => updateProperty("far", value[0])}
            />
            <span className="text-xs w-12 text-right">{far.toFixed(0)}</span>
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex justify-between mt-3">
        <Button onClick={onReset} variant="outline" size="sm">
          Reset Camera
        </Button>
      </div>

      <div className="mt-2 text-xs text-muted-foreground">
        <p>Tip: Use WASD keys to move and arrow keys to look around</p>
      </div>
    </div>
  );
};

export default CameraController;
