import { InputElement } from './input';

class LabeledInputElement extends InputElement {
  constructor(type, readonly: boolean = false) {
    super(type, readonly);

    const labelEl = document.createElement('span');
    labelEl.style.marginLeft = '5px';
    if (readonly) {
      labelEl.style.userSelect = 'none';
    }
    this.appendChild(labelEl);

    const originSetAttribute = this.setAttribute;
    this.setAttribute = (key, value) => {
      if (key === 'labelText') {
        labelEl.textContent = value;
      } else {
        originSetAttribute(key, value);
      }
    };
  }
}

customElements.define('editor-labeled-input', LabeledInputElement);

export { LabeledInputElement };
