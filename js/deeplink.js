if (location.hash) {
  var $hashTab = $(location.hash);
  
  if ($hashTab.hasClass('nav-link')) {
    $hashTab.tab('show');
  }
}

$('.tabs .nav-link').on('show.bs.tab', function(e) {
  history.replaceState(
    history.state,
    document.title,
    location.pathname + '#' + e.currentTarget.id
  );
});
