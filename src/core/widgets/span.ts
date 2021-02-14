import { BaseWidget, IWidgetProps } from './base';

interface ISpanWidgetProps extends IWidgetProps {
  color: string;
  fontSize: number;
  text: string;
}

class SpanWidget extends BaseWidget {
  protected props: ISpanWidgetProps = {
    color: '#ffffff',
    fontSize: 16,
    text: 'TEXT',
  };

  constructor() {
    super();

    this.name = 'span';
    this.description = 'span description';
    this.elementClass = 'span';
  }

  onContentCreated(content: HTMLSpanElement): void {
    content.style.userSelect = 'none';
  }
}

export { SpanWidget };
