import { configure } from '@storybook/react';

const requireStories = require.context('../stories', true, /\.js$/);

function loadStories() {
  requireStories.keys().forEach((filename) => requireStories(filename));
}

configure(loadStories, module);
