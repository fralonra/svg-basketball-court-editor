import { BaseComponent, TLayout, ILayoutComponent } from './base';
import { IStyleModule } from '../types';

interface IGridComponentLayoutComponent extends ILayoutComponent {
  label?: string;
  title?: string;
}

type TGridComponentLayout = TLayout<IGridComponentLayoutComponent>;

interface IGridComponentStyleModule extends IStyleModule {
  grid?: string;
  item?: string;
}

abstract class GridComponent extends BaseComponent {
  protected itemEls: HTMLElement[] = [];

  setupLayout(layout: TGridComponentLayout): void {
    layout.forEach((item) => {
      const itemEl = document.createElement('div');
      for (const key in item) {
        this.setupItemProps(itemEl, key, item[key]);
      }
      this.el.appendChild(itemEl);
      this.itemEls.push(itemEl);
    });
    this.onLayout();
  }

  setupStyle(style: IGridComponentStyleModule): void {
    this.el.className = style.grid || 'grid';
    this.itemEls.forEach((el) => (el.className = style.item || 'item'));
  }

  protected onLayout(): void {}

  protected setupItemProps(el: HTMLElement, key: string, value: any): void {
    switch (key) {
      case 'id':
        el.id = value;
        break;
      case 'label':
        el.textContent = value;
        break;
      case 'title':
        el.title = value;
        break;
    }
  }
}

export { GridComponent, TGridComponentLayout, IGridComponentStyleModule };
