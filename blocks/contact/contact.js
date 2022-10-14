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
  const resp = await fetch(`/blocks/contact/contact.html`);
  if (resp.ok) {
    const html = await resp.text();
    const form = document.createElement('div');
    form.innerHTML = html;
    block.append(form);
  }
}
