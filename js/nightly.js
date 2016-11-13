(function() {
  var MS_PER_SEC = 1000;
  var SEC_PER_MINUTE = 60;
  var SEC_PER_HOUR = 3600;
  var SEC_PER_DAY = 86400;
  function formatTimeSince(timestamp) {
    var diff = Date.now() / MS_PER_SEC - timestamp;
    if (diff < SEC_PER_HOUR) {
      return Math.floor(diff / SEC_PER_MINUTE) + ' minutes ago';
    } else if (diff < SEC_PER_DAY) {
      return Math.floor(diff / SEC_PER_HOUR) + ' hours ago';
    } else {
      return Math.floor(diff / SEC_PER_DAY) + ' days ago';
    }
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
