import React from "react";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "../ui/button";
interface TransformControllerProps {
  translationX: number;
  translationY: number;
  translationZ: number;
  rotationX: number;
  rotationY: number;
  rotationZ: number;
  scaleX: number;
  scaleY: number;
  scaleZ: number;
  onChange: (values: {
    translationX: number;
    translationY: number;
    translationZ: number;
    rotationX: number;
    rotationY: number;
    rotationZ: number;
    scaleX: number;
    scaleY: number;
    scaleZ: number;
  }) => void;
  // reset to default values
  onReset: () => void;
}

const TransformController: React.FC<TransformControllerProps> = ({
  translationX,
  translationY,
  translationZ,
  rotationX,
  rotationY,
  rotationZ,
  scaleX,
  scaleY,
  scaleZ,
  onChange,
  onReset,
}) => {
  const handleTranslationXChange = (value: number[]) => {
    onChange({
      translationX: value[0],
      translationY,
      translationZ,
      rotationX,
      rotationY,
      rotationZ,
      scaleX,
      scaleY,
      scaleZ,
    });
  };

  const handleTranslationYChange = (value: number[]) => {
    onChange({
      translationX,
      translationY: value[0],
      translationZ,
      rotationX,
      rotationY,
      rotationZ,
      scaleX,
      scaleY,
      scaleZ,
    });
  };

  const handleTranslationZChange = (value: number[]) => {
    onChange({
      translationX,
      translationY,
      translationZ: value[0],
      rotationX,
      rotationY,
      rotationZ,
      scaleX,
      scaleY,
      scaleZ,
    });
  };

  const handleRotationXChange = (value: number[]) => {
    onChange({
      translationX,
      translationY,
      translationZ,
      rotationX: value[0],
      rotationY,
      rotationZ,
      scaleX,
      scaleY,
      scaleZ,
    });
  };

  const handleRotationYChange = (value: number[]) => {
    onChange({
      translationX,
      translationY,
      translationZ,
      rotationX,
      rotationY: value[0],
      rotationZ,
      scaleX,
      scaleY,
      scaleZ,
    });
  };

  const handleRotationZChange = (value: number[]) => {
    onChange({
      translationX,
      translationY,
      translationZ,
      rotationX,
      rotationY,
      rotationZ: value[0],
      scaleX,
      scaleY,
      scaleZ,
    });
  };

  const handleScaleXChange = (value: number[]) => {
    onChange({
      translationX,
      translationY,
      translationZ,
      rotationX,
      rotationY,
      rotationZ,
      scaleX: value[0],
      scaleY,
      scaleZ,
    });
  };

  const handleScaleYChange = (value: number[]) => {
    onChange({
      translationX,
      translationY,
      translationZ,
      rotationX,
      rotationY,
      rotationZ,
      scaleX,
      scaleY: value[0],
      scaleZ,
    });
  };

  const handleScaleZChange = (value: number[]) => {
    onChange({
      translationX,
      translationY,
      translationZ,
      rotationX,
      rotationY,
      rotationZ,
      scaleX,
      scaleY,
      scaleZ: value[0],
    });
  };

  return (
    <div className="flex flex-col gap-2 p-4 border-1 rounded-md">
      <label className="text-xs text-muted-foreground">Transform</label>
      <div className="grid gap-4">
        <div className="flex space-x-2">
          <Label htmlFor="translationX">Tx</Label>
          <Slider
            id="translationX"
            defaultValue={[translationX]}
            value={[translationX]}
            min={-10}
            max={10}
            step={0.1}
            onValueChange={handleTranslationXChange}
          />
        </div>
        <div className="flex space-x-2">
          <Label htmlFor="translationY">Ty</Label>
          <Slider
            id="translationY"
            defaultValue={[translationY]}
            value={[translationY]}
            min={-1}
            max={1}
            step={0.1}
            onValueChange={handleTranslationYChange}
          />
        </div>
        <div className="flex space-x-2">
          <Label htmlFor="translationZ">Tz</Label>
          <Slider
            id="translationZ"
            defaultValue={[translationZ]}
            value={[translationZ]}
            min={-1}
            max={1}
            step={0.1}
            onValueChange={handleTranslationZChange}
          />
        </div>
        <div className="flex space-x-2">
          <Label htmlFor="rotationX">Rx</Label>
          <Slider
            id="rotationX"
            defaultValue={[rotationX]}
            value={[rotationX]}
            min={-Math.PI}
            max={Math.PI}
            step={0.1}
            onValueChange={handleRotationXChange}
          />
        </div>
        <div className="flex space-x-2">
          <Label htmlFor="rotationY">Ry</Label>
          <Slider
            id="rotationY"
            defaultValue={[rotationY]}
            value={[rotationY]}
            min={-Math.PI}
            max={Math.PI}
            step={0.1}
            onValueChange={handleRotationYChange}
          />
        </div>
        <div className="flex space-x-2">
          <Label htmlFor="rotationZ">Rz</Label>
          <Slider
            id="rotationZ"
            defaultValue={[rotationZ]}
            value={[rotationZ]}
            min={-Math.PI}
            max={Math.PI}
            step={0.1}
            onValueChange={handleRotationZChange}
          />
        </div>
        <div className="flex space-x-2">
          <Label htmlFor="scaleX">Sx</Label>
          <Slider
            id="scaleX"
            defaultValue={[scaleX]}
            value={[scaleX]}
            min={0.1}
            max={5}
            step={0.1}
            onValueChange={handleScaleXChange}
          />
        </div>
        <div className="flex space-x-2">
          <Label htmlFor="scaleY">Sy</Label>
          <Slider
            id="scaleY"
            defaultValue={[scaleY]}
            value={[scaleY]}
            min={0.1}
            max={5}
            step={0.1}
            onValueChange={handleScaleYChange}
          />
        </div>
        <div className="flex space-x-2">
          <Label htmlFor="scaleZ">Sz</Label>
          <Slider
            id="scaleZ"
            defaultValue={[scaleZ]}
            value={[scaleZ]}
            min={0.1}
            max={5}
            step={0.1}
            onValueChange={handleScaleZChange}
          />
        </div>
      </div>

      <div className="flex justify-center mt-2">
        <Button onClick={onReset} className="h-6">
          Reset
        </Button>
      </div>
    </div>
  );
};

export default TransformController;
