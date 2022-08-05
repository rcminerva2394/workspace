import React, { useState, useMemo } from 'react'
import { v4 as uuidv4 } from 'uuid'
import BoardListPrev from './Boards/BoardListPrev'
import CreateBoard from './CreateBoard/CreateBoard'
import CreateBoardModal from './CreateBoard/CreateBoardModal'
import BoardList from './Boards/BoardList'
import BoardsContext from '../context/boards-context'
import exampleBoards from '../UI/exampleBoards'

const Main = () => {
    const [isCreatingBoard, setIsCreatingBoard] = useState(false)
    const [boards, setBoards] = useState(exampleBoards)
    const value = useMemo(() => ({ boards, setBoards }), [boards])
    const addBoardHandler = () => {
        setIsCreatingBoard(true)
    }
    const createBoardHandler = (response) => {
        if (response.stat === true) {
            setBoards((prevState) => {
                return [
                    ...prevState,
                    {
                        id: uuidv4(),
                        boardName: response.name,
                        Todo: [],
                        Doing: [],
                        Done: [],
                    },
                ]
            })
            setIsCreatingBoard(false)
        } else if (response.stat === false) {
            setIsCreatingBoard(false)
        }
    }
    console.log(boards)
    return (
        <BoardsContext.Provider value={value}>
            <CreateBoard onAddBoard={addBoardHandler} />
            {isCreatingBoard && (
                <CreateBoardModal onConfirm={createBoardHandler} />
            )}
            <BoardListPrev />
            <BoardList />
        </BoardsContext.Provider>
    )
}

export default Main
