import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body {
    font-family: 'Open Sans', sans-serif;
    overflow-x: hidden;
    color: #222222;
  }
  button,a {
    border: none;
    background: none;
    cursor: pointer;
    text-decoration: none;
    font-family: 'Open Sans', sans-serif;
    color: #222222;
  }
  
  input:focus {
    outline: none;
  }
`;

export default GlobalStyles;
