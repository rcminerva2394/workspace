import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`

* {
    box-sizing: border-box
}

html { 
    font-size: 6.25%;
    scroll-behavior: smooth;
}

body {
    margin: 0;
    font-family: 'Poppins', sans-serif;
    text-rendering: geometricPrecision !important;
    font-size: 13rem;
    min-height: 100%;
    line-height: 1.4;
    background-color: ${({ theme }) => theme.darkerGray};
    font-weight: 200;
    color: #ffffff;
    padding: 20rem 20rem ;
}

button {
    font-family: inherit;
}

label {
    color: #000000;
    font-weight: 500;
}

input {
    font-size: inherit;
    width: 30ch;
    border: 2px solid;
    border-color: ${({ theme }) => theme.lightGray};
    border-radius: 4px;
    padding: 8rem;
}

ul {
    list-style-type: none;
    padding: 0;
}
a {
    text-decoration: none;
    color: inherit;
    text-align: start;
    font-weight: 400;
}


`

export default GlobalStyle
