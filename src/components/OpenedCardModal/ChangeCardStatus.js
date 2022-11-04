import React, { useState } from 'react'
import styled from 'styled-components'

import { doc, deleteDoc, setDoc } from 'firebase/firestore'
import { db } from '../../firebase.config'
import { useBoards } from '../../contexts/boards-context'

const ChangeCardStatus = ({ card, boardId, boardStatus }) => {
    const [selected, setSelected] = useState(card.status)
    const { setBoards } = useBoards()

    // Card Status Options
    const cardStatusArr = ['todo', 'doing', 'done']
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
    const changeCardStatusHandler = async (e) => {
        setSelected(e.target.value)

        if (card.status !== e.target.value) {
            // Set new card details with changed status
            const newCardStat = {
                ...card,
                status: e.target.value,
            }

            // Deleting the card item from its first board type and move it to the the new board type/status
            await deleteDoc(doc(db, 'boards', boardId, boardStatus, card.id))
            await setDoc(
                doc(db, 'boards', boardId, e.target.value, card.id),
                newCardStat
            )

            // Update frontend of the card status
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
                                newCardStat,
                            ],
                        }
                    }
                    return project
                })
                return updatedBoards
            })
        }
    }

    return (
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
export default ChangeCardStatus
