import { BaseComponent } from '../base';
import style from './projectPanel.module.css';

interface IProject {
  tag: string;
  children?: IProject[];
}

class ProjectPanel<T extends IProject> extends BaseComponent {
  private callback = (project: T) => {};

  constructor() {
    super();

    this.el.className = style.panel;
  }

  onProjectSelect(callback: (project: T) => void): void {
    this.callback = callback;
  }

  setupProjects(
    project: T,
    callback?: (project: T, element: HTMLDivElement) => void,
  ): void {
    this.el.innerHTML = '';

    this.setupProject(project, this.el, callback);
  }

  private setupProject(
    project: T,
    parent: HTMLElement,
    callback?: (project: T, element: HTMLDivElement) => void,
  ): void {
    const element = document.createElement('div');
    element.className = style.project;

    const item = document.createElement('div');
    item.className = style.item;
    item.textContent = project.tag;
    item.onclick = () => {
      this.callback(project);
    };
    element.appendChild(item);

    if (project.children) {
      for (const child of project.children) {
        this.setupProject(child, element, callback);
      }
    }

    parent.appendChild(element);
    if (callback) {
      callback(project, element);
    }
  }
}

export { ProjectPanel };
