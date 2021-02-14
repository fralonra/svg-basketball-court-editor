import { BaseWidget } from '../widgets';

interface ICreateWidgetOptions {
  ctor: new () => BaseWidget;
}

function createWidget<T extends BaseWidget>(options: ICreateWidgetOptions): T {
  const widget = new options.ctor();
  widget.updateDom();
  return widget;
}

export { createWidget };
