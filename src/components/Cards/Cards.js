import React from 'react'
import styled from 'styled-components'
import CardItem from './CardItem'
import Loader from '../../UI/Loader'

const Cards = ({ cards, boardId, boardStatus }) => {
    if (cards === undefined || cards.length === 0) {
        return <Loader />
    }
    return (
        <CardsListWrapper>
            {cards.map((card) => (
                <CardItem
                    card={card}
                    key={card.id}
                    boardId={boardId}
                    boardStatus={boardStatus}
                />
            ))}
        </CardsListWrapper>
    )
}

const CardsListWrapper = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 5rem;
`

export default Cards
