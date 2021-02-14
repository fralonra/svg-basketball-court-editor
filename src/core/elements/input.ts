class InputElement extends HTMLElement {
  constructor(type: string, readonly: boolean = false) {
    super();

    const input = document.createElement('input');
    input.disabled = !!readonly;
    if (readonly) {
      input.style.pointerEvents = 'none';
    }
    input.type = type;
    this.appendChild(input);
  }
}

customElements.define('editor-input', InputElement);

export { InputElement };
