enum ConnectionType {
  Click = 'click',
  DragStart = 'dragstart',
}

type ConnectionCallback = (event: Event) => void;

interface ILayoutComponent {
  id: string;
  [key: string]: any;
}

type TLayout<T extends ILayoutComponent> = T[];

abstract class BaseComponent {
  protected el: HTMLElement;

  constructor() {
    this.el = document.createElement('div');
  }

  get element(): HTMLElement {
    return this.el;
  }

  connect(
    elementId: string,
    type: ConnectionType,
    callback: ConnectionCallback,
  ): void {
    // TODO: optimize query
    const target = this.el.querySelector('#' + elementId) as HTMLElement;
    if (!target) {
      console.warn(`Element with id not found: ${elementId}`);
      return;
    }

    switch (type) {
      case ConnectionType.Click:
        target.onclick = callback;
        break;
      case ConnectionType.DragStart:
        target.ondragstart = callback;
        break;
    }
  }
}

export { BaseComponent, ConnectionType, TLayout, ILayoutComponent };
