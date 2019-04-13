import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    font-size: 16px;
    font-family: sans-serif;
  }
`;

export const theme = {
  colors: {
    main: {
      hues: ['#faf9ff', '#F3F0FE', '#8C74E4', '#5F4BA9'],
      rgba: (opacity: number) => `rgba(140, 116, 228, ${opacity / 100})`
    }
    // rgba: (opacity: number): string => `rgba(140, 116, 228, ${opacity / 100})`
  }
};
