import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Karla:400,700|Overpass+Mono:400,600&display=swap');

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: 'Karla', sans-serif;
  }

  html {
    font-size: 16px;
  }

  html, body, #root {
    min-height: 100%;
  }

  button {
    cursor: pointer;
  }
`;

export const theme = {
  transition: '0.15s ease-in-out',
  page: {
    padding: '20px 20px'
  },
  colors: {
    primary: {
      hex: '#FFD966',
      hues: [
        '#ffd966',
        '#ffdd75',
        '#ffe185',
        '#ffe494',
        '#ffe8a3',
        '#ffecb3',
        '#fff0c2',
        '#fff4d1',
        '#fff7e0',
        '#fffbf0',
        '#ffffff'
      ],
      rgba: (opacity: number) => `rgba(255, 102, 102, ${opacity / 100})`,
      gradient: 'linear-gradient(105deg, #FF6666 15%, #FD7394 85%);'
    },
    error: {
      hex: '#EA4335'
    }
    // rgba: (opacity: number): string => `rgba(140, 116, 228, ${opacity / 100})`
  },
  fonts: {
    default: 'Karla, sans-serif',
    monospace: '"Overpass Mono", monospace'
  },
  boxShadow: '0px 4px 2px rgba(0, 0, 0, 0.04)',
  fontSize: {
    xxsmall: '0.625rem',
    xsmall: '0.75rem',
    small: '0.875rem',
    normal: '1rem',
    large: '1.1rem'
  }
};
