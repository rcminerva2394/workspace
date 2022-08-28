import React, { useState, useContext } from 'react'
import styled from 'styled-components'
import BoardsContext from '../../contexts/boards-context'
import Button from '../../UI/Button'

const CardTitle = ({ card, boardId, boardStatus }) => {
    const [isChangeCardTitle, setIsChangeCardTitle] = useState(false)
    const [newCardTitle, setNewCardTitle] = useState(card.title)
    const { setBoards } = useContext(BoardsContext)

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
    return (
        <span>
            {isChangeCardTitle ? (
                <form onSubmit={submitNewCardTitleHandler}>
                    <input
                        onChange={(e) => setNewCardTitle(e.target.value)}
                        placeholder="Change Card Title"
                        style={{ width: '100%' }}
                        value={newCardTitle}
                    />
                    <Btns>
                        <Button primary type="submit" padding="auto">
                            Rename
                        </Button>
                        <Button
                            onClick={() => setIsChangeCardTitle(false)}
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
        </span>
    )
}

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
export default CardTitle
