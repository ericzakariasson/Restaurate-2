import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Karla:400,700|Overpass+Mono:400,600&display=swap');

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: 'Karla', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
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
    secondary: {
      hex: '#2065d4',
      hues: [
        '#2065d4',
        '#3674d8',
        '#4d84dd',
        '#6393e1',
        '#79a3e5',
        '#90b2ea',
        '#a6c1ee',
        '#bcd1f2',
        '#d2e0f6',
        '#e9f0fb',
        '#ffffff'
      ],
      rgba: (opacity: number) => `rgba(32, 101, 212, ${opacity / 100})`
    },
    warning: {
      hex: '#ffd56b',
      hues: [
        '#ffd56b',
        '#ffd97a',
        '#ffdd89',
        '#ffe297',
        '#ffe6a6',
        '#ffeab5',
        '#ffeec4',
        '#fff2d3',
        '#fff7e1',
        '#fffbf0',
        '#ffffff'
      ]
    },
    error: {
      hex: '#EA4335',
      hues: [
        '#ea4335',
        '#ec5649',
        '#ee695d',
        '#f07b72',
        '#f28e86',
        '#f5a19a',
        '#f7b4ae',
        '#f9c7c2',
        '#fbd9d7',
        '#fdeceb',
        '#ffffff'
      ]
    },
    success: {
      hex: '#11bf5a',
      hues: [
        '#11bf5a',
        '#29c56b',
        '#41cc7b',
        '#58d28c',
        '#70d99c',
        '#88dfad',
        '#a0e5bd',
        '#b8ecce',
        '#cff2de',
        '#e7f9ef',
        '#ffffff'
      ]
    },
    black: {
      hex: '#222',
      hues: [
        '#222222',
        '#383838',
        '#4e4e4e',
        '#646464',
        '#7a7a7a',
        '#919191',
        '#a7a7a7',
        '#bdbdbd',
        '#d3d3d3',
        '#e9e9e9',
        '#ffffff'
      ]
    }
  },
  fonts: {
    default: 'Karla, sans-serif',
    monospace: '"Overpass Mono", monospace'
  },
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.08)',
  fontSize: {
    xxsmall: '0.625rem',
    xsmall: '0.75rem',
    small: '0.875rem',
    normal: '1rem',
    large: '1.125rem',
    xl: '1.25rem',
    xxl: '1.5rem'
  }
};
