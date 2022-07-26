import React, { useState } from 'react'
import styled from 'styled-components'
import { v4 as uuidv4 } from 'uuid'
import Icon from '../../UI/Icon'
import Button from '../../UI/Button'

const BoardType = ({ name }) => {
    const [isAddBoard, setIsAddBoard] = useState(false)
    const [boardTitle, setBoardTitle] = useState('')
    const [cards, setCards] = useState([])
    const [changeCardTitle, setChangeCardTitle] = useState('')
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
    const submitNewBoardHandler = (e) => {
        e.preventDefault()
        setCards((prevState) => {
            return [
                ...prevState,
                {
                    title: boardTitle,
                    id: uuidv4(),
                },
            ]
        })
        setIsAddBoard(false)
    }
    const changeCardTitleHandler = (e, id) => {
        setChangeCardTitle(e.target.value)
        const newCards = cards.map((card) => {
            const cardElement = card
            if (cardElement.id === id) {
                cardElement.title = changeCardTitle
            }
            return cardElement
        })
        setCards(newCards)
    }
    return (
        <BoardWrapper>
            <IconTitle>
                <Icon name={name} iconColor={color(name)} />
                <p>{name}</p>
            </IconTitle>
            {isAddBoard && (
                <form onSubmit={(e) => submitNewBoardHandler(e)}>
                    <textarea
                        placeholder="Write a title for this card"
                        rows="5"
                        autoCorrect="on"
                        onChange={(e) => setBoardTitle(e.target.value)}
                    />
                    <Button type="submit" primary>
                        Add Card
                    </Button>
                    <Button onClick={() => setIsAddBoard(false)}>Cancel</Button>
                </form>
            )}
            <ul>
                {cards.map((card) => (
                    <li key={card.id}>
                        <input
                            onChange={(e) => changeCardTitleHandler(e, card.id)}
                            value={card.title}
                        />
                    </li>
                ))}
            </ul>
            {!isAddBoard && (
                <Button onClick={() => setIsAddBoard(true)}>+ Add Card</Button>
            )}
        </BoardWrapper>
    )
}

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

export default BoardType
