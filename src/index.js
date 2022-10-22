import React from 'react'
import ReactDOM from 'react-dom/client'
// import { ThemeProvider } from 'styled-components'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import GlobalStyle from './Theme/GlobalStyle'
import { BoardsProvider } from './contexts/boards-context'
import { ThemesProvider } from './Theme/Themes'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <BoardsProvider>
        <ThemesProvider>
            <BrowserRouter>
                <GlobalStyle />
                <App />
            </BrowserRouter>
        </ThemesProvider>
    </BoardsProvider>
)
