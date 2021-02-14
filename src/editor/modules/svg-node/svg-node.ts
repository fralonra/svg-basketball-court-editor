const NAME_SPACE = 'http://www.w3.org/2000/svg';

interface ISVGNodeJsonObject {
  tag: keyof SVGElementTagNameMap;
  description?: string;
  attrs: {
    [key: string]: string | number;
  };
  children?: SVGNode[];
}

class SVGNode {
  attrs: {
    [key: string]: string | number;
  } = {};
  children: SVGNode[] = [];

  static fromJson(json: ISVGNodeJsonObject): SVGNode {
    // TODO: validate json object
    const node = new SVGNode(json.tag, json.description);
    for (const attr in json.attrs) {
      node.set(attr, json.attrs[attr]);
    }
    if (json.children && json.children.length) {
      json.children.forEach((child) => {
        node.addChild(SVGNode.fromJson(child));
      });
    }
    return node;
  }

  constructor(
    public tag: keyof SVGElementTagNameMap,
    public description: string = '',
  ) {}

  addChild(child: SVGNode): void {
    this.children.push(child);
  }

  set(key: string, value: string | number): void {
    this.attrs[key] = value;
  }

  toElement(
    callback?: (element: SVGElement, node: SVGNode) => void,
  ): SVGElement {
    if (!window || !window.document) {
      throw new Error('"window" or "window.document" is undefined.');
    }
    const el = document.createElementNS(NAME_SPACE, this.tag);
    for (const attr in this.attrs) {
      const namespace =
        attr.split(':')[0] === 'xmlns' ? 'http://www.w3.org/2000/xmlns/' : null;
      el.setAttributeNS(namespace, attr, String(this.attrs[attr]));
    }
    for (const child of this.children) {
      el.appendChild(child.toElement(callback));
    }

    if (callback) {
      callback(el, this);
    }
    return el;
  }
}

export { SVGNode, ISVGNodeJsonObject };
