import type { BasketballCourtProject } from 'src/editor/modules/basketball-court';
import { BasePanel, THtmlInputType } from '../../modules/formy';
import style from './projectPanel.module.css';

class ProjectPanel extends BasePanel<BasketballCourtProject> {
  protected propInputTypeMap: { [key: string]: THtmlInputType } = {
    width: 'number',
  };
  private project: BasketballCourtProject | null = null;

  callback = (project: BasketballCourtProject) => {};

  constructor() {
    super();

    this.el.classList.add(style.panel);
  }

  setupData(project: BasketballCourtProject): void {
    this.el.innerHTML = '';
    this.project = project;

    this.createInput('name', this.project.name, (key, value) => {
      if (this.project) {
        this.project.name = value;
      }
    });

    const meta = project.meta;
    for (const key in meta) {
      if (meta[key] === undefined) continue;

      this.createInput(key, meta[key], (key, value) => {
        if (this.project) {
          this.project.meta[key] = value;
          this.callback(this.project);
        }
      });
    }
  }
}

export { ProjectPanel };
