import { Editor } from './editor';

const toolbarData = [
  {
    id: 'toolbar-load-json',
    label: 'Load Json',
  },
  {
    id: 'toolbar-save-json',
    label: 'Save To Json',
  },
  {
    id: 'toolbar-save-svg',
    label: 'Save To Svg',
  },
];

const app = new Editor({
  toolbarData,
});

function init() {
  const root = document.getElementById('root');
  if (!root) {
    console.error('Root element not found');
    return;
  }
  app.render(root);
}

init();
