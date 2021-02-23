import {BaseComponent} from "../../modules/formy/index.js";
import style from "./nodePanel.module.css.proxy.js";
class NodePanel extends BaseComponent {
  constructor() {
    super();
    this.callback = (node) => {
    };
    this.el.className = style.panel;
  }
  onNodeSelect(callback) {
    this.callback = callback;
  }
  setupNodes(node, callback) {
    this.el.innerHTML = "";
    this.setupNode(node, this.el, callback);
  }
  setupNode(node, parent, callback) {
    const element = document.createElement("div");
    element.className = style.node;
    const item = document.createElement("div");
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
export {NodePanel};
