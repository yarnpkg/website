export function checkServiceStatus() {
  const xhr = new XMLHttpRequest();
  xhr.open('get', 'https://status.yarnpkg.com/api/v1/status', true);
  xhr.onload = () => {
    try {
      const data = JSON.parse(xhr.responseText).data;
      if (data.status !== 'success') {
        showStatusMessage(data.message);
      }
    } catch (ex) {
      console.warn('Could not fetch service status: ' + ex.message);
    }
  };
  xhr.send();
}

export function showStatusMessage(message) {
  const alertEl = document.createElement('div');
  alertEl.className = 'alert alert-danger alert-dismissible fade hide';
  alertEl.setAttribute('role', 'alert');
  alertEl.innerHTML = `
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
    <strong>Status:</strong>
    <span class="system-status"></span>.
    <a href="https://status.yarnpkg.com/" class="alert-link">Read More &rarr;</a>
    </div>`;

  // Set text using textContent so it's not vulnerable to XSS
  const messageEl = alertEl.querySelector('.system-status');
  messageEl.textContent = message;

  // Insert into the hero, above the title
  let containerEl = document.querySelector('.hero > .container');
  if (!containerEl) {
    containerEl = document.body;
  }
  containerEl.insertBefore(alertEl, containerEl.firstChild);

  // Fade the alert in
  window.setTimeout(() => alertEl.classList.remove('hide'), 0);
  window.setTimeout(() => alertEl.classList.add('show'), 20);
}
