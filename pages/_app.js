import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { AlurakutStyles } from '../src/lib/AlurakutCommons';

const GlobalStyle = createGlobalStyle`

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box; 
  }
  body {
    background:url('https://www.palaiszelda.com/cado/fds-ecran/botw_7_1920.jpg');
    background-size:cover ;
    font-family: sans-serif;
  }

  #__next {
    display: flex;
    min-height: 100vh;
    flex-direction:column;
  }

  img {
    max-width: 100%;
    height: auto;
    display: block;

  }
  ${AlurakutStyles}
`;

const theme = {
  colors: {
    primary: '#4C6277',
  },
};

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
