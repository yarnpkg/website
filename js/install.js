[
  [/Windows/i, '#windows-tab'],
  [/Mac OS/i, '#mac-tab'],
  [/Linux|Ubuntu|Debian/i, '#linux-tab']
].find(function(os) {
  return os[0].test(navigator.userAgent) && $(os[1]).tab('show');
});
