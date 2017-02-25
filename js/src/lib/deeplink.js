import $ from 'jquery';
import 'bootstrap/js/src/dropdown.js';
import 'bootstrap/js/src/tab.js';

export function handleTabs() {
  // show the tab of the current hash
  if (location.hash) {
    var $hashTab = $(location.hash);

    if ($hashTab.hasClass('nav-link')) {
      $hashTab.tab('show');
    }
  }

  // on tab change, the new one comes in the history instead
  $('.tabs .nav-link').on('show.bs.tab', function(e) {
    history.replaceState(
      history.state,
      document.title,
      location.pathname + '#' + e.currentTarget.id,
    );
  });
}

export function handleOS() {
  // shows the tab of the current OS
  [
    [/Windows/i, '#windows-tab'],
    [/Mac OS/i, '#mac-tab'],
    [/Linux|Ubuntu|Debian/i, '#linux-tab'],
  ].find(function(os) {
    return os[0].test(navigator.userAgent) && $(os[1]).tab('show');
  });
}
