var te=Object.create,b=Object.defineProperty,oe=Object.getPrototypeOf,ne=Object.prototype.hasOwnProperty,se=Object.getOwnPropertyNames,re=Object.getOwnPropertyDescriptor;var c=t=>b(t,"__esModule",{value:!0});var l=(t,e)=>()=>(e||(e={exports:{}},t(e.exports,e)),e.exports),p=(t,e)=>{for(var o in e)b(t,o,{get:e[o],enumerable:!0})},ie=(t,e,o)=>{if(e&&typeof e=="object"||typeof e=="function")for(let n of se(e))!ne.call(t,n)&&n!=="default"&&b(t,n,{get:()=>e[n],enumerable:!(o=re(e,n))||o.enumerable});return t},d=t=>t&&t.__esModule?t:ie(c(b(t!=null?te(oe(t)):{},"default",{value:t,enumerable:!0})),t);var F=l(ae=>{c(ae);p(ae,{default:()=>le});var O=async t=>{let e=await t.getFile();return e.handle=t,e},ce=async(t={})=>{let e=await window.chooseFileSystemEntries({accepts:[{description:t.description||"",mimeTypes:t.mimeTypes||["*/*"],extensions:t.extensions||[""]}],multiple:t.multiple||!1});return t.multiple?Promise.all(e.map(O)):O(e)},le=ce});var G=l(pe=>{c(pe);p(pe,{default:()=>ue});var de=async t=>{let e=await t.getFile();return e.handle=t,e},me=async(t={})=>{let e={};t.mimeTypes?t.mimeTypes.map(s=>{e[s]=t.extensions||[]}):e["*/*"]=t.extensions||[];let o=await window.showOpenFilePicker({types:[{description:t.description||"",accept:e}],multiple:t.multiple||!1}),n=await Promise.all(o.map(de));return t.multiple?n:n[0]},ue=me});var M=l(he=>{c(he);p(he,{default:()=>ye});var fe=async(t={})=>new Promise(e=>{let o=document.createElement("input");o.type="file";let n=[...t.mimeTypes?t.mimeTypes:[],t.extensions?t.extensions:[]].join();o.multiple=t.multiple||!1,o.accept=n||"*/*",o.addEventListener("change",()=>{e(o.multiple?o.files:o.files[0])}),o.click()}),ye=fe});var U=l(xe=>{c(xe);p(xe,{default:()=>we});var H=async(t,e,o=t.name)=>{let n=[],s=[];for await(let r of t.getEntries()){let i=`${o}/${r.name}`;r.isFile?s.push(r.getFile().then(a=>Object.defineProperty(a,"webkitRelativePath",{configurable:!0,enumerable:!0,get:()=>i}))):r.isDirectory&&e&&n.push(H(r,e,i))}return[...(await Promise.all(n)).flat(),...await Promise.all(s)]},be=async(t={})=>{t.recursive=t.recursive||!1;let e=await window.chooseFileSystemEntries({type:"open-directory"});return H(e,t.recursive)},we=be});var B=l(je=>{c(je);p(je,{default:()=>ve});var W=async(t,e,o=t.name)=>{let n=[],s=[];for await(let r of t.values()){let i=`${o}/${r.name}`;r.kind==="file"?s.push(r.getFile().then(a=>Object.defineProperty(a,"webkitRelativePath",{configurable:!0,enumerable:!0,get:()=>i}))):r.kind==="directory"&&e&&n.push(W(r,e,i))}return[...(await Promise.all(n)).flat(),...await Promise.all(s)]},ge=async(t={})=>{t.recursive=t.recursive||!1;let e=await window.showDirectoryPicker();return W(e,t.recursive)},ve=ge});var q=l(ke=>{c(ke);p(ke,{default:()=>Ee});var _e=async(t={})=>(t.recursive=t.recursive||!1,new Promise(e=>{let o=document.createElement("input");o.type="file",o.webkitdirectory=!0,o.addEventListener("change",()=>{let n=Array.from(o.files);t.recursive||(n=n.filter(s=>s.webkitRelativePath.split("/").length===2)),e(n)}),o.click()})),Ee=_e});var R=l(Pe=>{c(Pe);p(Pe,{default:()=>Ne});var Se=async(t,e={},o=null)=>{e.fileName=e.fileName||"Untitled",o=o||await window.chooseFileSystemEntries({type:"save-file",accepts:[{description:e.description||"",mimeTypes:[t.type],extensions:e.extensions||[""]}]});let n=await o.createWritable();return await n.write(t),await n.close(),o},Ne=Se});var $=l(Te=>{c(Te);p(Te,{default:()=>De});var Ce=async(t,e={},o=null)=>{e.fileName=e.fileName||"Untitled";let n={};e.mimeTypes?(e.mimeTypes.push(t.type),e.mimeTypes.map(r=>{n[r]=e.extensions||[]})):n[t.type]=e.extensions||[],o=o||await window.showSaveFilePicker({suggestedName:e.fileName,types:[{description:e.description||"",accept:n}]});let s=await o.createWritable();return await s.write(t),await s.close(),o},De=Ce});var z=l(Ve=>{c(Ve);p(Ve,{default:()=>Ie});var Le=async(t,e={})=>{let o=document.createElement("a");o.download=e.fileName||"Untitled",o.href=URL.createObjectURL(t),o.addEventListener("click",()=>{setTimeout(()=>URL.revokeObjectURL(o.href),3e4)}),o.click()},Ie=Le});var f="chooseFileSystemEntries"in self?"chooseFileSystemEntries":"showOpenFilePicker"in self&&"showOpenFilePicker";var Je=f?f==="chooseFileSystemEntries"?Promise.resolve().then(()=>d(F())):Promise.resolve().then(()=>d(G())):Promise.resolve().then(()=>d(M()));async function K(...t){return(await Je).default(...t)}f?f==="chooseFileSystemEntries"?Promise.resolve().then(()=>d(U())):Promise.resolve().then(()=>d(B())):Promise.resolve().then(()=>d(q()));var Ae=f?f==="chooseFileSystemEntries"?Promise.resolve().then(()=>d(R())):Promise.resolve().then(()=>d($())):Promise.resolve().then(()=>d(z()));async function v(...t){return(await Ae).default(...t)}var u;(function(t){t.Click="click",t.DragStart="dragstart"})(u||(u={}));var m=class{constructor(){this.el=document.createElement("div")}get element(){return this.el}connect(e,o,n){let s=this.el.querySelector("#"+e);if(!s){console.warn(`Element with id not found: ${e}`);return}switch(o){case u.Click:s.onclick=n;break;case u.DragStart:s.ondragstart=n;break}}};var Oe=`._panel_vkt7u_1 {
  padding: 10px;
  background-color: #2d2d2d;
  transition: all 0.3s ease;
}

._propItem_vkt7u_7 {
  display: flex;
  justify-content: space-between;
  padding: 4px 0;
}

._propLabel_vkt7u_13 {
  margin-right: 8px;
}

._propValue_vkt7u_17 {
}
`,Fe={panel:"_panel_vkt7u_1",propItem:"_propItem_vkt7u_7",propLabel:"_propLabel_vkt7u_13",propValue:"_propValue_vkt7u_17"},y=Fe;if(typeof document!="undefined"){let t=document.createElement("style"),e=document.createTextNode(Oe);t.type="text/css",t.appendChild(e),document.head.appendChild(t)}var x=class extends m{constructor(){super();this.propInputTypeMap={},this.el.classList.add(y.panel)}createInput(e,o,n){let s=document.createElement("div");s.className=y.propItem;let r=document.createElement("div");r.textContent=e,r.className=y.propLabel,s.appendChild(r);let i=document.createElement("input");i.className=y.propValue;let a=this.propInputTypeMap[e]||"text";switch(i.type=a,a){case"checkbox":i.checked=o;break;default:i.value=o}i.oninput=()=>{let h=i.value;switch(a){case"checkbox":h=i.checked;break;case"number":h=Number(h);break}n(e,h)},s.appendChild(i),this.el.appendChild(s)}};var k=class extends m{constructor(){super(...arguments);this.itemEls=[]}setupLayout(e){e.forEach(o=>{let n=document.createElement("div");for(let s in o)this.setupItemProps(n,s,o[s]);this.el.appendChild(n),this.itemEls.push(n)}),this.onLayout()}onLayout(){}setupItemProps(e,o,n){switch(o){case"id":e.id=n;break;case"label":e.textContent=n;break;case"title":e.title=n;break}}};var Ge=`._panel_1xa9v_1 {
  grid-area: right;
}
`,Me={panel:"_panel_1xa9v_1"},Q=Me;if(typeof document!="undefined"){let t=document.createElement("style"),e=document.createTextNode(Ge);t.type="text/css",t.appendChild(e),document.head.appendChild(t)}var He=["fill","stroke"],_=class extends x{constructor(){super();this.propInputTypeMap={fill:"color",stroke:"color"},this.callback=(e,o)=>{},this.el.classList.add(Q.panel)}setupData(e){this.el.innerHTML="";for(let o of He)e[o]!==void 0&&this.createInput(o,e[o],this.callback)}};var Ue=`._panel_1nb4y_1 {
  grid-area: left;
}
`,We={panel:"_panel_1nb4y_1"},X=We;if(typeof document!="undefined"){let t=document.createElement("style"),e=document.createTextNode(Ue);t.type="text/css",t.appendChild(e),document.head.appendChild(t)}var E=class extends x{constructor(){super();this.propInputTypeMap={width:"number"},this.project=null,this.callback=e=>{},this.el.classList.add(X.panel)}setupData(e){this.el.innerHTML="",this.project=e,this.createInput("name",this.project.name,(n,s)=>{this.project&&(this.project.name=s)});let o=e.meta;for(let n in o)o[n]!==void 0&&this.createInput(n,o[n],(s,r)=>{this.project&&(this.project.meta[s]=r,this.callback(this.project))})}};var Be=`._statusbar_hj27i_1 {
  grid-area: footer;
  display: flex;
  justify-content: space-between;
  padding: 8px 10px;
  background-color: #1e1e1e;
}
`,qe={statusbar:"_statusbar_hj27i_1"},Y=qe;if(typeof document!="undefined"){let t=document.createElement("style"),e=document.createTextNode(Be);t.type="text/css",t.appendChild(e),document.head.appendChild(t)}var w=class extends m{constructor(){super();this.el.className=Y.statusbar}};var Re=`._toolbar_s6qya_1 {
  grid-area: header;
  display: flex;
  padding: 10px;
  background-color: #1e1e1e;
}

._toolbarItem_s6qya_8 {
  padding: 2px 8px;
  margin: 0 4px;
  background-color: #f5f5f5;
  border-radius: 4px;
  color: #1e1e1e;
  transition: all 0.3s ease;
  cursor: pointer;
}
._toolbarItem_s6qya_8:hover {
  background-color: #e3e3e3;
}
`,$e={toolbar:"_toolbar_s6qya_1",toolbarItem:"_toolbarItem_s6qya_8"},P=$e;if(typeof document!="undefined"){let t=document.createElement("style"),e=document.createTextNode(Re);t.type="text/css",t.appendChild(e),document.head.appendChild(t)}var S=class extends k{constructor(){super();this.el.className=P.toolbar}onLayout(){this.itemEls.forEach(e=>{e.className=P.toolbarItem})}};var ze=`._workspace_1369b_1 {
  position: relative;
  grid-area: main;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: auto;
}
`,Ke={workspace:"_workspace_1369b_1"},Z=Ke;if(typeof document!="undefined"){let t=document.createElement("style"),e=document.createTextNode(ze);t.type="text/css",t.appendChild(e),document.head.appendChild(t)}var j=class extends m{constructor(){super();this.el.className=Z.workspace,this.initEvents()}clear(){this.el.innerHTML=""}render(e){this.clear(),this.el.appendChild(e)}initEvents(){}};var N=class{constructor(){this.list=new Set,this.activeProject=null}add(e){this.list.add(e)}clear(){this.list.clear()}current(){return this.activeProject}remove(e){if(!this.list.has(e)){console.warn("Project not found");return}this.list.delete(e)}set(e){if(e&&!this.list.has(e)){console.warn("Project not found");return}this.activeProject=e}};var Qe="Untitled",T=class{constructor(e,o,n){this.document=n,this.name=Qe,this.meta={},e&&(this.name=e),o&&(this.meta=o)}toJson(){return{name:this.name,meta:this.meta,document:this.document}}};var C=class extends T{constructor(){super(...arguments);this.DEFAULT_WIDTH=0}adjustProject(){if(this.DEFAULT_WIDTH>0){let e=Number(this.document.root.attrs.width),o=isNaN(e)?this.DEFAULT_WIDTH:e,n=this.meta.width/o;if(n===1)return;this.calculatePosition(this.document.root,n)}}toElement(e){return this.adjustProject(),this.document.toElement(e)}calculatePosition(e,o){for(let n in e.attrs)switch(n){case"x":case"y":case"width":case"height":e.attrs[n]=Number((o*e.attrs[n]).toFixed(2));break;case"d":let s=e.attrs[n].replaceAll(/(\d)+\.(\d+)/g,r=>(Number(r)*o).toFixed(2));e.attrs[n]=s}e.children&&e.children.forEach(n=>{this.calculatePosition(n,o)})}};var D=class extends C{constructor(e,o,n){super(e,o,n);this.document=n,this.DEFAULT_WIDTH=400,this.meta={width:this.DEFAULT_WIDTH,...this.meta}}};function V(t,e,o){return o={path:e,exports:{},require:function(n,s){return Xe(n,s==null?o.path:s)}},t(o,o.exports),o.exports}function Xe(){throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs")}var Ye=V(function(t,e){Object.defineProperty(e,"__esModule",{value:!0}),e.SVGDocument=void 0;class o{constructor(s){this.root=s}toElement(s){if(!this.root)throw new Error("No root node found for document");return this.root.toElement(s)}}e.SVGDocument=o}),Ze=V(function(t,e){Object.defineProperty(e,"__esModule",{value:!0}),e.SVGJNode=void 0;let o="http://www.w3.org/2000/svg";class n{constructor(r,i=""){this.tag=r,this.description=i,this.attrs={},this.children=[]}static fromJson(r){let i=new n(r.tag,r.description);for(let a in r.attrs)i.set(a,r.attrs[a]);return r.children&&r.children.length&&r.children.forEach(a=>{i.addChild(n.fromJson(a))}),i}addChild(r){this.children.push(r)}set(r,i){this.attrs[r]=i}toElement(r){if(!window||!window.document)throw new Error('"window" or "window.document" is undefined.');let i=document.createElementNS(o,this.tag);for(let a in this.attrs){let h=a.split(":")[0]==="xmlns"?"http://www.w3.org/2000/xmlns/":null;i.setAttributeNS(h,a,String(this.attrs[a]))}for(let a of this.children)i.appendChild(a.toElement(r));return r&&r(i,this),i}}e.SVGJNode=n}),L=V(function(t,e){Object.defineProperty(e,"__esModule",{value:!0}),e.SVGJNode=e.SVGDocument=void 0,Object.defineProperty(e,"SVGDocument",{enumerable:!0,get:function(){return Ye.SVGDocument}}),Object.defineProperty(e,"SVGJNode",{enumerable:!0,get:function(){return Ze.SVGJNode}})}),et=L.ISVGJNodeJsonObject,I=L.SVGDocument,J=L.SVGJNode;var tt={tag:"svg",attrs:{width:15,height:14,xmlns:"http://www.w3.org/2000/svg"},children:[{tag:"g",attrs:{fill:"none",stroke:"#000"},children:[{tag:"rect",description:"left-low",attrs:{x:.9,y:0,width:4.15,height:2.9,stroke:"#000"}},{tag:"rect",description:"left-low-paint",attrs:{x:5.05,y:0,width:2.45,height:2.9,stroke:"#000"}},{tag:"rect",description:"left-low-paint",attrs:{x:7.5,y:0,width:2.45,height:2.9,stroke:"#000"}},{tag:"rect",description:"right-low",attrs:{x:9.95,y:0,width:4.15,height:2.9,stroke:"#000"}},{tag:"path",description:"left-elbow",attrs:{d:"M 0.9 2.9 H 5.05 V 7.725 A 6.75 6.75 0 0 1 0.9 2.9",stroke:"#000"}},{tag:"rect",description:"left-high-paint",attrs:{x:5.05,y:2.9,width:2.45,height:2.9,stroke:"#000"}},{tag:"rect",description:"right-high-paint",attrs:{x:7.5,y:2.9,width:2.45,height:2.9,stroke:"#000"}},{tag:"path",description:"right-elbow",attrs:{d:"M 14.1 2.9 H 9.95 V 7.725 A 6.75 6.75 0 0 0 14.1 2.9",stroke:"#000"}},{tag:"path",description:"high",attrs:{d:"M 5.05 5.8 H 9.95 V 7.725 A 6.75 6.75 0 0 1 5.05 7.725",stroke:"#000"}},{tag:"rect",description:"left-corner",attrs:{x:0,y:0,width:.9,height:2.9,stroke:"#000"}},{tag:"path",description:"left-3pt-area",attrs:{d:"M 0 2.9 H 0.9 A 6.75 6.75 0 0 0 5.05 7.725 V 14.0 H 0 V 2.9",stroke:"#000"}},{tag:"path",description:"center-3pt-area",attrs:{d:"M 5.05 7.725 A 6.75 6.75 0 0 0 9.95 7.725 V 14.0 H 5.05 V 7.725",stroke:"#000"}},{tag:"path",description:"right-3pt-area",attrs:{d:"M 15.0 2.9 H 14.1 A 6.75 6.75 0 0 1 9.95 7.725 V 14.0 H 15.0 V 2.9",stroke:"#000"}},{tag:"rect",description:"right-corner",attrs:{x:14.1,y:0,width:.9,height:2.9,stroke:"#000"}}]}]},ee=tt;var ot=`._editor_40505_1 {
  display: grid;
  grid-template-columns:
    minmax(min-content, 1fr)
    minmax(auto, 70%)
    minmax(min-content, 2fr);
  grid-template-rows: min-content auto min-content;
  grid-template-areas:
    'header header header'
    'left main right'
    'footer footer footer';
  width: 100vw;
  height: 100vh;
  color: #fff;
  background-color: #353535;
  overflow: hidden;
}

._path_40505_19 {
  transition: all 0.1s ease;
}
._path_40505_19:hover {
  cursor: pointer;
  fill: yellow;
}
`,nt={editor:"_editor_40505_1",path:"_path_40505_19"},A=nt;if(typeof document!="undefined"){let t=document.createElement("style"),e=document.createTextNode(ot);t.type="text/css",t.appendChild(e),document.head.appendChild(t)}var st=["circle","ellipse","line","path","polygon","polyline","rect","text","textPath","tspan"],rt=["fill","stroke"],g=class{constructor(e){this.activeNode=null,this.el=document.createElement("div"),this.nodeElementMap=new WeakMap,this.pm=new N,this.attrPanel=new _,this.projectPanel=new E,this.statusbar=new w,this.workspace=new j,this.el.className=A.editor,this.setupToolbar(e.toolbarData),this.setupWorkspace(),this.setupAttrPanel(),this.setupProjectPanel(),this.setupStatusbar(),this.openProject("",null,ee)}render(e){e.appendChild(this.el)}activateNode(e){this.activeNode=e;for(let o of rt)e.attrs[o]===void 0&&(o!=="fill"||o==="fill"&&e.tag!=="line")&&(e.attrs[o]="");this.attrPanel.setupData(e.attrs)}addComponent(e){this.el.appendChild(e.element)}onElementCreated(e,o){this.nodeElementMap.set(o,e),!!st.includes(e.tagName)&&(e.classList.add(A.path),e.hasAttribute("fill")||e.setAttribute("fill","transparent"),e.addEventListener("click",()=>{this.activateNode(o)}))}async onToolbarLoadJson(){try{let o=await(await K({mimeTypes:["application/json"],extensions:[".json"]})).text(),n=JSON.parse(o);this.openProject(n.name,n.meta,n.document.root)}catch(e){}}async onToolbarSaveJson(){let e=this.pm.current();if(!e)return;let o=e.toJson(),n=new Blob([JSON.stringify(o,null,2)],{type:"application/json"});try{await v(n,{fileName:`${e.name}.json`,extensions:[".json"]})}catch(s){}}async onToolbarSaveSvg(){let e=this.pm.current();if(!e)return;let o=e.toElement().outerHTML,n=new Blob([o],{type:"image/svg+xml"});await v(n,{fileName:`${e.name}.svg`,extensions:[".svg"]})}openProject(e,o,n){let s=J.fromJson(n),r=new I(s),i=new D(e,o,r);this.pm.add(i),this.pm.set(i),this.projectPanel.setupData(i),this.renderProject()}renderProject(){var o;let e=(o=this.pm.current())==null?void 0:o.toElement(this.onElementCreated.bind(this));e&&this.workspace.render(e)}setupAttrPanel(){this.attrPanel.callback=(e,o)=>{if(!this.activeNode)return;this.activeNode.set(e,o);let n=this.nodeElementMap.get(this.activeNode);n==null||n.setAttributeNS(null,e,o)},this.addComponent(this.attrPanel)}setupProjectPanel(){this.projectPanel.callback=this.renderProject.bind(this),this.addComponent(this.projectPanel);let e=this.pm.current();!e||this.projectPanel.setupData(e)}setupStatusbar(){let e=new w;this.statusbar=e,this.addComponent(e)}setupToolbar(e){let o=new S;o.setupLayout(e),o.connect("toolbar-load-json",u.Click,this.onToolbarLoadJson.bind(this)),o.connect("toolbar-save-json",u.Click,this.onToolbarSaveJson.bind(this)),o.connect("toolbar-save-svg",u.Click,this.onToolbarSaveSvg.bind(this)),this.addComponent(o)}setupWorkspace(){let e=new j;this.workspace=e,this.addComponent(e)}};var it=[{id:"toolbar-load-json",label:"Load Json"},{id:"toolbar-save-json",label:"Save To Json"},{id:"toolbar-save-svg",label:"Save To Svg"}],at=new g({toolbarData:it});function ct(){let t=document.getElementById("root");if(!t){console.error("Root element not found");return}at.render(t)}ct();
// @license © 2020 Google LLC. Licensed under the Apache License, Version 2.0.