/**
 * decorates the header, mainly the nav
 * @param {Element} block The header block element
 */

export default async function decorate(block) {
  block.textContent = '';

  const resp = await fetch('/blocks/contact/contact.html');
  if (resp.ok) {
    const html = await resp.text();
    const form = document.createElement('div');
    form.innerHTML = html;
    block.append(form);
  }

  $('#form-question').submit(() => {
    const form = $('#form-question');
    const posturl = form.attr('action');
    $.ajax({
      type: 'POST',
      url: posturl,
      data: form.serialize(),
      success: function successform() {
        window.location.href = '/contacts/thank-you';
      },
      error: function errorform() {
        window.location.href = '/';
      },
    });
    return false;
  });
}
