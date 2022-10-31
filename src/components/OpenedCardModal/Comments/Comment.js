import React, { useState } from 'react'
import styled from 'styled-components'
import { doc, updateDoc, deleteDoc } from 'firebase/firestore'
import { db } from '../../../firebase.config'
import { useBoards } from '../../../contexts/boards-context'
import DeleteModal from '../../../UI/DeleteModal'

const Comment = ({ commentItem, card, boardId, boardStatus }) => {
    const { photo, comment, initials, date } = commentItem
    const [isEditingComment, setIsEditingComment] = useState(false)
    const [editedComment, setEditedComment] = useState(comment)
    const [willDeleteComment, setwillDeleteComment] = useState(false)
    const { setBoards } = useBoards()

    const timeComment = `${date.toDateString()} at ${date.toLocaleTimeString()}`

    const commentItemRef = doc(
        db,
        'boards',
        boardId,
        boardStatus,
        card.id,
        'comments',
        commentItem.id
    )

    const submitEditedCommentHandler = (e) => {
        e.preventDefault()

        const updateComment = async () => {
            await updateDoc(commentItemRef, {
                comment: editedComment,
                date: new Date(),
            })
        }

        updateComment()

        // update boards and its comments on frontend
        setBoards((prevState) => {
            const updatedBoards = prevState.map((project) => {
                if (project.id === boardId) {
                    const updatedCardSet = project[boardStatus].map(
                        (cardItem) => {
                            if (cardItem.id === card.id) {
                                const updatedComments = cardItem.comments.map(
                                    (comnt) => {
                                        if (comnt.id === commentItem.id) {
                                            return {
                                                ...comnt,
                                                comment: editedComment,
                                            }
                                        }
                                        return comnt
                                    }
                                )
                                return {
                                    ...cardItem,
                                    comments: updatedComments,
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

        setIsEditingComment(false)
    }

    const deleteCommentHandler = () => {
        const delCommentItem = async () => {
            await deleteDoc(
                doc(
                    db,
                    'boards',
                    boardId,
                    boardStatus,
                    card.id,
                    'comments',
                    commentItem.id
                )
            )
        }
        delCommentItem()

        // delete comment on frontend
        setBoards((prevState) => {
            const updatedBoards = prevState.map((project) => {
                if (project.id === boardId) {
                    const updatedCardSet = project[boardStatus].map(
                        (cardItem) => {
                            if (cardItem.id === card.id) {
                                const updatedComments =
                                    cardItem.comments.filter(
                                        (comnt) => comnt.id !== commentItem.id
                                    )
                                return {
                                    ...cardItem,
                                    comments: updatedComments,
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
        <Wrapper>
            {photo ? (
                <Img src={photo} alt="profile pic" style={{ width: '50px' }} />
            ) : (
                <ProfilePic>{initials}</ProfilePic>
            )}
            {isEditingComment ? (
                <form onSubmit={submitEditedCommentHandler}>
                    <Input
                        onChange={(e) => setEditedComment(e.target.value)}
                        value={editedComment}
                        onKeyDown={(e) =>
                            e.key === 'Enter' && submitEditedCommentHandler
                        }
                    />
                    <Button type="submit">Submit</Button>
                    <Button
                        type="button"
                        onClick={() => setIsEditingComment(false)}
                    >
                        Cancel
                    </Button>
                </form>
            ) : (
                <WrapperComment>
                    <TimeText>{timeComment}</TimeText>
                    <CommentText>{comment}</CommentText>
                    <BtnsWrap>
                        <Button
                            type="button"
                            onClick={() => setIsEditingComment(true)}
                        >
                            Edit
                        </Button>
                        <Button
                            type="button"
                            onClick={() => setwillDeleteComment(true)}
                        >
                            Delete
                        </Button>
                    </BtnsWrap>
                    {willDeleteComment && (
                        <DeleteModal
                            type="comment"
                            onDelete={deleteCommentHandler}
                            onCancel={() => setwillDeleteComment(false)}
                        />
                    )}
                </WrapperComment>
            )}
        </Wrapper>
    )
}

const Wrapper = styled.li`
    display: flex;
    width: auto;
    align-items: flex-start;
    gap: 10rem;
    justify-content: stretch;
    position: relative;
    width: 100%;
    margin-bottom: 20rem;
`
const Img = styled.img`
    border-radius: 50%;
    width: 50px;
`

const ProfilePic = styled.p`
    background-color: ${({ theme }) => theme.user};
    color: white;
    border-radius: 50%;
    width: 50px;
    text-align: center;
    padding: 12px;
    align-self: flex-start;
    font-weight: 600;
`
const CommentText = styled.p`
    background-color: transparent;
    border: 1px solid rgba(163, 164, 177, 0.2);
    color: #ffffff;
    font-weight: 200;
    font-family: inherit;
    width: 100%;
    border-radius: 5px;
    margin-top: -0.25rem;
    font-size: 13rem;
    padding: 6rem;
`
const TimeText = styled.span`
    color: #818181;
    font-size: 12rem;
    padding-bottom: 0.5rem;
`
const WrapperComment = styled.div`
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    margin-bottom: 1rem;
`
const BtnsWrap = styled.div`
    display: flex;
    margin-top: -10rem;
`
const Button = styled.button`
    background-color: transparent;
    background-repeat: no-repeat;
    border: none;
    color: #aeb7b7;
    font-weight: 300;
    font-size: 13rem;
    :hover {
        text-decoration: underline;
    }
`
const Input = styled.input`
    background-color: transparent;
    border: 1px solid rgba(163, 164, 177, 0.2);
    color: #ffffff;
    font-weight: 300;
    font-family: inherit;
    min-width: 100%;
    padding: 6rem;
`
export default Comment
