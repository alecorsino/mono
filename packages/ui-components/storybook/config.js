import { configure } from '@storybook/react';

function loadStories() {
  //webpack dep mngmt
  let r = require.context('./stories', true, /.tsx$/)
  r.keys().forEach(r);
}

configure(loadStories, module);