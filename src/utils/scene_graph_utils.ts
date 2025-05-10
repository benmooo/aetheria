import { SceneNode } from "@/scene/scene_node";

export function traverseSceneGraph(
  node: SceneNode,
  callback: (node: SceneNode) => void,
): void {
  callback(node);
  for (const child of node.children) {
    traverseSceneGraph(child, callback);
  }
}
