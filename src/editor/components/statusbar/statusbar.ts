import { BaseComponent } from '../base';

import style from './statusbar.module.css';

class Statusbar extends BaseComponent {
  constructor() {
    super();

    this.el.className = style.statusbar;
  }
}

export { Statusbar };
