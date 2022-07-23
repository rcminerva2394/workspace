import React from 'react'
import ReactDOM from 'react-dom/client'
import { ThemeProvider } from 'styled-components'
import App from './App'
import Colors from './Theme/Colors'
import GlobalStyle from './Theme/GlobalStyle'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <ThemeProvider theme={Colors}>
        <GlobalStyle />
        <App />
    </ThemeProvider>
)
