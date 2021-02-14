import { BaseWidget, IWidgetProps } from './base';
import { CheckboxElement } from '../elements/checkbox';

interface ICheckboxWidgetProps extends IWidgetProps {
  label: string;
}

class CheckboxWidget extends BaseWidget {
  protected props: ICheckboxWidgetProps = { label: 'Checkbox' };

  constructor() {
    super();

    this.name = 'checkbox';
    this.description = 'checkbox description';
    this.elementClass = CheckboxElement;
  }

  onContentCreated(content: HTMLElement): void {
    content.setAttribute('labelText', this.props.label);
  }
}

export { CheckboxWidget };
