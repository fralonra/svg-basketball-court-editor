import { GridComponent } from '../grid';

import style from './toolbar.module.css';

class Toolbar extends GridComponent {
  constructor() {
    super();

    this.el.className = style.toolbar;
  }
}

export { Toolbar };
