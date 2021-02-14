import { BaseComponent } from '../../modules/formy';
import style from './workspace.module.css';

class Workspace extends BaseComponent {
  constructor() {
    super();

    this.el.className = style.workspace;
    this.initEvents();
  }

  clear(): void {
    this.el.innerHTML = '';
  }

  render(element: Element): void {
    this.clear();
    this.el.appendChild(element);
  }

  private initEvents(): void {}
}

export { Workspace };
