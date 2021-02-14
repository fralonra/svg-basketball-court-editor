interface IProjectData<T> {
  name: string;
  meta: IProjectMeta;
  document: T | null;
}

interface IProjectMeta {
  [key: string]: any;
}

interface IProjectOptions {
  name?: string;
}

const DEFAULT_NAME = 'Untitled';

abstract class Project<T> {
  name: string = DEFAULT_NAME;
  meta: IProjectMeta = {};

  constructor(name: string, meta: IProjectMeta | null, public document: T) {
    if (name) this.name = name;
    if (meta) this.meta = meta;
  }

  toJson(): IProjectData<T> {
    return {
      name: this.name,
      meta: this.meta,
      document: this.document,
    };
  }
}

export { Project, IProjectData, IProjectMeta, IProjectOptions };
