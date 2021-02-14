import { BaseComponent } from '../../modules/formy';

import style from './statusbar.module.css';

class Statusbar extends BaseComponent {
  constructor() {
    super();

    this.el.className = style.statusbar;
  }
}

export { Statusbar };
