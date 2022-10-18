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

  $('#form-question').submit(function () {
    const form = $('#form-question');
    const url = form.attr('action');
    $.ajax({
      type: 'POST',
      url: url,
      data: form.serialize(),
      success: function () {
        // alert("Form Submited Successfully");
      },
      error: function () {
        // alert("some Error");
      }
    });
    window.location.href = '/contacts/thank-you';
    return false;
  });
}
