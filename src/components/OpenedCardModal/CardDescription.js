import React, { useState } from 'react'
import styled from 'styled-components'
import { doc, updateDoc } from 'firebase/firestore'
import { db, auth } from '../../firebase.config'

import Button from '../../UI/Button'
import { useBoards } from '../../contexts/boards-context'

const CardDescription = ({ card, boardId, boardStatus }) => {
    const [isWriteDescription, setIsWriteDescription] = useState(false)
    const [cardDescription, setCardDescription] = useState(card.description)
    const { setBoards } = useBoards()
    const { uid } = auth.currentUser

    // Adding Description
    const addDescriptionHandler = async (e) => {
        e.preventDefault()

        const cardDescrRef = doc(
            db,
            'users',
            uid,
            'boards',
            boardId,
            boardStatus,
            card.id
        )

        // Set the new title of the card in firestore server
        await updateDoc(cardDescrRef, {
            description: cardDescription,
        })

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

    return (
        <LabelWrapper>
            <Label htmlFor={card.id}>Description</Label>
            {isWriteDescription ? (
                <form onSubmit={addDescriptionHandler}>
                    <Description
                        id={card.id}
                        placeholder="e.g. Set up a meeting with the stakeholders regarding the targets next year"
                        value={cardDescription}
                        onChange={(e) => setCardDescription(e.target.value)}
                        onKeyDown={(e) =>
                            e.key === 'Enter' && addDescriptionHandler(e)
                        }
                    />
                    <Btns>
                        <Button primary type="submit" padding="auto">
                            Add
                        </Button>
                        <Button
                            onClick={() => setIsWriteDescription(false)}
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
const Btns = styled.div`
    display: flex;
    gap: 5rem;
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
const Description = styled.textarea`
    display: block;
    width: 100%;
    color: #ffffff;
    border-radius: 2px;
`
const Paragraph = styled.p`
    margin-top: -5rem;
`
export default CardDescription
