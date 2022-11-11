import React, { useState, useEffect } from 'react'

import styled from 'styled-components'
import { useBoards } from '../../contexts/boards-context'
import CreateBoardModal from './CreateBoardModal'
import SectionWrapper from '../../UI/SectionWrapper'
import Button from '../../UI/Button'
import BoardListPrev from '../Boards/BoardListPrev'
import device from '../../UI/Breakpoint'
import { getBoards } from '../../utils/reads/FetchDataFuncs'
import { addBoard } from '../../utils/writes/writeData'

const CreateBoard = () => {
    const [isCreatingBoard, setIsCreatingBoard] = useState(false)
    const { setBoards } = useBoards()

    // fetch the boards
    useEffect(() => {
        getBoards(setBoards)
    }, [])

    const addBoardHandler = () => {
        setIsCreatingBoard(true)
    }

    const createBoardHandler = (response) => {
        if (response.stat === true) {
            addBoard(response.name, setBoards)
            setIsCreatingBoard(false)
        } else if (response.stat === false) {
            setIsCreatingBoard(false)
        }
    }

    return (
        <ContentWrap>
            <SectionWrapper>
                <h2>Explore</h2>
                <p>Create a Board</p>
                <Button onClick={addBoardHandler} primary>
                    Create a New Board
                </Button>
            </SectionWrapper>
            {isCreatingBoard && (
                <CreateBoardModal onConfirm={createBoardHandler} />
            )}
            <BoardListPrev />
        </ContentWrap>
    )
}

const ContentWrap = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    flex-direction: column;
    @media only screen and ${device.mobileL} {
        margin: 20rem;
    }
    @media only screen and ${device.laptop} {
        margin-left: 270px;
        margin: 30rem 30rem 30remm 220px;
    }
`

export default CreateBoard
