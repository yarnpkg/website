import fetch from 'unfetch';

const $availableOS = document.querySelectorAll('.install-os-instructions');
const $selectedOS = document.getElementById('os');
const $selectedVersion = document.getElementById('version');
const $instructionsWrapper = document.getElementById('install-instructions');

function isValidOS(name) {
  return !!document.getElementById(name);
}

function showOS(name, version) {
  // Hide instructions for all operating systems
  for (let i = 0; i < $availableOS.length; i++) {
    $availableOS[i].style.display = 'none';
  }

  // Show just the instructions we need
  document.getElementById(name).style.display = 'block';
  $instructionsWrapper.className = 'install-' + version;

  if ($selectedOS.value !== name) {
    $selectedOS.value = name;
  }
  if ($selectedVersion.value !== version) {
    $selectedVersion.value = version;
  }
  history.replaceState(
    history.state,
    document.title,
    location.pathname + '#' + name + '-' + version
  );
}

function showSelectedOS() {
  showOS($selectedOS.value, $selectedVersion.value);
}

function showOSFromHash() {
  if (!location.hash) {
    return false;
  }
  const [os, version] = location.hash.substr(1).split('-');
  if (!isValidOS(os)) {
    return false;
  }
  showOS(os, version || 'stable');
  return true;
}

function getNightlyVersionNumber() {
  fetch('https://nightly.yarnpkg.com/latest-version')
    .then(res => res.text())
    .then(version => {
      document.getElementById('nightly-version').innerText =
        'Classic Nightly (' + version + ')';
    });
}

function init() {
  getNightlyVersionNumber();
  $selectedOS.addEventListener('change', showSelectedOS, false);
  $selectedVersion.addEventListener('change', showSelectedOS, false);

  // If we're on a permalink to a particular OS and it's valid, show instructions
  // for that OS.
  if (showOSFromHash()) {
    return;
  }

  // Show the tab of the current OS. If we don't recognise the default OS,
  // default to Debian as an arbitrary popular choice.
  const osToSelect = [
    { regex: /Windows/i, id: 'windows' },
    { regex: /Mac OS/i, id: 'mac' },
    { regex: /Linux|Ubuntu|Debian/i, id: 'debian' },
  ].find(os => os.regex.test(navigator.userAgent));
  showOS(osToSelect ? osToSelect.id : 'debian', 'stable');
}

init();
