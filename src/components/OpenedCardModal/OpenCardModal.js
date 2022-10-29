import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'

import { doc, deleteDoc } from 'firebase/firestore'
import { db } from '../../firebase.config'

import Button from '../../UI/Button'
import Icon from '../../UI/Icon'
import device from '../../UI/Breakpoint'
import { useBoards } from '../../contexts/boards-context'
import SetDate from './Dates/SetDate'
import Subtasks from './Subtasks/Subtasks'
import DeleteModal from '../../UI/DeleteModal'
import CardTitle from './CardTitle'
import DeadlineCheckbox from './DeadlineCheckbox'
import CardDescription from './CardDescription'
import ChangeCardStatus from './ChangeCardStatus'
import Comments from './Comments/Comments'

const ModalBackdrop = ({ onClose }) => <Backdrop onClick={onClose} />

const Main = ({ card, onClose, boardId, boardStatus }) => {
    const [isDeadlineOpen, setIsDeadlineOpen] = useState(false)

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
    const { setBoards } = useBoards()

    const dateHandler = async (dateObj) => {
        // update context frontend
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

    // Adding Subtasks
    const addSubtasksHandler = () => {
        setHasSubtasks(true)
    }

    const hideSubtasksIfZero = (value) => {
        setHasSubtasks(value)
    }

    const deleteItem = () => {
        // delete card item on firestore and it's subcollection subtask (later on including comments)
        const deleteCard = async () => {
            // delete the  card
            await deleteDoc(doc(db, 'boards', boardId, boardStatus, card.id))

            // delete its subtasks
            await Promise.all(
                card.subtasks.forEach(async (subtask) => {
                    await deleteDoc(
                        doc(
                            db,
                            'boards',
                            boardId,
                            boardStatus,
                            card.id,
                            'subtasks',
                            subtask.id
                        )
                    )
                })
            )

            // delete its comments too
            await Promise.all(
                card.comments.forEach(async (comment) => {
                    await deleteDoc(
                        doc(
                            db,
                            'boards',
                            boardId,
                            boardStatus,
                            card.id,
                            'comments',
                            comment.id
                        )
                    )
                })
            )
        }

        deleteCard()
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
                        <CardTitle
                            card={card}
                            boardId={boardId}
                            boardStatus={boardStatus}
                        />
                        <DeadlineCheckbox
                            card={card}
                            boardId={boardId}
                            boardStatus={boardStatus}
                        />
                        <CardDescription
                            card={card}
                            boardId={boardId}
                            boardStatus={boardStatus}
                        />
                        {hasSubtasks && (
                            <Subtasks
                                onShow={hideSubtasksIfZero}
                                card={card}
                                boardId={boardId}
                                boardStatus={boardStatus}
                            />
                        )}
                        <ChangeCardStatus
                            card={card}
                            boardId={boardId}
                            boardStatus={boardStatus}
                        />
                        <Comments
                            card={card}
                            boardId={boardId}
                            boardStatus={boardStatus}
                        />
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
                                red
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
                    boardId={boardId}
                    boardStatus={boardStatus}
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
    z-index: 52;
    background-color: hsla(0, 0%, 22%, 0.83);
`
const Close = styled.span`
    display: flex;
    justify-content: flex-end;
    margin-bottom: 20rem;
`
const OpenCardWrapper = styled.div`
    z-index: 100;
    background-color: ${({ theme }) => theme.darkestGray};
    padding: 20rem 20rem 30rem 20rem;
    width: 100vw;
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

export default OpenCardModal
