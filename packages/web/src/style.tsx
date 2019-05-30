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
    height: 100%;
  }
`;

export const theme = {
  transition: '0.2s ease-in-out',
  colors: {
    main: {
      hex: '#FF6666',
      hues: ['#FF6666'],
      rgba: (opacity: number) => `rgba(255, 102, 102, ${opacity / 100})`
    },
    error: {
      hex: '#EA4335'
    }
    // rgba: (opacity: number): string => `rgba(140, 116, 228, ${opacity / 100})`
  }
};
