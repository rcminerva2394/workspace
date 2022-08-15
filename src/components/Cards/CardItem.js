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

    const { subtasks } = card
    let verb
    let completedSubtasksArr

    if (subtasks !== undefined) {
        completedSubtasksArr = card.subtasks.filter(
            (subtask) => subtask.completed === true
        )

        // for setting right verb
        if (
            completedSubtasksArr.length === 0 ||
            completedSubtasksArr.length === 1
        ) {
            verb = 'is'
        } else {
            verb = 'are'
        }
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
                {subtasks === undefined ? (
                    ''
                ) : (
                    <p>
                        {completedSubtasksArr.length} of {card.subtasks.length} {verb} completed
                    </p>
                )}
                {card.date.dueDate && (
                    <DueDateWrapper>
                        <Icon name="Clock" iconColor="#AEB7B7" />
                        <DueDate>{card.date.dueDate}</DueDate>
                    </DueDateWrapper>
                )}
            </CardWrapper>
        </>
    )
}

const CardWrapper = styled.li`
    background-color: ${({ theme }) => theme.darkestGray};
    padding: 0 10rem 10rem 10rem;
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
const DueDate = styled.span`
    font-size: 12rem;
    color: ${({ theme }) => theme.fontColors.date};
`
const DueDateWrapper = styled.div`
    display: flex;
    align-items: center;
    margin-left: 5rem;
`
export default CardItem
