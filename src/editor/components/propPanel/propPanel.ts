import { BaseComponent } from '../base';
import style from './propPanel.module.css';

class PropPanel extends BaseComponent {
  private attrEl = document.createElement('div');
  private metaEl = document.createElement('div');

  constructor() {
    super();

    this.el.className = style.panel;
    this.el.appendChild(this.metaEl);
    this.el.appendChild(document.createElement('br'));
    this.el.appendChild(this.attrEl);
  }

  clear(): void {
    this.metaEl.innerHTML = '';
    this.attrEl.innerHTML = '';
  }

  setupAttrs(
    attrs: { [key: string]: any },
    factory: (container: HTMLElement, key: string, value: any) => void,
  ): void {
    this.attrEl.innerHTML = '';
    for (const key in attrs) {
      factory(this.attrEl, key, attrs[key]);
    }
  }

  setupMeta(
    meta: { [key: string]: any },
    factory: (container: HTMLElement, key: string, value: any) => void,
  ): void {
    this.metaEl.innerHTML = '';
    for (const key in meta) {
      factory(this.metaEl, key, meta[key]);
    }
  }
}

export { PropPanel };
