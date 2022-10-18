import { readBlockConfig } from '../../scripts/scripts.js';

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
    nav.setAttribute('class', 'navbar navbar-expand-lg fixed-top navbar-dark bg-dark');

    // add the fluid-container
    const container = document.createElement('div');
    container.setAttribute('class', 'container-fluid');
    nav.appendChild(container);
    container.innerHTML = html;
    container.children[0].setAttribute('class', 'collapse navbar-collapse');
    container.children[0].setAttribute('id', 'navbarSupportedContent');
    container.children[0].children[0].setAttribute('class', 'navbar-nav me-auto mb-2 mb-lg-0');

    // decorate the list
    const children = container.children[0].children[0].childNodes;
    children.forEach((item) => {
      try {
        item.setAttribute('class', 'nav-item');
        item.children[0].setAttribute('class', 'nav-link');
      } catch {
        // console.log('error');
      }
    });

    // add the hamburger button
    const hamburger = document.createElement('button');
    hamburger.setAttribute('type', 'button');
    hamburger.setAttribute('class', 'navbar-toggler');
    hamburger.setAttribute('data-bs-toggle', 'collapse');
    hamburger.setAttribute('data-bs-target', '#navbarSupportedContent');
    hamburger.innerHTML = '<span class="navbar-toggler-icon"></span>';
    container.insertBefore(hamburger, container.children[0]);

    // add the brand link
    const brand = document.createElement('a');
    brand.setAttribute('class', 'navbar-brand');
    brand.setAttribute('href', 'https://www.adobe.com');
    brand.innerHTML = 'AEM Cloud Service';
    container.insertBefore(brand, container.children[0]);

    block.append(nav);
  }
}
