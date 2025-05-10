import { Cube } from "@/graphics/geometry/cube";
import { Transform } from "./transform";

export class SceneNode {
  transform: Transform;
  children: SceneNode[];
  geometry: Cube | null;

  constructor(
    transform: Transform = new Transform(),
    children: SceneNode[] = [],
    geometry: Cube | null = null,
  ) {
    this.transform = transform;
    this.children = children;
    this.geometry = geometry;
  }

  addChild(node: SceneNode): void {
      this.children.push(node);
  }
}
