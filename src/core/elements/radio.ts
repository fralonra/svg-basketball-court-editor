import { LabeledInputElement } from './labeled-input';

class RadioElement extends LabeledInputElement {
  constructor(readonly: boolean = false) {
    super('radio', readonly);
  }
}

customElements.define('editor-radio', RadioElement);

export { RadioElement };
