import { IProjectData, Project } from '../project';
import type { IProjectMeta } from '../project';
import type { SVGDocument, SVGNode } from '../svg-node';

interface ISVGProjectData extends IProjectData<SVGDocument> {
  meta: IProjectMeta;
}

interface ISVGProjectMeta extends IProjectMeta {
  width: number;
}

class SVGProject extends Project<SVGDocument> {
  protected DEFAULT_WIDTH = 0;

  adjustProject(): void {
    if (this.DEFAULT_WIDTH > 0) {
      const parsedWidth = Number(this.document.root.attrs.width);
      const presetWidth = isNaN(parsedWidth) ? this.DEFAULT_WIDTH : parsedWidth;

      const ratio = this.meta.width / presetWidth;
      if (ratio === 1) return;
      this.calculatePosition(this.document.root, ratio);
    }
  }

  toElement(
    callback?: (element: SVGElement, node: SVGNode) => void,
  ): SVGElement {
    this.adjustProject();

    return this.document.toElement(callback);
  }

  protected calculatePosition(node: SVGNode, ratio: number): void {
    for (const key in node.attrs) {
      switch (key) {
        case 'x':
        case 'y':
        case 'width':
        case 'height':
          node.attrs[key] = Number(
            (ratio * (node.attrs[key] as number)).toFixed(2),
          );
          break;
        case 'd':
          // TODO: this will make coordinate with integer number not work
          const d = (node.attrs[key] as string).replaceAll(
            /(\d)+\.(\d+)/g,
            (match) => (Number(match) * ratio).toFixed(2),
          );
          node.attrs[key] = d;
      }
    }

    if (node.children) {
      node.children.forEach((child) => {
        this.calculatePosition(child, ratio);
      });
    }
  }
}

export { SVGProject, ISVGProjectMeta };
