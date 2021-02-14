import { BaseComponent } from './base';
import { IStyleModule } from '../types';

interface IDialogStyleModule extends IStyleModule {
  backdrop?: string;
  closeButton?: string;
  content?: string;
  dialog?: string;
  header?: string;
  hide?: string;
  title?: string;
}

interface IDialogOptions {
  backdrop?: boolean;
  backdropClickable?: boolean;
  container?: HTMLElement;
  content?: HTMLElement;
  title?: string;
}

class Dialog extends BaseComponent {
  private backdrop: boolean;
  private style: IDialogStyleModule = {};
  private visible: boolean = false;

  private backdropEl: HTMLDivElement;
  private closeButton: HTMLDivElement;
  private contentEl: HTMLDivElement;
  private headerEl: HTMLDivElement;
  private titleEl: HTMLDivElement;

  constructor(options: IDialogOptions) {
    super();

    this.setup(options);

    (options.container || document.body).appendChild(this.el);
  }

  hide(): void {
    if (!this.visible) return;
    this.visible = false;
    this.el.classList.add(this.style.hide || 'hide');
    if (this.backdrop) {
      this.backdropEl.classList.add(this.style.hide || 'hide');
    }
  }

  setup(options: IDialogOptions): void {
    // backdrop
    this.backdrop = !!options.backdrop;
    if (!this.backdropEl) {
      this.backdropEl = document.createElement('div');
      (options.container || document.body).appendChild(this.backdropEl);
    }
    if (this.backdrop) {
      if (options.backdropClickable) {
        this.backdropEl.onmousedown = this.hide.bind(this);
      } else {
        this.backdropEl.onmousedown = null;
      }
    }

    // header
    if (!this.headerEl) {
      this.headerEl = document.createElement('div');

      this.titleEl = document.createElement('div');
      this.headerEl.appendChild(this.titleEl);

      this.closeButton = document.createElement('div');
      this.closeButton.textContent = 'X';
      this.closeButton.onclick = this.hide.bind(this);
      this.headerEl.appendChild(this.closeButton);

      this.el.appendChild(this.headerEl);
    }
    this.titleEl.textContent = options.title || '';

    // content
    if (!this.contentEl) {
      this.contentEl = document.createElement('div');
      this.el.appendChild(this.contentEl);
    }
    if (options.content) {
      this.contentEl.innerHTML = '';
      this.contentEl.appendChild(options.content);
    }
  }

  setupStyle(style: IDialogStyleModule): void {
    this.style = style;
    this.backdropEl.classList.add(
      this.style.backdrop || 'backdrop',
      this.style.hide || 'hide',
    );
    this.el.classList.add(
      this.style.dialog || 'dialog',
      this.style.hide || 'hide',
    );
    this.headerEl.className = this.style.header || 'header';
    this.titleEl.className = this.style.title || 'title';
    this.closeButton.className = this.style.closeButton || 'close-button';
    this.contentEl.className = this.style.content || 'content';
  }

  show(): void {
    if (this.visible) return;
    this.visible = true;
    this.el.classList.remove(this.style.hide || 'hide');
    if (this.backdrop) {
      this.backdropEl.classList.remove(this.style.hide || 'hide');
    }
  }

  toggle(): void {
    if (this.visible) this.hide();
    else this.show();
  }
}

export { Dialog, IDialogStyleModule };
