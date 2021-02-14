import { Boundary } from './boundary';

enum AlignType {
  top = 'top',
  right = 'right',
  bottom = 'bottom',
  left = 'left',
  vCenter = 'vCenter',
  hCenter = 'hCenter',
}

type IAlignBase = {
  [base in AlignType]?: number;
};

interface IAlignBaseResult {
  x?: IAlignBase;
  y?: IAlignBase;
}

interface IAlignPosition {
  guide: number;
  target: number;
}

interface IAlignPositionResult {
  x?: IAlignPosition;
  y?: IAlignPosition;
}

interface IAlignerOptions {
  threshold?: number;
  top?: boolean;
  right?: boolean;
  bottom?: boolean;
  left?: boolean;
  vCenter?: boolean;
  hCenter?: boolean;
  alignVOrder?: string[];
  alignHOrder?: string[];
}

class Aligner {
  private options: IAlignerOptions;

  constructor(options: IAlignerOptions = {}) {
    this.options = {
      threshold: 3,
      top: true,
      left: true,
      right: true,
      bottom: true,
      hCenter: true,
      vCenter: true,
      alignHOrder: ['left', 'right', 'hCenter'],
      alignVOrder: ['top', 'bottom', 'vCenter'],
      ...options,
    };

    this.options.alignHOrder = this.options.alignHOrder.filter(
      (order) => this.options[order],
    );
    this.options.alignVOrder = this.options.alignVOrder.filter(
      (order) => this.options[order],
    );
  }

  align(target: Boundary, boundaries: Boundary[]): IAlignBaseResult {
    const result: IAlignBaseResult = {};
    for (const boundary of boundaries) {
      if (!result.x) {
        const x = this.findBaseLine(target, boundary, this.options.alignHOrder);
        if (x !== null) result.x = x;
      }
      if (!result.y) {
        const y = this.findBaseLine(target, boundary, this.options.alignVOrder);
        if (y !== null) result.y = y;
      }
    }
    return result;
  }

  position(
    boundary: Boundary,
    baseResult: IAlignBaseResult,
  ): IAlignPositionResult {
    const result: IAlignPositionResult = {};
    if (baseResult.x) {
      for (const key in baseResult.x) {
        switch (key) {
          case 'right':
            result.x = {
              guide: baseResult.x[key],
              target: baseResult.x[key] - boundary.width,
            };
            break;
          case 'left':
            result.x = {
              guide: baseResult.x[key],
              target: baseResult.x[key],
            };
            break;
          case 'hCenter':
            result.x = {
              guide: baseResult.x[key],
              target: baseResult.x[key] - boundary.width / 2,
            };
            break;
        }
      }
    }
    if (baseResult.y) {
      for (const key in baseResult.y) {
        switch (key) {
          case 'top':
            result.y = {
              guide: baseResult.y[key],
              target: baseResult.y[key],
            };
            break;
          case 'bottom':
            result.y = {
              guide: baseResult.y[key],
              target: baseResult.y[key] - boundary.height,
            };
            break;
          case 'vCenter':
            result.y = {
              guide: baseResult.y[key],
              target: baseResult.y[key] - boundary.height / 2,
            };
            break;
        }
      }
    }
    return result;
  }

  private checkAlign(a: number, b: number): boolean {
    return Math.abs(a - b) < this.options.threshold;
  }

  private findBaseLine(
    target: Boundary,
    staff: Boundary,
    order: string[],
  ): IAlignBase {
    const base = order.find((order) =>
      this.checkAlign(target[order], staff[order]),
    );
    return base ? { [base]: staff[base] } : null;
  }
}

export { Aligner };
