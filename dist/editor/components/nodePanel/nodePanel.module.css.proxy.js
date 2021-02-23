
export let code = "._panel_br59a_1 {\n  grid-area: left;\n  background-color: #2d2d2d;\n  transition: all 0.3s ease;\n}\n\n._node_br59a_7 {\n}\n\n._item_br59a_10 {\n  padding: 2px 6px;\n  transition: all 0.3s ease;\n}\n._item_br59a_10:hover {\n  cursor: pointer;\n  background-color: #3d3d3d;\n}\n";
let json = {"panel":"_panel_br59a_1","node":"_node_br59a_7","item":"_item_br59a_10"};
export default json;

// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';

  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}