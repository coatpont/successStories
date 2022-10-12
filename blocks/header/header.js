import { readBlockConfig, decorateIcons } from '../../scripts/scripts.js';

/**
 * decorates the header, mainly the nav
 * @param {Element} block The header block element
 */

export default async function decorate(block) {
  const cfg = readBlockConfig(block);
  block.textContent = '';

  // fetch nav content
  const navPath = cfg.nav || '/nav';
  const resp = await fetch(`${navPath}.plain.html`);
  if (resp.ok) {
    const html = await resp.text();

    // decorate nav DOM
    const nav = document.createElement('nav');
    nav.setAttribute('class','navbar navbar-expand-lg fixed-top navbar-dark bg-dark');

    // add the fluid-container
    const container = document.createElement('div');
    container.setAttribute('class','container-fluid');
    nav.appendChild(container);

    container.innerHTML = html;
    container.children[0].setAttribute("class","collapse navbar-collapse");
    container.children[0].setAttribute("id","navbarSupportedContent");
    container.children[0].children[0].setAttribute("class","navbar-nav me-auto mb-2 mb-lg-0");

    var children = container.children[0].children[0].childNodes;
    children.forEach(function(item){
      try {
        item.setAttribute('class','nav-item');
      } catch {}
    });

    block.append(nav);
  }
}
