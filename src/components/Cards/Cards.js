import React from 'react'
import styled from 'styled-components'

const Cards = ({ cards }) => {
    // const [changeCardTitle, setChangeCardTitle] = useState('')
    // const changeCardTitleHandler = (e, id) => {
    //     setChangeCardTitle(e.target.value)
    //     const newCards = cards.map((card) => {
    //         const cardElement = card
    //         if (cardElement.id === id) {
    //             cardElement.title = changeCardTitle
    //         }
    //         return cardElement
    //     })
    //     onUpdateCards(newCards)
    // }
    return (
        <ul>
            {cards.map((card) => (
                <CardWrapper key={card.id}>
                    <CardTitle
                    // onChange={(e) => changeCardTitleHandler(e, card.id)}
                    >
                        {card.title}
                    </CardTitle>
                </CardWrapper>
            ))}
        </ul>
    )
}

const CardWrapper = styled.li`
    background-color: ${({ theme }) => theme.darkestGray};
    padding: 5rem;
    border-radius: 4px;
    display: flex;
    justify-content: center;
`
const CardTitle = styled.p`
    font-size: 15rem;
`
export default Cards
