import type { IDocument } from './document';

const DEFAULT_NAME = 'untitled';

interface IProjectOptions {
  name?: string;
}

class Project {
  document: IDocument | null = null;
  name: string = '';

  constructor(options: IProjectOptions) {
    this.name = options.name || DEFAULT_NAME;
  }
}

export { Project, IProjectOptions };
