export function fillLanguageDropdown() {
  // Takes over language dropdown to set cookie
  const langMenu = document.getElementById('dropdownNavLanguageMenu');
  const langMenuItems = langMenu.getElementsByClassName('dropdown-item');

  for (const langMenuItem of langMenuItems) {
    langMenuItem.addEventListener('click', event => {
      event.preventDefault();
      const target = event.currentTarget;
      const lang = target.dataset.lang;
      document.cookie = `nf_lang=${lang}`;
      location.reload();
    });
  }
}
