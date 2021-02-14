import { BaseComponent } from '../base';
import style from './panel.module.css';

type THtmlInputType =
  | 'button'
  | 'checkbox'
  | 'color'
  | 'date'
  | 'datetime-local'
  | 'email'
  | 'file'
  | 'hidden'
  | 'image'
  | 'month'
  | 'number'
  | 'password'
  | 'radio'
  | 'range'
  | 'reset'
  | 'search'
  | 'submit'
  | 'tel'
  | 'text'
  | 'time'
  | 'url'
  | 'week';

abstract class BasePanel<T> extends BaseComponent {
  protected propInputTypeMap: { [key: string]: THtmlInputType } = {};

  constructor() {
    super();

    this.el.classList.add(style.panel);
  }

  abstract setupData(data: T): void;

  protected createInput(
    key: string,
    value: any,
    callback: (key: string, value: any) => void,
  ): void {
    const propEl = document.createElement('div');
    propEl.className = style.propItem;

    const labelEl = document.createElement('div');
    labelEl.textContent = key;
    labelEl.className = style.propLabel;
    propEl.appendChild(labelEl);

    const valueEl = document.createElement('input');
    valueEl.className = style.propValue;

    const inputType = this.propInputTypeMap[key] || 'text';
    valueEl.type = inputType;

    switch (inputType) {
      case 'checkbox':
        valueEl.checked = value;
        break;
      default:
        valueEl.value = value;
    }

    valueEl.oninput = () => {
      let value: any = valueEl.value;
      switch (inputType) {
        case 'checkbox':
          value = valueEl.checked;
          break;
        case 'number':
          value = Number(value);
          break;
      }
      callback(key, value);
    };

    propEl.appendChild(valueEl);
    this.el.appendChild(propEl);
  }
}

export { BasePanel, THtmlInputType };
