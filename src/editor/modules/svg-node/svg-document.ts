import type { SVGNode } from '.';
import type { IDocument } from '../project';

class SVGDocument implements IDocument {
  root: SVGNode | null = null;

  init(): void {}

  toElement(
    callback?: (element: SVGElement, node: SVGNode) => void,
  ): SVGElement {
    if (!this.root) {
      throw new Error('No root node found for document.s');
    }

    return this.root.toElement(callback);
  }
}

export { SVGDocument };
