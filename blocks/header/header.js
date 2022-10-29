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

    // add the search form
    const search = document.createElement('form');
    search.setAttribute('class', 'd-flex');
    nav.appendChild(search);

    const searchInput = document.createElement('input');
    searchInput.setAttribute('class', 'form-control me-2');
    searchInput.setAttribute('type', 'search');
    searchInput.setAttribute('id', 'searchInput');
    searchInput.setAttribute('name', 'searchInput');
    searchInput.setAttribute('placeholder', 'Search');
    searchInput.setAttribute('autocomplete', 'off');
    searchInput.setAttribute('required', '');

    search.appendChild(searchInput);

    const searchButton = document.createElement('button');
    searchButton.setAttribute('class', 'me-2 btn btn-outline-light');
    searchButton.setAttribute('style', 'margin-left:0.5rem');
    searchButton.setAttribute('type', 'submit');
    searchButton.innerHTML = 'Search';
    search.append(searchButton);

    block.append(nav);

    /**
     * setup the search feature with typeahead
    */

    /** Fetching the index file... */
    const index = await fetch('/query-index.json');
    if (index.ok) {
      const indexhtml = await index.text();
      const indexjson = JSON.parse(indexhtml);
      const searchjson = [];
      let i = 1;
      indexjson.data.forEach((item) => {
        searchjson.push({
          id: i,
          title: item.title,
          path: item.path,
          description: item.description,
        });
        i += 1;
      });

      /* eslint-disable no-undef */
      const searchSource = new Bloodhound({
        datumTokenizer: Bloodhound.tokenizers.whitespace,
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        identify: (obj) => obj.id,
        local: searchjson,
      });

      /* eslint-disable prefer-arrow-callback */
      $('#searchInput').typeahead({
        hint: false,
        highlight: true,
        minLength: 1,
      }, {
        displayKey: 'title',
        source: searchSource,
        limit: 10,
        templates: {
          empty: ['<div>&nbsp;No result!</div>'].join('\n'),
          suggestion: Handlebars.compile('<div>{{title}}</br><span class=small>{{description}}</span></div>'),
        },
      }).on('typeahead:select', function selectvalue(ev, selection) {
        window.location.href = selection.path;
      });
    }
  }
}
