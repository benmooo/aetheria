import { Slider } from "@/components/ui/slider";

interface ColorMultiplierProps {
  red: number;
  green: number;
  blue: number;
  onRedChange: (value: number) => void;
  onGreenChange: (value: number) => void;
  onBlueChange: (value: number) => void;
}

const ColorMultiplierControls: React.FC<ColorMultiplierProps> = ({
  red,
  green,
  blue,
  onRedChange,
  onGreenChange,
  onBlueChange,
}) => {
  return (
    <div className="flex flex-col gap-2 p-4 border-1 rounded-md">
      <label className="text-xs text-muted-foreground">Color Multiplier</label>
      <div className="flex items-center space-x-2">
        <label htmlFor="red" className="text-right text-sm font-medium w-8">
          R:
        </label>
        <Slider
          id="red"
          value={[red]}
          min={0}
          max={1}
          step={0.01}
          onValueChange={(value) => onRedChange(value[0])}
          className="w-full"
        />
      </div>
      <div className="flex items-center space-x-2">
        <label htmlFor="green" className="text-right text-sm font-medium w-8">
          G:
        </label>
        <Slider
          id="green"
          value={[green]}
          min={0}
          max={1}
          step={0.01}
          onValueChange={(value) => onGreenChange(value[0])}
          className="w-full"
        />
      </div>
      <div className="flex items-center space-x-2">
        <label htmlFor="blue" className="text-right text-sm font-medium w-8">
          B:
        </label>
        <Slider
          id="blue"
          value={[blue]}
          min={0}
          max={1}
          step={0.01}
          onValueChange={(value) => onBlueChange(value[0])}
          className="w-full"
        />
      </div>
    </div>
  );
};

export default ColorMultiplierControls;
