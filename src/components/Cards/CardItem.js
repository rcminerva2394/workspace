import React, { useState } from 'react'
import styled from 'styled-components'
import Icon from '../../UI/Icon'
import OpenCardModal from './OpenCardModal'

const CardItem = ({ card, boardId, boardStatus }) => {
    const [isCardOpen, setIsCardOpen] = useState(false)
    const openCardHandler = () => {
        setIsCardOpen(true)
    }
    const closeCardHandler = () => {
        setIsCardOpen(false)
    }
    return (
        <>
            {isCardOpen && (
                <OpenCardModal
                    card={card}
                    onClose={closeCardHandler}
                    boardId={boardId}
                    boardStatus={boardStatus}
                />
            )}
            <CardWrapper>
                <CardTitleMenuWrap>
                    <CardTitle>{card.title}</CardTitle>
                    <Icon
                        name="Ellipsis"
                        iconColor="#899090"
                        onClick={openCardHandler}
                        hoverColor="#ffffff"
                    />
                </CardTitleMenuWrap>
            </CardWrapper>
        </>
    )
}

const CardWrapper = styled.li`
    background-color: ${({ theme }) => theme.darkestGray};
    padding-right: 10rem;
    padding-left: 10rem;
    border-radius: 4px;
`
const CardTitleMenuWrap = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`
const CardTitle = styled.p`
    font-size: 14rem;
    color: ${({ theme }) => theme.fontColors.title};
`
export default CardItem
