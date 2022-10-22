import React, { useState } from 'react'
import styled from 'styled-components'

import { doc, setDoc, collection, serverTimestamp } from 'firebase/firestore'
import { db, auth } from '../../../firebase.config'
import Button from '../../../UI/Button'

import { useBoards } from '../../../contexts/boards-context'

const Comments = ({ card, boardId, boardStatus }) => {
    const [userComment, setUserComment] = useState('')
    const { setBoards } = useBoards()
    const { uid, displayName, photoURL } = auth.currentUser

    // Get the initials of the name to set a profile pic if photoURL is null
    const initialsName = displayName
        .split(' ')
        .map((word) => word[0])
        .join('')
        .toUpperCase()

    const createCommentHandler = async (e) => {
        e.preventDefault()

        // Subcollection Comments
        const commentRef = doc(
            collection(db, 'boards', boardId, boardStatus, card.id, 'comments')
        )

        const commentObj = {
            id: commentRef.id,
            comment: userComment,
            from: uid,
            date: serverTimestamp(),
            members: { [uid]: 'creator' },
        }

        await setDoc(commentRef, commentObj)

        setBoards((prevState) => {
            const updatedBoards = prevState.map((project) => {
                if (project.id === boardId) {
                    const updatedCardSet = project[boardStatus].map(
                        (cardItem) => {
                            if (cardItem.id === card.id) {
                                return {
                                    ...cardItem,
                                    comments: [
                                        ...cardItem.comments,
                                        commentObj,
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
    }

    return (
        <LabelWrapper>
            <Label>Comments</Label>
            <FormWrapper onSubmit={createCommentHandler}>
                {photoURL ? (
                    <img src={photoURL} alt="User Name" />
                ) : (
                    <ProfilePic>{initialsName}</ProfilePic>
                )}
                <div>
                    <Input
                        placeholder="Write a comment..."
                        onChange={(e) => setUserComment(e.target.value)}
                    />
                    <Button type="submit" primary padding="auto">
                        Save
                    </Button>
                </div>
            </FormWrapper>
        </LabelWrapper>
    )
}

const LabelWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 40rem;
    gap: 10rem;
`
const Label = styled.label`
    color: #ffffff;
    font-weight: 400;
`

const FormWrapper = styled.div`
    display: flex;
    max-width: 100%;
    align-items: flex-start;
    gap: 10rem;
`

const ProfilePic = styled.p`
    background-color: ${({ theme }) => theme.user}
    color: white;
    border-radius: 50%;
    width: 50px;
    text-align: center;
    padding: 12px;
    align-self: flex-start;
    font-weight: 600;
`
const Input = styled.input`
    background-color: transparent;
    border: 1px solid rgba(163, 164, 177, 0.2);
    color: #ffffff;
    font-weight: 300;
    font-family: inherit;
    text-align: center;
    width: 100%;
`
export default Comments
