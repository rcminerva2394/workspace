import React from 'react'
import ReactDOM from 'react-dom/client'
import { ThemeProvider } from 'styled-components'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import Colors from './Theme/Colors'
import GlobalStyle from './Theme/GlobalStyle'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <ThemeProvider theme={Colors}>
        <BrowserRouter>
            <GlobalStyle />
            <App />
        </BrowserRouter>
    </ThemeProvider>
)
