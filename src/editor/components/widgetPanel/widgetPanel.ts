import { GridComponent } from '../grid';
import style from './widgetPanel.module.css';

class WidgetPanel extends GridComponent {
  constructor() {
    super();

    this.el.className = style.panel;
  }

  hide(): void {
    this.el.classList.add(style.hide);
  }

  show(): void {
    this.el.classList.remove(style.hide);
  }

  setEditable(editable: boolean) {
    this.itemEls.forEach((el) => {
      el.draggable = !!editable;
    });
  }
}

export { WidgetPanel };
