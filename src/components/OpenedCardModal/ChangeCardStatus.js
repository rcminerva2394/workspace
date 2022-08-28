import React, { useState, useContext } from 'react'
import styled from 'styled-components'
import BoardsContext from '../../contexts/boards-context'

const ChangeCardStatus = ({ card, boardId, boardStatus }) => {
    const [selected, setSelected] = useState(card.status)
    const { setBoards } = useContext(BoardsContext)

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
                isCardOpen: true,
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
