import React, { useState } from 'react'
import styled from 'styled-components'
// import { v4 as uuidv4 } from 'uuid'
import Button from '../../../UI/Button'
// import BoardsContext from '../../../contexts/boards-context'
import { useBoards } from '../../../contexts/boards-context'
import SubtasksList from './SubtasksList'
import DeleteModal from '../../../UI/DeleteModal'

const Subtasks = ({ card, boardId, boardStatus, onShow }) => {
    const [willAddSubtask, setWillAddSubtask] = useState(true)
    const [newSubtask, setNewSubtask] = useState('')
    const [willDeletSubtasks, setWillDeleteSubtasks] = useState(false)
    const { setBoards } = useBoards()

    const submitAddedSubtaskHandler = (e) => {
        e.preventDefault()
        setBoards((prevState) => {
            const updatedBoards = prevState.map((project) => {
                if (project.id === boardId) {
                    const updatedCardSet = project[boardStatus].map(
                        (cardItem) => {
                            if (cardItem.id === card.id) {
                                return {
                                    ...cardItem,
                                    subtasks: [
                                        ...cardItem.subtasks,
                                        {
                                            // id: uuidv4(),
                                            title: newSubtask,
                                            completed: false,
                                        },
                                    ],
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
        onShow(true)
    }

    const deleteEntireSubtasks = () => {
        setBoards((prevState) => {
            const updatedBoards = prevState.map((project) => {
                if (project.id === boardId) {
                    const updatedCardSet = project[boardStatus].map(
                        (cardItem) => {
                            if (cardItem.id === card.id) {
                                const { subtasks, ...rest } = cardItem
                                return rest
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
        onShow(false)
    }

    return (
        <SubtasksWrapper>
            <TitleDeleteWrapper>
                <Title>Subtasks</Title>
                <Button
                    tertiary
                    padding="auto"
                    onClick={() => setWillDeleteSubtasks(true)}
                    fontSize="11rem"
                >
                    Delete
                </Button>
            </TitleDeleteWrapper>
            {willDeletSubtasks && (
                <DeleteModal
                    type="subtasks"
                    onDelete={deleteEntireSubtasks}
                    onCancel={() => setWillDeleteSubtasks(false)}
                />
            )}
            <SubtasksList
                card={card}
                boardId={boardId}
                boardStatus={boardStatus}
            />
            {willAddSubtask ? (
                <form onSubmit={submitAddedSubtaskHandler}>
                    <label htmlFor="Add Subtask">
                        <Input
                            type="text"
                            placeholder="Write a subtask title"
                            onChange={(e) => setNewSubtask(e.target.value)}
                        />
                    </label>
                    <BtnGrp>
                        <Button primary type="submit" padding="auto">
                            Add
                        </Button>
                        <Button
                            padding="auto"
                            onClick={() => setWillAddSubtask(false)}
                        >
                            Cancel
                        </Button>
                    </BtnGrp>
                </form>
            ) : (
                <Button
                    tertiary
                    padding="auto"
                    onClick={() => setWillAddSubtask(true)}
                    fontSize="11rem"
                >
                    Add Item
                </Button>
            )}
        </SubtasksWrapper>
    )
}

const SubtasksWrapper = styled.div`
    margin-bottom: 35rem;
`
const Title = styled.p`
    color: #ffffff;
    font-weight: 400;
`
const Input = styled.input`
    border-radius: 20px;
    background-color: transparent;
    border: 1px solid rgba(163, 164, 177, 0.2);
    color: #ffffff;
    font-weight: 300;
    font-family: inherit;
    text-align: center;
`
const BtnGrp = styled.div`
    display: flex;
    gap: 5rem;
    margin-top: 10rem;
`
const TitleDeleteWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 10rem;
    margin-bottom: 10rem;
    align-items: center;
`
export default Subtasks
