import 'jquery';
import 'bootstrap/js/src/dropdown.js';
import 'bootstrap/js/src/collapse.js';
import 'bootstrap/js/src/tab.js';
import React from 'react';
import ReactDOM from 'react-dom';
import { checkServiceStatus } from './util/serviceStatus';
import { fillLanguageDropdown } from './util/production';
import { Search } from './components';

// Thank you
checkServiceStatus();

ReactDOM.render(<Search />, document.getElementById('search'));

if (process.env.NODE_ENV === 'production') {
  fillLanguageDropdown();
}
