(function() {
  var MS_PER_SEC = 1000;
  var SEC_PER_MINUTE = 60;
  var SEC_PER_HOUR = 3600;
  var SEC_PER_DAY = 86400;
  function formatTimeSince(timestamp) {
    var diff = Date.now() / MS_PER_SEC - timestamp;
    var singlarString, pluralString, divisor;
    if (diff < SEC_PER_HOUR) {
      // TODO: Localize these.
      singularString = '1 minute ago';
      pluralString = '{count} minutes ago';
      divisor = SEC_PER_MINUTE;
    } else if (diff < SEC_PER_DAY) {
      singularString = '1 hour ago';
      pluralString = '{count} hours ago';
      divisor = SEC_PER_HOUR;
    } else {
      singularString = '1 day ago';
      pluralString = '{count} days ago';
      divisor = SEC_PER_DAY;
    }
    diff = Math.floor(diff / divisor);
    return (diff === 1 ? singularString : pluralString).replace('{count}', diff);
  }

  function load() {
    var xhr = new XMLHttpRequest();
    xhr.open('get', 'https://nightly.yarnpkg.com/latest.json', true);
    xhr.onload = function() {
      var allFiles = JSON.parse(xhr.responseText);
      Object.keys(allFiles).forEach(function(type) {
        var file = allFiles[type];
        var row = document.getElementById('row_' + type);
        if (!row) {
          return;
        }
        row.querySelector('.date').textContent = formatTimeSince(file.date);
        row.querySelector('.filename').textContent = file.filename;
        row.querySelector('.link').href = file.url;
        row.querySelector('.size').textContent = file.size;
      });
    };
    xhr.send();
  }

  $('#older-versions .nav-item').on('shown.bs.tab', function(e) {
    var selectedType = e.target.getAttribute('data-type');
    var xhr = new XMLHttpRequest();
    xhr.open('get', 'https://nightly.yarnpkg.com/' + selectedType + '-builds', true);
    xhr.onload = function() {
      var allBuilds = JSON.parse(xhr.responseText);
      var tbody = $('<tbody>');
      allBuilds.forEach(function(build) {
        tbody.append(
          $('<tr>').append(
            $('<td>').append($('<a>').attr('href', build.url).text(build.filename)),
            $('<td>').text(build.size),
            $('<td>').text(formatTimeSince(build.date))
          )
        );
      });
      tbody.replaceAll('#' + selectedType + '-body');
    };
    xhr.send();
  });

  load();
}());
