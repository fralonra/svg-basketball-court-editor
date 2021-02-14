interface IWrapperElementOptions {
  content: HTMLElement;
}

class WrapperElement extends HTMLElement {
  private content: HTMLElement;
  private wrapper: HTMLDivElement;
  private selected: boolean;

  constructor(options: IWrapperElementOptions) {
    super();

    this.attachShadow({ mode: 'open' });

    this.style.position = 'absolute';

    const innerStyle = document.createElement('style');
    innerStyle.textContent = `
      .wrapper {
        display: inline-block;
        cursor: default;
      }
      .wrapper_actived {
        box-shadow: 0 0 0 2px #39fa;
      }
    `.trim();

    this.wrapper = document.createElement('div');
    this.wrapper.className = 'wrapper';

    this.content = options.content;
    this.wrapper.appendChild(this.content);

    this.shadowRoot.append(innerStyle, this.wrapper);
  }

  get bounding(): DOMRect {
    return this.content.getBoundingClientRect();
  }

  select(): void {
    if (this.selected) return;
    this.toggleSelectionStatus();
  }

  unselect(): void {
    if (!this.selected) return;
    this.toggleSelectionStatus();
  }

  updateDom(key: string, value: any): void {
    switch (key) {
      case 'x':
        this.style.left = value + 'px';
        break;
      case 'y':
        this.style.top = value + 'px';
        break;
      case 'color':
        this.content.style.color = value;
        break;
      case 'fontSize':
        this.content.style.fontSize = value + 'px';
        break;
      case 'height':
        this.content.style.height = value + 'px';
        break;
      case 'label':
        this.content.setAttribute('labelText', value);
        break;
      case 'src':
        this.content.setAttribute('src', value);
        break;
      case 'text':
        this.content.textContent = value;
        break;
      case 'width':
        this.content.style.width = value + 'px';
        break;
    }
  }

  private toggleSelectionStatus(): void {
    this.selected = !this.selected;
    this.wrapper.classList.toggle('wrapper_actived');
  }
}

customElements.define('editor-wrapper', WrapperElement);

export { WrapperElement };
