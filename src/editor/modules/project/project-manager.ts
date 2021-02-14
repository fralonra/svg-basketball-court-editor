import type { Project } from './project';

class ProjectManager {
  private list = new Set<Project>();
  activeProject: Project;

  add(project: Project): void {
    this.list.add(project);
  }

  clear(): void {
    this.list.clear();
  }

  current(): Project {
    return this.activeProject;
  }

  remove(project: Project): void {
    if (!this.list.has(project)) {
      console.warn('Project not found');
      return;
    }
    this.list.delete(project);
  }

  set(project: Project): void {
    if (project && !this.list.has(project)) {
      console.warn('Project not found');
      return;
    }
    this.activeProject = project;
  }
}

export { ProjectManager };
