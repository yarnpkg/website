import "babel-polyfill";

export function fillLanguageDropdown() {
  // Takes over language dropdown to set cookie
  const langMenu = document.getElementById('dropdownNavLanguageMenu');
  const langMenuItems = langMenu.querySelectorAll('dropdown-item');

  console.log(typeof langMenuItems);

  langMenuItems.forEach((langMenuItem) => {
    langMenuItem.addEventListener('click', event => {
      event.preventDefault();
      const target = event.currentTarget;
      const lang = target.dataset.lang;
      document.cookie = `nf_lang=${lang}`;
      location.reload();
    });
  });
}
