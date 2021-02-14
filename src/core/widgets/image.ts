import { BaseWidget, IWidgetProps } from './base';

interface IImageWidgetProps extends IWidgetProps {
  height: number;
  src: string;
  width: number;
}

class ImageWidget extends BaseWidget {
  protected props: IImageWidgetProps = {
    height: 100,
    src:
      'https://image.shutterstock.com/image-vector/default-ui-image-placeholder-wireframes-260nw-1037719192.jpg',
    width: 100,
  };
  private content: HTMLImageElement;

  constructor() {
    super();

    this.name = 'image';
    this.description = 'image description';
    this.elementClass = 'img';
  }

  onContentCreated(content: HTMLImageElement): void {
    this.content = content;
    this.content.style.userSelect = 'none';
  }

  onPropChanged(key: string, value: any): void {
    if (this.content && key === 'src') {
      this.content.onload = this.onLoad.bind(this);
    }
  }

  private onLoad(): void {
    this.setProp('width', this.content.naturalWidth);
    this.setProp('height', this.content.naturalHeight);
    this.content.onload = null;
  }
}

export { ImageWidget };
