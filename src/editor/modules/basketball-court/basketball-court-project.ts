import type { SVGDocument } from '../svg-node';
import { ISVGProjectMeta, SVGProject } from '../svg-project';

interface IBasketballCourtMeta extends ISVGProjectMeta {
  width: number;
}

class BasketballCourtProject extends SVGProject {
  protected DEFAULT_WIDTH = 400;

  constructor(
    name: string,
    meta: IBasketballCourtMeta | null,
    public document: SVGDocument,
  ) {
    super(name, meta, document);

    this.meta = {
      width: this.DEFAULT_WIDTH,
      ...this.meta,
    };
  }
}

export { BasketballCourtProject, IBasketballCourtMeta };
