import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Muli:400,600,700');

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: 'Muli', sans-serif;
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
  colors: {
    primary: {
      hex: '#FF6666',
      light: '#FFECEC',
      hues: [
        '#ff6666',
        '#ff7575',
        '#ff8585',
        '#ff9494',
        '#ffa3a3',
        '#ffb3b3',
        '#ffc2c2',
        '#ffd1d1',
        '#ffe0e0',
        '#fff0f0'
      ],
      rgba: (opacity: number) => `rgba(255, 102, 102, ${opacity / 100})`,
      gradient: 'linear-gradient(105deg, #FF6666 15%, #FD7394 85%);'
    },
    error: {
      hex: '#EA4335'
    }
    // rgba: (opacity: number): string => `rgba(140, 116, 228, ${opacity / 100})`
  },
  fontSize: {
    xxsmall: '0.625rem',
    xsmall: '0.75rem',
    small: '0.875rem',
    normal: '1rem'
  }
};
