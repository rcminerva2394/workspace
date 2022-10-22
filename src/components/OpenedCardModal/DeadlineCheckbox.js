import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../../firebase.config'

import { useBoards } from '../../contexts/boards-context'

const DeadlineCheckbox = ({ card, boardId, boardStatus }) => {
    const [isDueDateCompleted, setIsDueDateCompleted] = useState(
        card.date.completed
    )
    const { startDate, dueDate, deadlineTime } = card.date
    const { setBoards } = useBoards()
    // const { uid } = auth.currentUser

    // Updating the completion status of the duedate / deadline

    useEffect(() => {
        const cardDateRef = doc(db, 'boards', boardId, boardStatus, card.id)

        // Update the completion status of the date deadline in firestore server
        updateDoc(cardDateRef, {
            'date.completed': isDueDateCompleted,
        })

        // Update the context frontend
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

    // Change card due date completion status
    const changeDueDateCompletionHandler = () => {
        setIsDueDateCompleted((prevState) => !prevState)
    }

    return (
        <span>
            {startDate && dueDate ? (
                <LabelWrapper>
                    <Label>Duration</Label>
                    <DateCheckWrapper>
                        <CheckDateComplete
                            type="checkbox"
                            onChange={changeDueDateCompletionHandler}
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
                            onChange={changeDueDateCompletionHandler}
                            checked={isDueDateCompleted}
                        />
                        {isDueDateCompleted ? (
                            <DateCompleted>{startDate}</DateCompleted>
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
                            onChange={changeDueDateCompletionHandler}
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
        </span>
    )
}

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
const DateText = styled.span`
    display: inline;
    margin-left: -80rem;
    color: ${({ theme }) => theme.lightGray};
`

const DateCompleted = styled(DateText)`
    color: ${({ theme }) => theme.darkGray};
`
export default DeadlineCheckbox
