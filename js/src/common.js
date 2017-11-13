import 'jquery';
import 'bootstrap/js/src/dropdown.js';
import 'bootstrap/js/src/collapse.js';
import 'bootstrap/js/src/tab.js';
import React from 'react';
import ReactDOM from 'react-dom';
import { fillLanguageDropdown } from './lib/production';
import Search from './lib/Search';
import { checkServiceStatus } from './lib/serviceStatus';

checkServiceStatus();

ReactDOM.render(<Search />, document.getElementById('search'));

if (process.env.NODE_ENV === 'production') {
  fillLanguageDropdown();
}
