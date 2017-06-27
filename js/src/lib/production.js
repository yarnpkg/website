if (!NodeList.prototype.forEach) {
  NodeList.prototype.forEach = Array.prototype.forEach;
}

export function fillLanguageDropdown() {
  // Takes over language dropdown to set cookie
  const langMenu = document.getElementById('dropdownNavLanguageMenu');
  if (langMenu) {
    const langMenuItems = langMenu.querySelectorAll('dropdown-item');

    langMenuItems.forEach(langMenuItem => {
      langMenuItem.addEventListener('click', event => {
        event.preventDefault();
        const target = event.currentTarget;
        const lang = target.dataset.lang;
        document.cookie = `nf_lang=${lang}`;
        location.reload();
      });
    });
  }
}
