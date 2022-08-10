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
    letter-spacing: 1px;
}

h2, h3 {
    margin-bottom: -1rem;
}


h2 {
    font-size: 20px;
    font-weight: 600;
}

h3 {
    font-size: 18px;
    font-weight: 600;
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

form {
    margin-top: 5rem;
}

textarea {
    font-family: inherit;
    resize: none;
    background-color: ${({ theme }) => theme.darkestGray};
    border:  1px solid rgba(163, 164, 177, 0.2);
    padding: 10rem;
    outline: none;
    caret-color: #ffffff;
    height: 100px;
    box-sizing: border-box;
}

select  {
    background-color: ${({ theme }) => theme.darkLight};
    color: #ffffff;
    padding: 2rem;
    border-radius: 4px;
    font-family: inherit;
    font-weight: 300;
    outline: none;
}

select option {
    background-color: #ffffff;
    color: #000000;
}

p { 
    line-height: 1.5;
    font-weight: 200;
    color: ${({ theme }) => theme.lightGray};
}
`

export default GlobalStyle
