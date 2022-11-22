import React, { useState } from 'react'
import styled from 'styled-components'

import { doc, deleteDoc, setDoc } from 'firebase/firestore'
import { db } from '../../firebase.config'

import Icon from '../../UI/Icon'
import Button from '../../UI/Button'
import Cards from '../Cards/Cards'
import { useBoards } from '../../contexts/boards-context'
import device from '../../UI/Breakpoint'
import { setNewCardItem } from '../../utils/writes/writeData'

import {
    deleteSubCollection,
    setSubCollection,
} from '../../utils/firestoreMethods'

const BoardType = ({ boardStatus, id, cards }) => {
    const [isAddCard, setIsAddCard] = useState(false)
    const [cardTitle, setCardTitle] = useState('')
    const { boards, setBoards } = useBoards()
    const titleCard = boardStatus.charAt(0).toUpperCase() + boardStatus.slice(1)
    console.log(boards)
    // Dropping the card into the desired board status
    const dragOverHandler = (e) => {
        if (e.dataTransfer.types.includes('custom-type')) {
            e.preventDefault()
        }
    }

    const dragEnterHandler = (e) => {
        e.preventDefault()
    }

    const dropHandler = (e) => {
        const stringData = e.dataTransfer.getData('custom-type')
        const cardData = JSON.parse(stringData)
        if (
            e.dataTransfer.types.includes('custom-type') &&
            cardData.boardType !== boardStatus
        ) {
            e.preventDefault()

            // Destructure the comments and subtasks out of the card obj because in firestore they are subcollections
            const { comments, subtasks, ...rest } = cardData.cardObj

            // Transfer and delete card to the new board type
            const newCardItem = {
                ...rest,
                status: boardStatus,
            }

            // Deleting the card item from its first board type and move it to the the new board type
            // First delete the card in the board status, and create a new one in desired boardStatus
            const moveCard = async () => {
                await deleteDoc(
                    doc(
                        db,
                        'boards',
                        id,
                        cardData.boardType,
                        cardData.cardObj.id
                    )
                )

                // Copy them to desired boardStatus
                await setDoc(
                    doc(db, 'boards', id, boardStatus, cardData.cardObj.id),
                    newCardItem
                )

                // Now set the subcollection subtasks and comments to its new boardType
                setSubCollection(
                    id,
                    boardStatus,
                    cardData.cardObj.id,
                    subtasks,
                    'subtasks'
                )
                setSubCollection(
                    id,
                    boardStatus,
                    cardData.cardObj.id,
                    comments,
                    'comments'
                )

                // Delete the subcollection subtasks and comments from its old boardType
                deleteSubCollection(
                    id,
                    cardData.boardType,
                    cardData.cardObj.id,
                    subtasks,
                    'subtasks'
                )
                // deleteSubOldBoardType(subtasks, 'subtasks')
                deleteSubCollection(
                    id,
                    cardData.boardType,
                    cardData.cardObj.id,
                    comments,
                    'comments'
                )
            }

            moveCard()

            // Update the context frontend
            const updatedCardItem = {
                ...newCardItem,
                subtasks,
                comments,
            }

            setBoards((prevState) => {
                const updatedBoards = prevState.map((project) => {
                    if (project.id === cardData.idBoard) {
                        const updatedCardSet = project[
                            cardData.boardType
                        ].filter(
                            (cardItem) => cardItem.id !== cardData.cardObj.id
                        )
                        return {
                            ...project,
                            [cardData.boardType]: updatedCardSet,
                            [boardStatus]: [
                                ...project[boardStatus],
                                updatedCardItem,
                            ],
                        }
                    }
                    return project
                })
                return updatedBoards
            })
        }
    }

    // Color function for the Icon
    const color = () => {
        let colorOfIcon
        if (boardStatus === 'todo') {
            colorOfIcon = '#FFE600'
        } else if (boardStatus === 'doing') {
            colorOfIcon = '#3E8BFF'
        } else if (boardStatus === 'done') {
            colorOfIcon = '#19E446'
        }
        return colorOfIcon
    }

    // Adding a new card item
    const submitNewCardHandler = (e) => {
        e.preventDefault()
        setNewCardItem(id, boardStatus, cardTitle, setBoards)
        setIsAddCard(false)
    }

    return (
        <BoardWrapper
            onDragOver={dragOverHandler}
            onDragEnter={dragEnterHandler}
            onDrop={dropHandler}
        >
            <IconTitle>
                <Icon
                    name={titleCard}
                    iconColor={color(boardStatus)}
                    size="24rem"
                />
                <Title>{titleCard}</Title>
            </IconTitle>

            <Cards cards={cards} boardId={id} boardStatus={boardStatus} />

            {isAddCard && (
                <form onSubmit={submitNewCardHandler}>
                    <AddCardInput
                        placeholder="Write a title for this card"
                        onChange={(e) => setCardTitle(e.target.value)}
                    />
                    <FormBtnGrp>
                        <Button
                            type="submit"
                            primary
                            fontSize="12rem"
                            padding="6rem"
                        >
                            Add Card
                        </Button>
                        <Button
                            onClick={() => setIsAddCard(false)}
                            fontSize="12rem"
                            padding="6rem"
                        >
                            Cancel
                        </Button>
                    </FormBtnGrp>
                </form>
            )}
            {!isAddCard && (
                <Button
                    onClick={() => setIsAddCard(true)}
                    fontSize="14rem"
                    padding="6rem"
                >
                    + Add Card
                </Button>
            )}
        </BoardWrapper>
    )
}

const BoardWrapper = styled.div`
    background-color: ${({ theme }) => theme.boardWrap};
    margin: 15rem 0;
    padding: 0 15rem 15rem 15rem;
    border-radius: 5px;
    width: 100%;
    @media only screen and ${device.mobileXL} {
        width: 45%;
    }
    @media only screen and ${device.laptop} {
        width: 30%;
    }
`
const IconTitle = styled.div`
    display: flex;
    flex-direction: row;
    place-items: center;
`
const Title = styled.p`
    font-size: 16rem;
    font-weight: 500;
`

const AddCardInput = styled.input`
    disply: inline-block;
    padding: 10rem 10rem;
    line-height: 10rem;
    width: 100%;
    background-color: transparent;
    border: 1px solid rgba(163, 164, 177, 0.2);
    color: #ffffff;
    font-weight: 300;
    font-family: inherit;
    text-align: center;
`
const FormBtnGrp = styled.div`
    margin-top: 10rem;
    display: flex;
    justify-content: flex-start;
    gap: 5rem;
`
export default BoardType
