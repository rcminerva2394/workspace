import React, { useState, useContext, useEffect } from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import Button from '../../UI/Button'
import Icon from '../../UI/Icon'
import device from '../../UI/Breakpoint'
import BoardsContext from '../../context/boards-context'
import SetDate from '../Dates/SetDate'
import Subtasks from '../Subtasks/Subtasks'
import DeleteModal from '../../UI/DeleteModal'

const ModalBackdrop = ({ onClose }) => <Backdrop onClick={onClose} />

const Main = ({ card, onClose, boardId, boardStatus }) => {
    const [isChangeCardTitle, setIsChangeCardTitle] = useState(false)
    const [newCardTitle, setNewCardTitle] = useState(card.title)
    const [isWriteDescription, setIsWriteDescription] = useState(false)
    const [cardDescription, setCardDescription] = useState(card.description)
    const [selected, setSelected] = useState(card.status)
    const [isDeadlineOpen, setIsDeadlineOpen] = useState(false)
    const [startDate, setStartDate] = useState(card.date.startDate)
    const [dueDate, setDueDate] = useState(card.date.dueDate)
    const [deadlineTime, setDeadlineTime] = useState(card.date.deadlineTime)
    const [isDueDateCompleted, setIsDueDateCompleted] = useState(
        card.date.completed
    )

    // Assess whether subtasks are undefined if not, get length to establish if truthy or falsy
    const { subtasks } = card
    const subtasksLength = () => {
        if (subtasks === undefined || subtasks.length === 0) {
            return undefined
        }
        return subtasks.length
    }
    const [hasSubtasks, setHasSubtasks] = useState(subtasksLength())
    const [willDeleteCard, setWillDeleteCard] = useState(false)
    const { setBoards } = useContext(BoardsContext)

    // Updating the completion status of the duedate / deadline
    useEffect(() => {
        setBoards((prevState) => {
            const updatedBoards = prevState.map((project) => {
                if (project.id === boardId) {
                    const updatedCardSet = project[boardStatus].map(
                        (cardItem) => {
                            if (cardItem.id === card.id) {
                                return {
                                    ...cardItem,
                                    date: {
                                        ...cardItem.date,
                                        completed: isDueDateCompleted,
                                    },
                                }
                            }
                            return cardItem
                        }
                    )
                    return {
                        ...project,
                        [boardStatus]: updatedCardSet,
                    }
                }
                return project
            })
            return updatedBoards
        })
    }, [isDueDateCompleted])

    // Renaming Card Title
    const submitNewCardTitleHandler = (e) => {
        e.preventDefault()
        setBoards((prevState) => {
            const updatedBoards = prevState.map((project) => {
                if (project.id === boardId) {
                    const updatedCardSet = project[boardStatus].map(
                        (cardItem) => {
                            if (cardItem.id === card.id) {
                                return {
                                    ...cardItem,
                                    title: newCardTitle,
                                }
                            }
                            return cardItem
                        }
                    )
                    return {
                        ...project,
                        [boardStatus]: updatedCardSet,
                    }
                }
                return project
            })
            return updatedBoards
        })
        setIsChangeCardTitle(false)
    }

    // Adding Description
    const addDescriptionHandler = (e) => {
        e.preventDefault()
        setBoards((prevState) => {
            const updatedBoards = prevState.map((project) => {
                if (project.id === boardId) {
                    const updatedCardSet = project[boardStatus].map(
                        (cardItem) => {
                            if (cardItem.id === card.id) {
                                return {
                                    ...cardItem,
                                    description: cardDescription,
                                }
                            }
                            return cardItem
                        }
                    )
                    return {
                        ...project,
                        [boardStatus]: updatedCardSet,
                    }
                }
                return project
            })
            return updatedBoards
        })
        setIsWriteDescription(false)
    }

    // Card Status Options
    const cardStatusArr = ['Todo', 'Doing', 'Done']
    const filteredStatus = cardStatusArr.filter(
        (status) => status !== card.status
    )
    const optionStatus = filteredStatus.map((status) => {
        return (
            <option key={status} value={status}>
                {status}
            </option>
        )
    })

    // Change the status of the card
    const changeCardStatusHandler = (e) => {
        setSelected(e.target.value)

        if (card.status !== e.target.value) {
            const newCardItem = {
                ...card,
                status: e.target.value,
            }
            setBoards((prevState) => {
                const updatedBoards = prevState.map((project) => {
                    if (project.id === boardId) {
                        const updatedCardSet = project[boardStatus].filter(
                            (cardItem) => cardItem.id !== card.id
                        )
                        return {
                            ...project,
                            [boardStatus]: updatedCardSet,
                            [e.target.value]: [
                                ...project[e.target.value],
                                newCardItem,
                            ],
                        }
                    }
                    return project
                })
                return updatedBoards
            })
        }
    }

    const dateHandler = (dateObj) => {
        setStartDate(dateObj.startDate)
        setDueDate(dateObj.dueDate)
        setDeadlineTime(dateObj.deadlineTime)
        setBoards((prevState) => {
            const updatedBoards = prevState.map((project) => {
                if (project.id === boardId) {
                    const updatedCardSet = project[boardStatus].map(
                        (cardItem) => {
                            if (cardItem.id === card.id) {
                                return {
                                    ...cardItem,
                                    date: dateObj,
                                }
                            }
                            return cardItem
                        }
                    )
                    return {
                        ...project,
                        [boardStatus]: updatedCardSet,
                    }
                }
                return project
            })
            return updatedBoards
        })
    }

    // Change card due date completion status
    const changeDueDateCompletionHandler = () => {
        setIsDueDateCompleted((prevState) => !prevState)
    }

    // Adding Subtasks
    const addSubtasksHandler = () => {
        setBoards((prevState) => {
            const updatedBoards = prevState.map((project) => {
                if (project.id === boardId) {
                    const updatedCardSet = project[boardStatus].map(
                        (cardItem) => {
                            if (cardItem.id === card.id) {
                                return {
                                    ...cardItem,
                                    subtasks: [],
                                }
                            }
                            return cardItem
                        }
                    )
                    return {
                        ...project,
                        [boardStatus]: updatedCardSet,
                    }
                }
                return project
            })
            return updatedBoards
        })
        setHasSubtasks(true)
    }

    const hideSubtasksIfZero = (value) => {
        setHasSubtasks(value)
    }

    const deleteItem = () => {
        setBoards((prevState) => {
            const updatedBoards = prevState.map((project) => {
                if (project.id === boardId) {
                    const updatedCardSet = project[boardStatus].filter(
                        (cardItem) => cardItem.id !== card.id
                    )
                    return {
                        ...project,
                        [boardStatus]: updatedCardSet,
                    }
                }
                return project
            })
            return updatedBoards
        })
        setWillDeleteCard(false)
    }

    return (
        <>
            <OpenCardWrapper>
                <Close onClick={onClose}>
                    <Icon
                        name="Close"
                        iconColor="#899090"
                        hoverColor="#ffffff"
                    />
                </Close>
                <CardDetails>
                    <div>
                        {isChangeCardTitle ? (
                            <form onSubmit={submitNewCardTitleHandler}>
                                <input
                                    onChange={(e) =>
                                        setNewCardTitle(e.target.value)
                                    }
                                    placeholder="Change Card Title"
                                    style={{ width: '100%' }}
                                    value={newCardTitle}
                                />
                                <Btns>
                                    <Button
                                        primary
                                        type="submit"
                                        padding="auto"
                                    >
                                        Rename
                                    </Button>
                                    <Button
                                        onClick={() =>
                                            setIsChangeCardTitle(false)
                                        }
                                        padding="auto"
                                    >
                                        Cancel
                                    </Button>
                                </Btns>
                            </form>
                        ) : (
                            <H3
                                role="presentation"
                                onClick={() => setIsChangeCardTitle(true)}
                            >
                                {card.title}
                            </H3>
                        )}
                        {startDate && dueDate ? (
                            <LabelWrapper>
                                <Label>Duration</Label>
                                <DateCheckWrapper>
                                    <CheckDateComplete
                                        type="checkbox"
                                        onChange={
                                            changeDueDateCompletionHandler
                                        }
                                        checked={isDueDateCompleted}
                                    />
                                    {isDueDateCompleted ? (
                                        <DateCompleted>
                                            From {startDate} - {dueDate}
                                            {` ${deadlineTime}`}
                                        </DateCompleted>
                                    ) : (
                                        <DateText>
                                            From {startDate} - {dueDate}
                                            {` ${deadlineTime}`}
                                        </DateText>
                                    )}
                                </DateCheckWrapper>
                            </LabelWrapper>
                        ) : !dueDate && startDate ? (
                            <LabelWrapper>
                                <Label>Start Date</Label>
                                <DateCheckWrapper>
                                    <CheckDateComplete
                                        type="checkbox"
                                        onChange={
                                            changeDueDateCompletionHandler
                                        }
                                        checked={isDueDateCompleted}
                                    />
                                    {isDueDateCompleted ? (
                                        <DateCompleted>
                                            {startDate}
                                        </DateCompleted>
                                    ) : (
                                        <DateText>{startDate}</DateText>
                                    )}
                                </DateCheckWrapper>
                            </LabelWrapper>
                        ) : dueDate && !startDate ? (
                            <LabelWrapper>
                                <Label> Due Date</Label>
                                <DateCheckWrapper>
                                    <CheckDateComplete
                                        type="checkbox"
                                        onChange={
                                            changeDueDateCompletionHandler
                                        }
                                        checked={isDueDateCompleted}
                                    />
                                    {isDueDateCompleted ? (
                                        <DateCompleted>
                                            {dueDate} {deadlineTime}
                                        </DateCompleted>
                                    ) : (
                                        <DateText>
                                            {dueDate} {deadlineTime}
                                        </DateText>
                                    )}
                                </DateCheckWrapper>
                            </LabelWrapper>
                        ) : (
                            ''
                        )}
                        <LabelWrapper>
                            <Label htmlFor={card.id}>Description</Label>
                            {isWriteDescription ? (
                                <form onSubmit={addDescriptionHandler}>
                                    <Description
                                        id={card.id}
                                        placeholder="e.g. Set up a meeting with the stakeholders regarding the targets next year"
                                        value={cardDescription}
                                        onChange={(e) =>
                                            setCardDescription(e.target.value)
                                        }
                                    />
                                    <Btns>
                                        <Button
                                            primary
                                            type="submit"
                                            padding="auto"
                                        >
                                            Add
                                        </Button>
                                        <Button
                                            onClick={() =>
                                                setIsWriteDescription(false)
                                            }
                                            padding="auto"
                                        >
                                            Cancel
                                        </Button>
                                    </Btns>
                                </form>
                            ) : cardDescription ? (
                                <Paragraph
                                    role="presentation"
                                    onClick={() => setIsWriteDescription(true)}
                                >
                                    {card.description}
                                </Paragraph>
                            ) : (
                                <DisplayDescription
                                    role="presentation"
                                    onClick={() => setIsWriteDescription(true)}
                                >
                                    Click to add a description
                                </DisplayDescription>
                            )}
                        </LabelWrapper>
                        {hasSubtasks && (
                            <Subtasks
                                onShow={hideSubtasksIfZero}
                                card={card}
                                boardId={boardId}
                                boardStatus={boardStatus}
                            />
                        )}
                        <LabelWrapper>
                            <Label htmlFor="card-status">Status</Label>
                            <select
                                id="card-status"
                                name="card status"
                                value={selected}
                                onChange={changeCardStatusHandler}
                            >
                                <option key={card.status} value={card.status}>
                                    {card.status}
                                </option>
                                {optionStatus}
                            </select>
                        </LabelWrapper>
                    </div>
                    <BtnGrp>
                        <AddCardWrapper>
                            <Text>Add to Card</Text>
                            <Button
                                tertiary
                                padding="auto"
                                width="100px"
                                onClick={() =>
                                    setIsDeadlineOpen((prevState) => !prevState)
                                }
                            >
                                <Icon name="Clock" iconColor="#323434" />
                                <span>Deadline</span>
                            </Button>
                            {!hasSubtasks && (
                                <Button
                                    tertiary
                                    padding="auto"
                                    width="100px"
                                    onClick={addSubtasksHandler}
                                >
                                    <Icon name="Subtask" iconColor="#323434" />
                                    <span>Subtasks</span>
                                </Button>
                            )}
                        </AddCardWrapper>
                        <Actions>
                            <Text>Actions</Text>
                            <Button
                                del
                                padding="auto"
                                onClick={() => setWillDeleteCard(true)}
                            >
                                <Icon name="Trash" />
                                <span>Delete</span>
                            </Button>
                        </Actions>
                    </BtnGrp>
                </CardDetails>
            </OpenCardWrapper>
            {willDeleteCard && (
                <DeleteModal
                    type="carditem"
                    onDelete={deleteItem}
                    onCancel={() => setWillDeleteCard(false)}
                />
            )}
            {isDeadlineOpen && (
                <SetDate
                    onUpdateDate={dateHandler}
                    onClose={() => setIsDeadlineOpen(false)}
                    card={card}
                />
            )}
        </>
    )
}

const OpenCardModal = ({ card, onClose, boardId, boardStatus }) => {
    return (
        <>
            {ReactDOM.createPortal(
                <ModalBackdrop onClose={onClose} />,
                document.getElementById('modal-backdrop')
            )}
            {ReactDOM.createPortal(
                <Main
                    card={card}
                    onClose={onClose}
                    boardId={boardId}
                    boardStatus={boardStatus}
                />,
                document.getElementById('modal-overlay')
            )}
        </>
    )
}

const Backdrop = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    z-index: 10;
    background-color: hsla(0, 0%, 22%, 0.83);
`
const Close = styled.span`
    display: flex;
    justify-content: flex-end;
    margin-bottom: 20rem;
`
const OpenCardWrapper = styled.div`
    z-index: 50;
    background-color: ${({ theme }) => theme.darkestGray};
    padding: 20rem 20rem 30rem 20rem;
    width: 100%;
    top: 50%;
    left: 50%;
    position: fixed;
    max-height: 100vh;
    overflow-y: scroll;
    overflow-x: hidden;
    transform: translate(-50%, -50%);
    -ms-overflow-style: none; /* Internet Explorer 10+ */
    scrollbar-width: none; /* Firefox */
    ::-webkit-scrollbar {
        display: none; /* Safari and Chrome */
    }
    @media only screen and ${device.mobileXL} {
        width: 600px;
        padding-left: 30rem;
        padding-bottom: 80rem;
    }
    @media only screen and ${device.tablet} {
        width: 700px;
    }
`
const LabelWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 20rem;
    gap: 10rem;
`
const Label = styled.label`
    color: #ffffff;
    font-weight: 400;
`
const Description = styled.textarea`
    display: block;
    width: 100%;
    color: #ffffff;
    border-radius: 2px;
`
const Paragraph = styled.p`
    margin-top: -5rem;
`
const DateText = styled.span`
    display: inline;
    margin-left: -80rem;
    color: ${({ theme }) => theme.lightGray};
`
const DateCheckWrapper = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-left: -10rem;
    justify-items: flex-start;
`
const CheckDateComplete = styled.input`
    margin-left: -80rem;
    accent-color: green;
`
const AddCardWrapper = styled.div`
    display: flex;
    flex-direction: column;
`

const Text = styled.span`
    color: ${({ theme }) => theme.lightGray};
    padding-bottom: 5rem;
    font-size: 11rem;
    font-weight: 200;
`
const BtnGrp = styled.div`
    margin-top: 30rem;
`

const Actions = styled.div`
    margin-top: 20rem;
`

const CardDetails = styled.div`
    @media only screen and ${device.mobileXL} {
        display: grid;
        grid-auto-flow: column;
        grid-template-columns: 4fr 1fr;
        column-gap: 40rem;
    }
`
const Btns = styled.div`
    display: flex;
    gap: 5rem;
`
const H3 = styled.h3`
    padding: 0 0 20rem 0;
    :hover {
        border: 1px solid ${({ theme }) => theme.darkGray};
    }
    cursor: pointer;
`
const DisplayDescription = styled.p`
    color: #000000;
    font-weight: 400;
    padding: 20rem;
    border-radius: 2px;
    background-color: ${({ theme }) => theme.lightGray};
    :hover {
        background-color: ${({ theme }) => theme.darkGray};
    }
`
const DateCompleted = styled(DateText)`
    color: ${({ theme }) => theme.darkGray};
`
export default OpenCardModal
