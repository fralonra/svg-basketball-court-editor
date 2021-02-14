import { LabeledInputElement } from './labeled-input';

class CheckboxElement extends LabeledInputElement {
  constructor(readonly: boolean = false) {
    super('checkbox', readonly);
  }
}

customElements.define('editor-checkbox', CheckboxElement);

export { CheckboxElement };
