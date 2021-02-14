import { BaseComponent, ILayoutComponent, TLayout } from './base';

interface IGridComponentLayoutComponent extends ILayoutComponent {
  label?: string;
  title?: string;
}

type TGridComponentLayout = TLayout<IGridComponentLayoutComponent>;

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

export { GridComponent, TGridComponentLayout };
