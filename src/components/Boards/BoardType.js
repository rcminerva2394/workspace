import React, { useState } from 'react'
import styled from 'styled-components'
import { v4 as uuidv4 } from 'uuid'
import Icon from '../../UI/Icon'
import Button from '../../UI/Button'
import Cards from '../Cards/Cards'

const BoardType = ({ name }) => {
    const [isAddCard, setIsAddCard] = useState(false)
    const [cardTitle, setCardTitle] = useState('')
    const [cards, setCards] = useState([])
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
        setCards((prevState) => {
            return [
                ...prevState,
                {
                    title: cardTitle,
                    id: uuidv4(),
                },
            ]
        })
        setIsAddCard(false)
    }
    const updateCardsHandler = (updatedCards) => {
        setCards(updatedCards)
    }
    console.log(cards)
    return (
        <BoardWrapper>
            <IconTitle>
                <Icon name={name} iconColor={color(name)} />
                <Title>{name}</Title>
            </IconTitle>
            <Cards cards={cards} onUpdateCards={updateCardsHandler} />
            {isAddCard && (
                <form onSubmit={(e) => submitNewCardHandler(e)}>
                    <AddCardInput
                        placeholder="Write a title for this card"
                        onChange={(e) => setCardTitle(e.target.value)}
                    />
                    <FormBtnGrp>
                        <Button type="submit" primary>
                            Add Card
                        </Button>
                        <Button onClick={() => setIsAddCard(false)}>
                            Cancel
                        </Button>
                    </FormBtnGrp>
                </form>
            )}
            {!isAddCard && (
                <Button onClick={() => setIsAddCard(true)}>+ Add Card</Button>
            )}
        </BoardWrapper>
    )
}

const BoardWrapper = styled.div`
    background-color: ${({ theme }) => theme.boardWrap};
    margin: 15rem 0;
    padding: 15rem;
    border-radius: 5px;
`
const IconTitle = styled.div`
    display: flex;
    flex-direction: row;
    place-items: center;
`
const Title = styled.p`
    font-size: 17rem;
    font-weight: 400;
`
const AddCardInput = styled.input`
    disply: inline-block;
    padding: 10rem 10rem;
    line-height: 10rem;
    width: 100%;
`
const FormBtnGrp = styled.div`
    margin-top: 10rem;
`
export default BoardType
