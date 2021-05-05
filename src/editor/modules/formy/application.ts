import type { BaseComponent } from './base';

abstract class BaseApplication {
  protected el = document.createElement('div');

  render(container: HTMLElement): void {
    container.appendChild(this.el);
  }

  protected registerComponent<T extends BaseComponent>(Ctor: new () => T): T {
    const component = new Ctor();
    this.addComponent(component);
    return component;
  }

  private addComponent<T extends BaseComponent>(component: T): void {
    this.el.appendChild(component.element);
  }
}

export { BaseApplication };
