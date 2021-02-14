import { BaseWidget, IWidgetProps } from './base';
import { CheckboxWidget } from './checkbox';
import { ImageWidget } from './image';
import { RadioWidget } from './radio';
import { SpanWidget } from './span';

enum WidgetType {
  checkbox = 'checkbox',
  image = 'image',
  radio = 'radio',
  span = 'span',
}

type IWidgetCtorMap = {
  [type in WidgetType]: new () => BaseWidget;
};

const widgetCtorMap: IWidgetCtorMap = {
  checkbox: CheckboxWidget,
  image: ImageWidget,
  radio: RadioWidget,
  span: SpanWidget,
};

interface IWidgetPlainObject {
  name: string;
  props?: IWidgetProps;
}

function jsObjectToWidget(raw: IWidgetPlainObject): BaseWidget {
  const widget = new widgetCtorMap[raw.name]();
  for (const key in raw.props) {
    widget.setProp(key, raw.props[key]);
  }
  return widget;
}

export { IWidgetPlainObject, WidgetType, jsObjectToWidget, widgetCtorMap };
