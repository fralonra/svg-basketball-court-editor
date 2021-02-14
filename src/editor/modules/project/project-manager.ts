import type { Project } from './project';

class ProjectManager<D, T extends Project<D>> {
  private list = new Set<T>();
  private activeProject: T | null = null;

  add(project: T): void {
    this.list.add(project);
  }

  clear(): void {
    this.list.clear();
  }

  current(): T | null {
    return this.activeProject;
  }

  remove(project: T): void {
    if (!this.list.has(project)) {
      console.warn('Project not found');
      return;
    }
    this.list.delete(project);
  }

  set(project: T): void {
    if (project && !this.list.has(project)) {
      console.warn('Project not found');
      return;
    }
    this.activeProject = project;
  }
}

export { ProjectManager };
