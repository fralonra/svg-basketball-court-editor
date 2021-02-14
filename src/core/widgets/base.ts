import { WrapperElement } from '../elements/wrapper';
import { Boundary } from '../modules/boundary';

interface IWidgetProps {
  x?: number;
  y?: number;
  [key: string]: any;
}

type THTMLCtor = new (withWrapper: boolean) => HTMLElement;

abstract class BaseWidget {
  name = 'base';
  description = 'base widget';
  icon = '';
  protected props: IWidgetProps = {};
  protected elementClass: THTMLCtor | string;
  protected wrapper: WrapperElement;
  private boundary: Boundary = new Boundary();
  private boundingRelatedProps = [
    'x',
    'y',
    'width',
    'height',
    'text',
    'label',
    'fontSize',
  ];

  get bounding(): Boundary {
    return this.boundary;
  }

  getProps(): IWidgetProps {
    return this.props;
  }

  renderContentElement(withWrapper: boolean = false): HTMLElement {
    const content =
      typeof this.elementClass === 'string'
        ? document.createElement(this.elementClass)
        : new (this.elementClass as THTMLCtor)(withWrapper);
    content.draggable = false;
    if (!withWrapper) {
      content.style.position = 'absolute';
      for (const key in this.props) {
        const value = this.props[key];
        switch (key) {
          case 'x':
            content.style.left = value + 'px';
            break;
          case 'y':
            content.style.top = value + 'px';
            break;
          case 'color':
            content.style.color = value;
            break;
          case 'fontSize':
            content.style.fontSize = value + 'px';
            break;
          case 'height':
            content.style.height = value + 'px';
            break;
          case 'label':
            content.setAttribute('labelText', value);
            break;
          case 'src':
            content.setAttribute('src', value);
            break;
          case 'text':
            content.textContent = value;
            break;
          case 'width':
            content.style.width = value + 'px';
            break;
        }
      }
    }

    this.onContentCreated(content);

    return content;
  }

  renderWrapperElement(): WrapperElement {
    if (!this.wrapper) {
      this.wrapper = new WrapperElement({
        content: this.renderContentElement(true),
      });
    }
    return this.wrapper;
  }

  setProp(key: string, value: any): void {
    this.props[key] = value;
    this.updateDom(key, value);
    if (this.boundingRelatedProps.includes(key)) {
      this.updateBoundary();
    }

    this.onPropChanged(key, value);
  }

  updateBoundary(): void {
    const bounding = this.renderWrapperElement().bounding;
    this.boundary.update(bounding);
  }

  updateDom(key?: string, value?: any): void {
    if (!key) {
      for (const key in this.props) {
        this.updateDom(key, this.props[key]);
      }
    } else {
      this.renderWrapperElement().updateDom(key, value);
    }
  }

  protected onContentCreated(content: HTMLElement): void {}

  protected onPropChanged(key: string, value: any): void {}
}

export { BaseWidget, IWidgetProps };
