import React, { useState, useContext } from 'react'
import styled from 'styled-components'
import { v4 as uuidv4 } from 'uuid'
import Icon from '../../UI/Icon'
import Button from '../../UI/Button'
import Cards from '../Cards/Cards'
import BoardsContext from '../../context/boards-context'
import device from '../../UI/Breakpoint'

const BoardType = ({ boardStatus, id, cards }) => {
    const [isAddCard, setIsAddCard] = useState(false)
    const [cardTitle, setCardTitle] = useState('')
    const { setBoards } = useContext(BoardsContext)
    const color = (boardType) => {
        const boardTypeName = boardType.toLowerCase()
        let colorOfIcon
        if (boardTypeName === 'todo') {
            colorOfIcon = '#FFE600'
        } else if (boardTypeName === 'doing') {
            colorOfIcon = '#3E8BFF'
        } else if (boardTypeName === 'done') {
            colorOfIcon = '#19E446'
        }
        return colorOfIcon
    }
    const submitNewCardHandler = (e) => {
        e.preventDefault()
        setBoards((prevState) => {
            const updatedBoards = prevState.map((project) => {
                if (project.id === id) {
                    return {
                        ...project,
                        [boardStatus]: [
                            ...project[boardStatus],
                            {
                                id: uuidv4(),
                                title: cardTitle,
                                status: [boardStatus],
                                isCardOpen: false,
                                date: {
                                    startDate: '',
                                    dueDate: '',
                                    deadlineTime: '',
                                    completed: false,
                                },
                            },
                        ],
                    }
                }
                return project
            })
            return updatedBoards
        })
        setIsAddCard(false)
    }
    return (
        <BoardWrapper>
            <IconTitle>
                <Icon
                    name={boardStatus}
                    iconColor={color(boardStatus)}
                    size="24rem"
                />
                <Title>{boardStatus}</Title>
            </IconTitle>
            <Cards cards={cards} boardId={id} boardStatus={boardStatus} />
            {isAddCard && (
                <form onSubmit={submitNewCardHandler}>
                    <AddCardInput
                        placeholder="Write a title for this card"
                        onChange={(e) => setCardTitle(e.target.value)}
                    />
                    <FormBtnGrp>
                        <Button
                            type="submit"
                            primary
                            fontSize="12rem"
                            padding="6rem"
                        >
                            Add Card
                        </Button>
                        <Button
                            onClick={() => setIsAddCard(false)}
                            fontSize="12rem"
                            padding="6rem"
                        >
                            Cancel
                        </Button>
                    </FormBtnGrp>
                </form>
            )}
            {!isAddCard && (
                <Button
                    onClick={() => setIsAddCard(true)}
                    fontSize="14rem"
                    padding="6rem"
                >
                    + Add Card
                </Button>
            )}
        </BoardWrapper>
    )
}

const BoardWrapper = styled.div`
    background-color: ${({ theme }) => theme.boardWrap};
    margin: 15rem 0;
    padding: 0 15rem 15rem 15rem;
    border-radius: 5px;
    width: 100%;
    @media only screen and ${device.mobileXL} {
        width: 45%;
    }
    @media only screen and ${device.laptop} {
        width: 30%;
    }
`
const IconTitle = styled.div`
    display: flex;
    flex-direction: row;
    place-items: center;
`
const Title = styled.p`
    font-size: 16rem;
    font-weight: 500;
`

const AddCardInput = styled.input`
    disply: inline-block;
    padding: 10rem 10rem;
    line-height: 10rem;
    width: 100%;
    background-color: transparent;
    border: 1px solid rgba(163, 164, 177, 0.2);
    color: #ffffff;
    font-weight: 300;
    font-family: inherit;
    text-align: center;
`
const FormBtnGrp = styled.div`
    margin-top: 10rem;
    display: flex;
    justify-content: flex-start;
    gap: 5rem;
`
export default BoardType
