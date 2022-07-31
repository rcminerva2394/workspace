import React, { useState } from 'react'
import styled from 'styled-components'
import Icon from '../../UI/Icon'
import OpenCardModal from './OpenCardModal'

const CardItem = ({ card }) => {
    const [isOpenCard, setIsOpenCard] = useState(false)
    const openCardHandler = () => {
        setIsOpenCard(true)
    }
    const closeCardHandler = () => {
        setIsOpenCard(false)
    }
    return (
        <>
            {isOpenCard && (
                <OpenCardModal card={card} onClose={closeCardHandler} />
            )}
            <CardWrapper>
                <CardTitleMenuWrap>
                    <CardTitle> {card.title}</CardTitle>
                    <Icon
                        name="Ellipsis"
                        iconColor="#899090"
                        onClick={openCardHandler}
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
