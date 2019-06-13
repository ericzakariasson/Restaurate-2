import { configure, addDecorator } from '@storybook/react';
import * as React from 'react';
import { ThemeProvider } from 'styled-components';

import { theme, GlobalStyle } from '../src/style';

addDecorator(story => (
  <ThemeProvider theme={theme}>
    <div
      style={{
        padding: 30
      }}
    >
      <GlobalStyle />
      {story()}
    </div>
  </ThemeProvider>
));

function loadStories() {
  require('../src/stories');
}

configure(loadStories, module);
