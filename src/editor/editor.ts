import { BaseComponent, ConnectionType } from './components/base';
import type { TGridComponentLayout } from './components/grid';
import { PropPanel } from './components/propPanel';
import { Statusbar } from './components/statusbar';
import { Toolbar } from './components/toolbar';
import { NodePanel } from './components/nodePanel';
import { Workspace } from './components/workspace';
import { Project } from './modules/project/project';
import { ProjectManager } from './modules/project/project-manager';
import { SVGDocument, SVGNode } from './modules/svg-node';

import defaultProject from './modules/basketball-court/presets/default.json';

import style from './editor.module.css';

// const NAME_SPACE = 'http://www.w3.org/2000/svg';
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
const optionalProps = ['fill', 'stroke'];

interface IEditorOptions {
  toolbarData: TGridComponentLayout;
}

class Editor {
  private activeNode: SVGNode | null = null;
  private el = document.createElement('div');
  private nodeElementMap = new WeakMap<SVGNode, Element>();
  private pm = new ProjectManager();

  private propPanel = new PropPanel();
  private statusbar = new Statusbar();
  private nodePanel = new NodePanel();
  private workspace = new Workspace();

  constructor(options: IEditorOptions) {
    this.el.className = style.editor;

    this.setupToolbar(options.toolbarData);
    this.setupNodePanel();
    this.setupWorkspace();
    this.setupPropPanel();
    this.setupStatusbar();

    this.openProject();
  }

  render(container: HTMLElement): void {
    container.appendChild(this.el);
  }

  private activateNode(node: SVGNode): void {
    this.activeNode = node;

    for (const prop of optionalProps) {
      if (node.attrs[prop] !== undefined) continue;
      if (prop !== 'fill' || (prop === 'fill' && node.tag !== 'line')) {
        node.attrs[prop] = '';
      }
    }

    this.propPanel.setupMeta(
      { description: node.description },
      this.nodeMetaFactory.bind(this),
    );
    this.propPanel.setupAttrs(node.attrs, this.nodeAttrFactory.bind(this));
  }

  private addComponent<T extends BaseComponent>(component: T): void {
    this.el.appendChild(component.element);
  }

  private nodeAttrFactory(
    container: HTMLElement,
    key: string,
    value: any,
  ): void {
    const attrEl = document.createElement('div');
    attrEl.className = 'entry';
    attrEl.style.display = 'flex';

    const labelEl = document.createElement('div');
    labelEl.textContent = key;
    attrEl.appendChild(labelEl);

    let valueEl: HTMLElement;
    switch (key) {
      case 'x':
      case 'y':
      case 'width':
      case 'height':
        valueEl = document.createElement('input');
        (valueEl as HTMLInputElement).type = 'number';
        (valueEl as HTMLInputElement).value = value;
        break;
      case 'fill':
      case 'stroke':
        valueEl = document.createElement('input');
        (valueEl as HTMLInputElement).type = 'color';
        (valueEl as HTMLInputElement).value = value;
        break;
      default:
        valueEl = document.createElement('input');
        (valueEl as HTMLInputElement).type = 'text';
        (valueEl as HTMLInputElement).value = value;
    }
    if (valueEl.tagName === 'INPUT') {
      valueEl.oninput = () => {
        this.onNodeAttrChanged(key, (valueEl as HTMLInputElement).value);
      };
    }
    attrEl.appendChild(valueEl);

    container.appendChild(attrEl);
  }

  private nodeMetaFactory(
    container: HTMLElement,
    key: string,
    value: any,
  ): void {
    const metaEl = document.createElement('div');
    metaEl.className = 'entry';
    metaEl.style.display = 'flex';

    const labelEl = document.createElement('div');
    labelEl.textContent = key;
    metaEl.appendChild(labelEl);

    let valueEl: HTMLElement;
    switch (key) {
      default:
        valueEl = document.createElement('input');
        (valueEl as HTMLInputElement).type = 'text';
        (valueEl as HTMLInputElement).value = value;
    }
    if (valueEl.tagName === 'INPUT') {
      valueEl.oninput = () => {
        this.onNodeMetaChanged(key, (valueEl as HTMLInputElement).value);
      };
    }
    metaEl.appendChild(valueEl);

    container.appendChild(metaEl);
  }

  private onNodeAttrChanged(key: string, value: any): void {
    // TODO
    if (!this.activeNode) return;
    this.activeNode.set(key, value);

    const element = this.nodeElementMap.get(this.activeNode);
    element?.setAttributeNS(null, key, value);
  }

  private onNodeMetaChanged(key: string, value: any): void {
    if (!this.activeNode) return;
    this.activeNode[key] = value;
  }

  private openProject(): void {
    const rootNode = SVGNode.fromJson(defaultProject);

    const document = new SVGDocument();
    document.root = rootNode;

    const project = new Project({});
    project.document = document;
    this.pm.set(project);

    const element = document.toElement((element, node) => {
      this.nodeElementMap.set(node, element);

      if (!graphicElements.includes(element.tagName)) return;

      // if (!element.hasAttributeNS(NAME_SPACE, 'fill')) {
      //   // make path clickable
      //   // element.setAttributeNS(null, 'fill', 'white')
      // }
      element.classList.add(style.path);
      element.addEventListener('click', () => {
        this.activateNode(node);
      });
    });

    if (element) {
      this.nodePanel.setupNodes(rootNode, (node, element) => {
        if (!(node as SVGNode).description) return;

        if (element.firstChild) {
          element.firstChild.textContent += ` (${
            (node as SVGNode).description
          })`;
        }
      });
      this.workspace.render(element);
    }
  }

  private setupNodePanel(): void {
    const nodePanel = new NodePanel<SVGNode>();
    nodePanel.onNodeSelect((node) => {
      this.activateNode(node);
    });

    this.nodePanel = nodePanel;
    this.addComponent(nodePanel);
  }

  private setupPropPanel(): void {
    const propPanel = new PropPanel();
    this.propPanel = propPanel;
    this.addComponent(propPanel);
  }

  private setupStatusbar(): void {
    const statusbar = new Statusbar();
    this.statusbar = statusbar;
    this.addComponent(statusbar);
  }

  private setupToolbar(layout: TGridComponentLayout): void {
    const toolbar = new Toolbar();
    toolbar.setupLayout(layout);
    toolbar.connect('toolbar-save', ConnectionType.Click, () => {});
    toolbar.connect('toolbar-new', ConnectionType.Click, () => {});
    toolbar.connect('toolbar-close', ConnectionType.Click, () => {});
    toolbar.connect('toolbar-preview', ConnectionType.Click, () => {});
    this.addComponent(toolbar);
  }

  private setupWorkspace(): void {
    const workspace = new Workspace();
    this.workspace = workspace;
    this.addComponent(workspace);
  }
}

export { Editor };
