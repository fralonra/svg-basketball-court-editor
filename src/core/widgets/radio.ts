import { BaseWidget, IWidgetProps } from './base';
import { RadioElement } from '../elements/radio';

interface IRadioWidgetProps extends IWidgetProps {
  label: string;
}

class RadioWidget extends BaseWidget {
  protected props: IRadioWidgetProps = { label: 'Radio' };

  constructor() {
    super();

    this.name = 'radio';
    this.description = 'radio description';
    this.elementClass = RadioElement;
  }

  onContentCreated(content: HTMLElement): void {
    content.setAttribute('labelText', this.props.label);
  }
}

export { RadioWidget };
