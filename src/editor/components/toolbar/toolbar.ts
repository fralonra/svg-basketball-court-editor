import { GridComponent } from '../../modules/formy';

import style from './toolbar.module.css';

class Toolbar extends GridComponent {
  constructor() {
    super();

    this.el.className = style.toolbar;
  }

  protected onLayout(): void {
    this.itemEls.forEach((el) => {
      el.className = style.toolbarItem;
    });
  }
}

export { Toolbar };
