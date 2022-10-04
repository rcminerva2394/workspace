import React, { useState, useContext, useMemo } from 'react'

const BoardsContext = React.createContext({
    boards: [],
    setBoards: () => {},
})

export const useBoards = () => {
    return useContext(BoardsContext)
}

export const BoardsProvider = ({ children }) => {
    const [boards, setBoards] = useState()
    const boardsValue = useMemo(() => ({ boards, setBoards }), [boards])

    return (
        <BoardsContext.Provider value={boardsValue}>
            {children}
        </BoardsContext.Provider>
    )
}
