import React, { useState } from 'react'
import styled from 'styled-components'
import { v4 as uuidv4 } from 'uuid'
import Button from '../UI/Button'
import CreateBoardModal from '../UI/CreateBoardModal'

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
            <SectionWrapper>
                <Title>Explore</Title>
                <p>Create a Board</p>
                <Button onClick={addBoardHandler} primary>
                    Create a New Board
                </Button>
                {isCreatingBoard && (
                    <CreateBoardModal onConfirm={createBoardHandler} />
                )}
            </SectionWrapper>
            <SectionWrapper>
                <Title>Your Boards</Title>
                <ul>
                    {boardList.map((board) => (
                        <li key={board.id}>{board.name}</li>
                    ))}
                </ul>
            </SectionWrapper>
        </>
    )
}

const SectionWrapper = styled.section`
    line-height: 1;
    margin-bottom: 30rem;
`
const Title = styled.p`
    font-size: 19rem;
    font-weight: 600;
    margin-bottom: -1rem;
`
export default Main
