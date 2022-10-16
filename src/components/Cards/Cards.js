import React from 'react'
import styled from 'styled-components'
import CardItem from './CardItem'
import Loader from '../../UI/Loader'

const Cards = ({ cards, boardId, boardStatus }) => {
    return (
        <CardsListWrapper>
            {cards === undefined ? (
                <Loader />
            ) : cards.length === 0 ? (
                <p>No Card Listed</p>
            ) : (
                cards.map((card) => (
                    <CardItem
                        card={card}
                        key={card.id}
                        boardId={boardId}
                        boardStatus={boardStatus}
                    />
                ))
            )}
        </CardsListWrapper>
    )
}

const CardsListWrapper = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 5rem;
`

export default Cards
