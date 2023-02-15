import { DefaultTheme } from "styled-components";

const palette = {
  maincolor: '#6D9886',
  background: '#393E46',
  white: '#FFFFFF',
  black: '#000000',
  border: '#DBDBDB',
};

const bp = {
  xxl: '1460px',
  xl: '1200px',
  lg: '1024px',
  md: '798px',
  sm: '600px',
};

const fontSize = {
  smFont: '1.1rem',
  mdFont: '1.3rem',
  lgFont: '1.4rem',
};

const theme: DefaultTheme = {
  palette,
  bp,
  fontSize
};

export default theme;
