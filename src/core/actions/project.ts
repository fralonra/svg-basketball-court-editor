import { Project } from '../../editor/modules/project/project';
import { serializeProjectAsJson } from '../data/json';

function previewProject(project: Project): HTMLDivElement {
  return project.layout;
}

function saveProject(project: Project): string {
  return serializeProjectAsJson(project, true);
}

export { previewProject, saveProject };
