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

  $("#form-question").submit(function(e){

    var form = $("#form-question");
    var url = form.attr('action');
    $.ajax({
        type: "POST",
        url: url,
        data: form.serialize(),
        success: function(data) {
          // alert("Form Submited Successfully");
        },
        error: function(data) {
          // alert("some Error");
        }
    });
    window.location.href = '/contacts/thank-you';
    return false;
  });

}
