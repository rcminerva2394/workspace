import React, { useState } from 'react'
import styled from 'styled-components'
import Icon from '../../UI/Icon'
import OpenCardModal from '../OpenedCardModal/OpenCardModal'
// import { useBoards } from '../../contexts/boards-context'

const CardItem = ({ card, boardId, boardStatus }) => {
    const [isCardOpened, setIsCardOpened] = useState(card.isCardOpen)
    const [isHold, setIsHold] = useState(false)
    const [displayStyle, setDisplayStyle] = useState('block')
    // const { setBoards } = useBoards()
    const { dueDate } = card.date

    // // Update isCardOpen status for modal
    // useEffect(() => {
    //     setBoards((prevState) => {
    //         const updatedBoards = prevState.map((project) => {
    //             if (project.id === boardId) {
    //                 const updatedCardSet = project[boardStatus].map(
    //                     (cardItem) => {
    //                         if (cardItem.id === card.id) {
    //                             return {
    //                                 ...cardItem,
    //                                 isCardOpen: isCardOpened,
    //                             }
    //                         }
    //                         return cardItem
    //                     }
    //                 )
    //                 return {
    //                     ...project,
    //                     [boardStatus]: updatedCardSet,
    //                 }
    //             }
    //             return project
    //         })
    //         return updatedBoards
    //     })
    // }, [isCardOpened])

    const openCardHandler = () => {
        setIsCardOpened(true)
    }
    const closeCardHandler = () => {
        setIsCardOpened(false)
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

    // For enabling drag and drop API
    const dragStartHandler = (e) => {
        setIsHold(true)
        setTimeout(() => setDisplayStyle('none'), 0)
        const cardData = {
            cardObj: card,
            idBoard: boardId,
            boardType: boardStatus,
        }
        e.dataTransfer.setData('custom-type', JSON.stringify(cardData))
    }

    const dragEndHandler = () => {
        setIsHold(false)
        setDisplayStyle('block')
    }

    return (
        <>
            {isCardOpened && (
                <OpenCardModal
                    card={card}
                    onClose={closeCardHandler}
                    boardId={boardId}
                    boardStatus={boardStatus}
                />
            )}
            <CardWrapper
                onClick={openCardHandler}
                draggable
                onDragStart={dragStartHandler}
                onDragEnd={dragEndHandler}
                hold={isHold}
                display={displayStyle}
            >
                <CardTitleMenuWrap>
                    <CardTitle>{card.title}</CardTitle>
                    <Icon
                        name="Ellipsis"
                        iconColor="#899090"
                        onClick={openCardHandler}
                        hoverColor="#ffffff"
                    />
                </CardTitleMenuWrap>
                {subtasks === undefined || subtasks.length === 0 ? (
                    ''
                ) : (
                    <CompletedTasksNum>
                        {completedSubtasksArr.length} of {card.subtasks.length}{' '}
                        {verb} completed
                    </CompletedTasksNum>
                )}
                {dueDate && (
                    <DueDateWrapper>
                        <Icon name="Clock" iconColor="#AEB7B7" size="18px" />
                        <DueDate>{card.date.dueDate}</DueDate>
                    </DueDateWrapper>
                )}
            </CardWrapper>
        </>
    )
}

const CardWrapper = styled.li`
    background-color: rgba(38, 39, 39, 1);
    padding: 0 10rem 10rem 10rem;
    border-radius: 4px;
    cursor: pointer;
    border: 2px solid
        ${(props) =>
            props.hold ? ({ theme }) => theme.lightGray : 'transparent'};
    display: ${(props) => props.display};
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
    color: ${({ theme }) => theme.darkGray};
    font-weight: 400;
`
const DueDateWrapper = styled.div`
    display: flex;
    align-items: center;
    font-weight: 300;
    margin-top: -5rem;
    margin-left: 10rem;
`
const CompletedTasksNum = styled.p`
    color: ${({ theme }) => theme.darkGray};
    font-weight: 400;
    margin-top: -5rem;
    font-size: 13rem;
`
export default CardItem
