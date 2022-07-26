import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import BoardListPrev from './Boards/BoardListPrev'
import CreateBoard from './CreateBoard'

import CreateBoardModal from '../UI/CreateBoardModal'

import BoardList from './Boards/BoardList'

const Main = () => {
    const [isCreatingBoard, setIsCreatingBoard] = useState(false)
    const [boardList, setBoardList] = useState([])
    const addBoardHandler = () => {
        setIsCreatingBoard(true)
    }
    const createBoardHandler = (response) => {
        if (response.stat === true) {
            setBoardList((prevState) => {
                return [
                    ...prevState,
                    {
                        id: uuidv4(),
                        name: response.name,
                    },
                ]
            })
            setIsCreatingBoard(false)
        } else if (response.stat === false) {
            setIsCreatingBoard(false)
        }
    }
    return (
        <>
            <CreateBoard onAddBoard={addBoardHandler} />
            {isCreatingBoard && (
                <CreateBoardModal onConfirm={createBoardHandler} />
            )}
            <BoardListPrev boardList={boardList} />
            <BoardList boardList={boardList} />
        </>
    )
}

export default Main
