/* global window, document */
(function () {
  var hash = window.location.hash;
  var tabs = document.querySelector('.tabs');
  // Check if hash exists in url and a tabs element exists in the DOM
  if (hash && tabs) {
    // Wrap it in a self invoking anonymous function to scope the variables
    (function() {
      // Check if there is a tab pane with the same hash name
      var tabPane = document.querySelector(hash);
      if (tabPane) {
        // If matching tab exists
        // get the tab-panes and nav-links
        var tabPanes = document.querySelectorAll('.tab-pane');
        // Get the nav link with href that matches the hash
        var navLink = document.querySelector('a[href="'+ hash +'"]');
        // Iterate over the tab-panes
        for (var i = 0, len = tabPanes.length; i < len; i++) {
          // Remove any existing .active class from the tab-pane
          // mainly to remove the default tab content
          tabPanes[i].classList.remove('active');
        }
        // Add .active class to the matching nav-link and tab-pane
        navLink.classList.add('active');
        tabPane.classList.add('active');
      } else {
        // If matching tab doesnt exist
        // remove the hash from the URL
        window.history.replaceState("", document.title, window.location.pathname);
      }
    }());
  }
  // Check if there are tabs in the dom and there are no hash
  if (tabs) {
    (function() {
      // Check and get all the nav-links in the tab
      var navLinks = document.querySelectorAll('.nav-link');
      if (navLinks) {
        // Iterate over all the nav-links
        for (var i = 0, len = navLinks.length; i < len; i++) {
          // Attach a click event listener to the nav-link
          navLinks[i].addEventListener('click', function () {
            // Get the hash from the nav-link href
            var hash = this.getAttribute('href');
            // Push the URL with hash to the history
            // make hash appear in address bar
            window.history.pushState("", document.title, window.location.pathname+hash);
          });
        }
      }
    }());
  }
}());
