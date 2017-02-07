import {fillLanguageDropdown} from './lib/production';

if (process.env.NODE_ENV === 'production') {
  production();
}
