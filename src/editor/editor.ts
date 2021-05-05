import { fileOpen, fileSave } from 'browser-fs-access';

import { AttrPanel } from './components/attrPanel';
import { ProjectPanel } from './components/projectPanel';
import { Statusbar } from './components/statusbar';
import { Toolbar } from './components/toolbar';
import { Workspace } from './components/workspace';
import { BasketballCourtProject } from './modules/basketball-court';
import { ConnectionType, BaseApplication } from './modules/formy';
import type { TGridComponentLayout } from './modules/formy/grid';
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

class Editor extends BaseApplication {
  private activeNode: SVGNode | null = null;
  private nodeElementMap = new WeakMap<SVGNode, Element>();
  private pm = new ProjectManager<SVGDocument, BasketballCourtProject>();

  private attrPanel: AttrPanel;
  private projectPanel: ProjectPanel;
  private statusbar: Statusbar;
  private toolbar: Toolbar;
  private workspace: Workspace;

  constructor(options: IEditorOptions) {
    super();

    this.el.className = style.editor;

    this.attrPanel = this.registerComponent(AttrPanel);
    this.projectPanel = this.registerComponent(ProjectPanel);
    this.statusbar = this.registerComponent(Statusbar);
    this.toolbar = this.registerComponent(Toolbar);
    this.workspace = this.registerComponent(Workspace);

    this.setupToolbar(options.toolbarData);
    this.setupAttrPanel();
    this.setupProjectPanel();

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
  }

  private setupProjectPanel(): void {
    this.projectPanel.callback = this.renderProject.bind(this);

    const project = this.pm.current();
    if (!project) return;
    this.projectPanel.setupData(project);
  }

  private setupToolbar(layout: TGridComponentLayout): void {
    this.toolbar.setupLayout(layout);
    this.toolbar.connect(
      'toolbar-load-json',
      ConnectionType.Click,
      this.onToolbarLoadJson.bind(this),
    );
    this.toolbar.connect(
      'toolbar-save-json',
      ConnectionType.Click,
      this.onToolbarSaveJson.bind(this),
    );
    this.toolbar.connect(
      'toolbar-save-svg',
      ConnectionType.Click,
      this.onToolbarSaveSvg.bind(this),
    );
  }
}

export { Editor };
