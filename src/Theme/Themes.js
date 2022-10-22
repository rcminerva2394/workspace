import React, { useState, useContext, useMemo } from 'react'

const COLORS = {
    darkestGray: '#252727',
    darkerGray: '#323434',
    darkGray: '#899090',
    darkLight: '#6A6A6B',
    lightGray: '#DDD5D5',
    boardWrap: '#4B4E4E',
    fontColors: {
        inActive: '#A2A4A4',
        title: '#E4E7E7',
        date: '#AEB7B7',
    },
    icons: {
        todo: '#FFE600',
        done: '#3E8BFF',
        doing: '#19E446',
    },
    button: {
        blue: '#0F68EF',
        hover: '#0c54c0',
        text: '#cfe1fc',
    },
}

const ThemesContext = React.createContext({
    colors: COLORS,
    setColors: () => {},
})

export const useColors = () => {
    return useContext(ThemesContext)
}

export const ThemesProvider = ({ children }) => {
    const [themes, setThemes] = useState()
    const themesValue = useMemo(() => ({ themes, setThemes }), [themes])

    return (
        <ThemesContext.Provider value={themesValue}>
            {children}
        </ThemesContext.Provider>
    )
}
