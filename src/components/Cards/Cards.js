import React from 'react'
import styled from 'styled-components'
import CardItem from './CardItem'

const Cards = ({ cards }) => {
    return (
        <CardsListWrapper>
            {cards.map((card) => (
                <CardItem card={card} key={card.id} />
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
