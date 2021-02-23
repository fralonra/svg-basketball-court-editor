import { fileOpen, fileSave } from 'browser-fs-access';

import { BaseComponent, ConnectionType } from './modules/formy';
import type { TGridComponentLayout } from './modules/formy/grid';
import { AttrPanel } from './components/attrPanel';
import { ProjectPanel } from './components/projectPanel';
import { Statusbar } from './components/statusbar';
import { Toolbar } from './components/toolbar';
import { Workspace } from './components/workspace';
import { BasketballCourtProject } from './modules/basketball-court';
import { ProjectManager } from './modules/project/project-manager';
import { ISVGNodeJsonObject, SVGDocument, SVGNode } from './modules/svg-node';
import type { ISVGProjectMeta } from './modules/svg-project';

import defaultDocument from './modules/basketball-court/presets/default.json';

import style from './editor.module.css';

const graphicElements = [
  'circle',
  'ellipse',
  'line',
  'path',
  'polygon',
  'polyline',
  'rect',
  'text',
  'textPath',
  'tspan',
];
const optionalAttrs = ['fill', 'stroke'];

interface IEditorOptions {
  toolbarData: TGridComponentLayout;
}

class Editor {
  private activeNode: SVGNode | null = null;
  private el = document.createElement('div');
  private nodeElementMap = new WeakMap<SVGNode, Element>();
  private pm = new ProjectManager<SVGDocument, BasketballCourtProject>();

  private attrPanel = new AttrPanel();
  private projectPanel = new ProjectPanel();
  private statusbar = new Statusbar();
  private workspace = new Workspace();

  constructor(options: IEditorOptions) {
    this.el.className = style.editor;

    this.setupToolbar(options.toolbarData);
    this.setupWorkspace();
    this.setupAttrPanel();
    this.setupProjectPanel();
    this.setupStatusbar();

    // TODO: validate json
    this.openProject(
      '',
      null,
      (defaultDocument as unknown) as ISVGNodeJsonObject,
    );
  }

  render(container: HTMLElement): void {
    container.appendChild(this.el);
  }

  private activateNode(node: SVGNode): void {
    this.activeNode = node;

    for (const attr of optionalAttrs) {
      if (node.attrs[attr] !== undefined) continue;
      if (attr !== 'fill' || (attr === 'fill' && node.tag !== 'line')) {
        node.attrs[attr] = '';
      }
    }

    this.attrPanel.setupData(node.attrs);
  }

  private addComponent<T extends BaseComponent>(component: T): void {
    this.el.appendChild(component.element);
  }

  private onElementCreated(element: SVGElement, node: SVGNode): void {
    this.nodeElementMap.set(node, element);

    if (!graphicElements.includes(element.tagName)) return;

    element.classList.add(style.path);
    if (!element.hasAttribute('fill')) {
      element.setAttribute('fill', 'transparent');
    }
    element.addEventListener('click', () => {
      this.activateNode(node);
    });
  }

  private async onToolbarLoadJson(): Promise<void> {
    try {
      const blob = await fileOpen({
        mimeTypes: ['application/json'],
        extensions: ['.json'],
      });
      // TODO: validate json
      const text = await blob.text();
      const json = JSON.parse(text);
      this.openProject(json.name, json.meta, json.document.root);
    } catch {}
  }

  private async onToolbarSaveJson(): Promise<void> {
    const project = this.pm.current();
    if (!project) return;

    const projectData = project.toJson();
    const blob = new Blob([JSON.stringify(projectData, null, 2)], {
      type: 'application/json',
    });
    // fileName will not work, see https://github.com/WICG/file-system-access/issues/80
    try {
      await fileSave(blob, {
        fileName: `${project.name}.json`,
        extensions: ['.json'],
      });
    } catch {}
  }

  private async onToolbarSaveSvg(): Promise<void> {
    const project = this.pm.current();
    if (!project) return;

    const svgData = project.toElement().outerHTML;
    const blob = new Blob([svgData], {
      type: 'image/svg+xml',
    });
    // fileName will not work, see https://github.com/WICG/file-system-access/issues/80
    await fileSave(blob, {
      fileName: `${project.name}.svg`,
      extensions: ['.svg'],
    });
  }

  private openProject(
    name: string,
    meta: ISVGProjectMeta | null,
    node: ISVGNodeJsonObject,
  ): void {
    const rootNode = SVGNode.fromJson(node);

    const document = new SVGDocument(rootNode);

    const project = new BasketballCourtProject(name, meta, document);
    this.pm.add(project);
    this.pm.set(project);
    this.projectPanel.setupData(project);

    this.renderProject();
  }

  private renderProject(): void {
    const element = this.pm
      .current()
      ?.toElement(this.onElementCreated.bind(this));
    if (element) {
      this.workspace.render(element);
    }
  }

  private setupAttrPanel(): void {
    this.attrPanel.callback = (key, value) => {
      if (!this.activeNode) return;
      this.activeNode.set(key, value);

      const element = this.nodeElementMap.get(this.activeNode);
      element?.setAttributeNS(null, key, value);
    };
    this.addComponent(this.attrPanel);
  }

  private setupProjectPanel(): void {
    this.projectPanel.callback = this.renderProject.bind(this);

    this.addComponent(this.projectPanel);

    const project = this.pm.current();
    if (!project) return;
    this.projectPanel.setupData(project);
  }

  private setupStatusbar(): void {
    const statusbar = new Statusbar();
    this.statusbar = statusbar;
    this.addComponent(statusbar);
  }

  private setupToolbar(layout: TGridComponentLayout): void {
    const toolbar = new Toolbar();
    toolbar.setupLayout(layout);
    toolbar.connect(
      'toolbar-load-json',
      ConnectionType.Click,
      this.onToolbarLoadJson.bind(this),
    );
    toolbar.connect(
      'toolbar-save-json',
      ConnectionType.Click,
      this.onToolbarSaveJson.bind(this),
    );
    toolbar.connect(
      'toolbar-save-svg',
      ConnectionType.Click,
      this.onToolbarSaveSvg.bind(this),
    );
    this.addComponent(toolbar);
  }

  private setupWorkspace(): void {
    const workspace = new Workspace();
    this.workspace = workspace;
    this.addComponent(workspace);
  }
}

export { Editor };
