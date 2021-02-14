import { Project } from '../../editor/modules/project/project';

function serializeProjectAsJson(project: Project, beautify?: boolean): string {
  const source = {
    projectName: project.name,
    device: project.device,
    layout: project.layout.innerHTML,
    widgets: project.widgetsObject,
  };
  return beautify ? JSON.stringify(source, null, 2) : JSON.stringify(source);
}

export { serializeProjectAsJson };
