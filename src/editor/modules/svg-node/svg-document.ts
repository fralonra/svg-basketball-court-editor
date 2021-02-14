import type { SVGNode } from '.';

class SVGDocument {
  constructor(public root: SVGNode) {}

  toElement(
    callback?: (element: SVGElement, node: SVGNode) => void,
  ): SVGElement {
    if (!this.root) {
      throw new Error('No root node found for document');
    }

    return this.root.toElement(callback);
  }
}

export { SVGDocument };
