import { readBlockConfig } from '../../scripts/scripts.js';

/**
 * loads and decorates the footer
 * @param {Element} block The header block element
 */

export default async function decorate(block) {
  const cfg = readBlockConfig(block);
  block.textContent = '';

  const leftmenuPath = cfg.leftmenu || '/leftmenu';
  const resp = await fetch(`${leftmenuPath}.plain.html`);
  if (resp.ok) {
    const html = await resp.text();

    // decorate nav DOM
    const list = document.createElement('div');
    // add the fluid-container
    list.innerHTML = html;

    // decorate the list
    const children = list.children[0].children[0].childNodes;
    children.forEach((item) => {
      try {
        item.setAttribute('class', 'nav-item');
        item.children[0].setAttribute('class', 'list-group-item list-group-item-action');
        block.append(item.children[0]);
      } catch {
        // console.log('error');
      }
    });

    block.classList.add('list-group');
  }
}
