import React, { useState } from 'react'
import styled from 'styled-components'
import { v4 as uuidv4 } from 'uuid'
import boardPhoto from '../assets/night-view.png'
import Button from '../UI/Button'
import CreateBoardModal from '../UI/CreateBoardModal'
import device from '../UI/Breakpoint'
import Icon from '../UI/Icon'

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
                <BoardList>
                    {boardList.map((board) => (
                        <a href={`#${board.id}`} key={board.id}>
                            <BoardName>{board.name}</BoardName>
                            <BGPhoto src={boardPhoto} alt="night view" />
                        </a>
                    ))}
                </BoardList>
            </SectionWrapper>
            <SectionWrapper>
                <ul>
                    {boardList.map((board) => (
                        <BoardItem key={board.id} id={board.id}>
                            <BoardTitle>{board.name}</BoardTitle>
                            <BoardWrapper>
                                <IconTitle>
                                    <Icon name="clock" Iconcolor="#FFE600" />
                                    <p>Todo</p>
                                </IconTitle>
                                <Button>+ Add Card</Button>
                            </BoardWrapper>
                        </BoardItem>
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
const Title = styled.h2`
    font-weight: 600;
    margin-bottom: -1rem;
`
const BGPhoto = styled.img`
    width: 100%;
    object-fit: cover;
    height: 90px;
    @media only screen and ${device.mobileL} {
        width: 320px;
    }
`
const BoardName = styled.p`
    position: absolute;
    z-index: 10;
    padding-left: 10rem;
`

const BoardList = styled.ul`
    display: flex;
    flex-direction: column;
    position: relative;
    gap: 10rem;
    flex-wrap: wrap;
    @media only screen and ${device.mobileL} {
        flex-direction: row;
    }
`

const BoardTitle = styled.h3`
    font-weight: 600;
    margin-bottom: -1rem;
`

const BoardWrapper = styled.div`
    background-color: ${({ theme }) => theme.boardWrap};
    margin: 15rem 0;
    padding: 10rem;
    border-radius: 5px;
`
const IconTitle = styled.div`
    display: flex;
    flex-direction: row;
    place-items: center;
`
const BoardItem = styled.li`
    margin-top: 20rem;
`

export default Main
