import { BaseComponent } from '../base';
import style from './workspace.module.css';

class Workspace extends BaseComponent {
  constructor() {
    super();

    this.el.className = style.workspace;
    this.initEvents();
  }

  clear(): void {}

  render(element: Element): void {
    this.el.innerHTML = '';
    this.el.appendChild(element);
  }

  private initEvents(): void {}
}

export { Workspace };
