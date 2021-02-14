import { Editor } from './editor';

const toolbarData = [
  {
    id: 'toolbar-save',
    label: 'Save',
  },
  {
    id: 'toolbar-close',
    label: 'Close',
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
