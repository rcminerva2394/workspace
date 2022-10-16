import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Icon from '../../../UI/Icon'
import { useBoards } from '../../../contexts/boards-context'
import device from '../../../UI/Breakpoint'

const SubtaskItem = ({ card, subtask, boardId, boardStatus }) => {
    const [isEditSubtask, setIsEditSubtask] = useState(false)
    const [editedSubtask, setEditedSubtask] = useState(subtask.title)
    const [isSubtaskCompleted, setIsSubtaskCompleted] = useState(
        subtask.completed
    )
    const { setBoards } = useBoards()

    // Update subtask item status
    useEffect(() => {
        setBoards((prevState) => {
            const updatedBoards = prevState.map((project) => {
                if (project.id === boardId) {
                    const updatedCardSet = project[boardStatus].map(
                        (cardItem) => {
                            if (cardItem.id === card.id) {
                                const updatedSubtasks = cardItem.subtasks.map(
                                    (subtaskItem) => {
                                        if (subtaskItem.id === subtask.id) {
                                            return {
                                                ...subtaskItem,
                                                completed: isSubtaskCompleted,
                                            }
                                        }
                                        return subtaskItem
                                    }
                                )
                                return {
                                    ...cardItem,
                                    subtasks: updatedSubtasks,
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
    }, [isSubtaskCompleted])

    // Update Edited Subtask Title
    const submitEditedTaskHandler = (e) => {
        e.preventDefault()
        setBoards((prevState) => {
            const updatedBoards = prevState.map((project) => {
                if (project.id === boardId) {
                    const updatedCardSet = project[boardStatus].map(
                        (cardItem) => {
                            if (cardItem.id === card.id) {
                                const updatedSubtasks = cardItem.subtasks.map(
                                    (subtaskItem) => {
                                        if (subtaskItem.id === subtask.id) {
                                            return {
                                                ...subtaskItem,
                                                title: editedSubtask,
                                            }
                                        }
                                        return subtaskItem
                                    }
                                )
                                return {
                                    ...cardItem,
                                    subtasks: updatedSubtasks,
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

        setIsEditSubtask(false)
    }

    // Delete subtask item
    const delSubtaskItemHandler = () => {
        setBoards((prevState) => {
            const updatedBoards = prevState.map((project) => {
                if (project.id === boardId) {
                    const updatedCardSet = project[boardStatus].map(
                        (cardItem) => {
                            if (cardItem.id === card.id) {
                                const updatedSubtasks =
                                    cardItem.subtasks.filter(
                                        (subtaskItem) =>
                                            subtaskItem.id !== subtask.id
                                    )
                                return {
                                    ...cardItem,
                                    subtasks: updatedSubtasks,
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

    return (
        <SubtaskItemWrapper>
            <InputWrapper>
                <InputCheckbox
                    type="checkbox"
                    onChange={() =>
                        setIsSubtaskCompleted((prevState) => !prevState)
                    }
                    checked={isSubtaskCompleted}
                />
                {!isEditSubtask && isSubtaskCompleted ? (
                    <CompletedSubtask>{subtask.title}</CompletedSubtask>
                ) : !isEditSubtask && !isSubtaskCompleted ? (
                    <span>{subtask.title}</span>
                ) : (
                    <InputEdit
                        type="text"
                        value={editedSubtask}
                        onChange={(e) => setEditedSubtask(e.target.value)}
                        onKeyDown={(e) =>
                            e.key === 'Enter' && submitEditedTaskHandler(e)
                        }
                    />
                )}
            </InputWrapper>
            <IconsWrapper>
                {isEditSubtask ? (
                    <Icon
                        name="Save"
                        iconColor="#AEB7B7"
                        hoverColor="#6db375"
                        onClick={submitEditedTaskHandler}
                    />
                ) : (
                    <Icon
                        name="Edit"
                        iconColor="#AEB7B7"
                        hoverColor="#6db375"
                        onClick={() => setIsEditSubtask(true)}
                    />
                )}
                <Icon
                    name="Trash"
                    iconColor="#AEB7B7"
                    hoverColor="#d4766a"
                    onClick={delSubtaskItemHandler}
                />
            </IconsWrapper>
        </SubtaskItemWrapper>
    )
}

const SubtaskItemWrapper = styled.li`
    background: rgba(129, 130, 136, 0.2);
    border-radius: 5px;
    display: flex;
    align-items: center;
    margin-bottom: 10rem;
    justify-content: space-between;
    padding-top: 5rem;
    padding-bottom: 5rem;
    @media only screen and ${device.mobileL} {
        padding: 5rem;
    }
`
const InputWrapper = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 5rem;
`

const IconsWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 5rem;
    padding-right: 5rem;
`
const InputEdit = styled.input`
    padding: 0;
    width: 280px;
    background-color: transparent;
    color: ${({ theme }) => theme.fontColors.date};
    border: 0;
    outline: 0;
    font-weight: 300;
    letter-spacing: 1px;
    font-family: inherit;
    @media only screen and ${device.mobileL} {
        max-width: 400px;
    }
`
const InputCheckbox = styled.input`
    width: 15px;
    height: 15px;
    accent-color: green;
`
const CompletedSubtask = styled.span`
    color: ${({ theme }) => theme.darkGray};
`

export default SubtaskItem
