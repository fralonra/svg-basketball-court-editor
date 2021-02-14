import { BasePanel, THtmlInputType } from '../../modules/formy';
import style from './attrPanel.module.css';

type TAttrKey = 'fill' | 'stroke';

interface IAttrData {
  key: TAttrKey;
  value: any;
}

const editableAttrs: TAttrKey[] = ['fill', 'stroke'];

class AttrPanel extends BasePanel<IAttrData> {
  protected propInputTypeMap: { [key: string]: THtmlInputType } = {
    fill: 'color',
    stroke: 'color',
  };

  callback = (key: string, value: any) => {};

  constructor() {
    super();

    this.el.classList.add(style.panel);
  }

  setupData(attrs: { [key: string]: any }): void {
    this.el.innerHTML = '';

    for (const key of editableAttrs) {
      if (attrs[key] === undefined) continue;

      this.createInput(key, attrs[key], this.callback);
    }
  }
}

export { AttrPanel };
