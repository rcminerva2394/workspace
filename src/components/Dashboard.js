import React, { useState, useContext } from 'react'
import { v4 as uuidv4 } from 'uuid'

import styled from 'styled-components'
import device from '../UI/Breakpoint'

import SideNavBar from './SideNavBar'
import CreateBoard from './CreateBoard/CreateBoard'
import CreateBoardModal from './CreateBoard/CreateBoardModal'
import BoardListPrev from './Boards/BoardListPrev'

import BoardsContext from '../contexts/boards-context'

const Dashboard = () => {
    const [isCreatingBoard, setIsCreatingBoard] = useState(false)
    const { setBoards } = useContext(BoardsContext)
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
    return (
        <>
            <SideNavBar />
            <ContentWrap>
                <CreateBoard onAddBoard={addBoardHandler} />
                {isCreatingBoard && (
                    <CreateBoardModal onConfirm={createBoardHandler} />
                )}
                <BoardListPrev />
            </ContentWrap>
        </>
    )
}

const ContentWrap = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    flex-direction: column;
    margin: 30rem;
    @media only screen and ${device.laptop} {
        margin-left: 280px;
    }
`
export default Dashboard
