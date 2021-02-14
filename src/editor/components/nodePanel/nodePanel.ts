import { BaseComponent } from '../base';
import style from './nodePanel.module.css';

interface INode {
  tag: string;
  children?: INode[];
}

class NodePanel<T extends INode> extends BaseComponent {
  private callback = (node: T) => {};

  constructor() {
    super();

    this.el.className = style.panel;
  }

  onNodeSelect(callback: (node: T) => void): void {
    this.callback = callback;
  }

  setupNodes(
    node: T,
    callback?: (node: T, element: HTMLDivElement) => void,
  ): void {
    this.el.innerHTML = '';

    this.setupNode(node, this.el, callback);
  }

  private setupNode(
    node: T,
    parent: HTMLElement,
    callback?: (node: T, element: HTMLDivElement) => void,
  ): void {
    const element = document.createElement('div');
    element.className = style.node;

    const item = document.createElement('div');
    item.className = style.item;
    item.textContent = node.tag;
    item.onclick = () => {
      this.callback(node);
    };
    element.appendChild(item);

    if (node.children) {
      for (const child of node.children) {
        this.setupNode(child, element, callback);
      }
    }

    parent.appendChild(element);
    if (callback) {
      callback(node, element);
    }
  }
}

export { NodePanel };
