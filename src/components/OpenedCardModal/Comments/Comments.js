import React, { useState } from 'react'
import styled from 'styled-components'

import { doc, setDoc, collection } from 'firebase/firestore'
import { db, auth } from '../../../firebase.config'
import Button from '../../../UI/Button'

import CommentList from './CommentList'
import { useBoards } from '../../../contexts/boards-context'

const Comments = ({ card, boardId, boardStatus }) => {
    const [userComment, setUserComment] = useState('')
    const [isWritingComment, setIsWritingComment] = useState(false)
    const { setBoards } = useBoards()
    const { uid, displayName, photoURL, email } = auth.currentUser

    // Get the initials of the name to set a profile pic if photoURL is null
    // Check if displayName is one word or more
    let initialsName
    if (displayName === null) {
        initialsName = email[0].toUpperCase()
    } else if (/\s/g.test(displayName) === true) {
        initialsName = displayName
            .split(' ')
            .map((word) => word[0])
            .join('')
            .toUpperCase()
    } else if (/\s/g.test(displayName) === false) {
        initialsName = displayName[0].toUpperCase()
    }

    const createCommentHandler = async (e) => {
        e.preventDefault()

        // Check whether the one creating a comment is an owner or a member only
        let membershipStatus
        if (card.members[uid] === 'owner') {
            membershipStatus = 'creator'
        } else if (card.members[uid] === 'member') {
            membershipStatus = 'member'
        }

        // Subcollection Comments
        const commentRef = doc(
            collection(db, 'boards', boardId, boardStatus, card.id, 'comments')
        )

        const commentObj = {
            id: commentRef.id,
            comment: userComment,
            from: uid,
            date: new Date(),
            members: { [uid]: membershipStatus },
            photo: photoURL,
            madeBy: displayName,
            initials: initialsName,
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

        setIsWritingComment(false)
    }

    return (
        <LabelWrapper>
            <Label>Comments</Label>
            {!isWritingComment ? (
                <Wrapper>
                    {photoURL ? (
                        <img
                            src={photoURL}
                            alt="profile pic"
                            style={{ width: '50px' }}
                        />
                    ) : (
                        <ProfilePic>{initialsName}</ProfilePic>
                    )}
                    <BtnCmt onClick={() => setIsWritingComment(true)}>
                        Write a comment...
                    </BtnCmt>
                </Wrapper>
            ) : (
                <form onSubmit={createCommentHandler}>
                    <Wrapper>
                        {photoURL ? (
                            <Img src={photoURL} alt="User Name" />
                        ) : (
                            <ProfilePic>{initialsName}</ProfilePic>
                        )}
                        <WrapperInptBtn>
                            <Input
                                placeholder="Write a comment..."
                                onChange={(e) => setUserComment(e.target.value)}
                            />
                            <Button type="submit" primary padding="auto">
                                Save
                            </Button>
                            <Button
                                padding="auto"
                                onClick={() => setIsWritingComment(false)}
                            >
                                Cancel
                            </Button>
                        </WrapperInptBtn>
                    </Wrapper>
                </form>
            )}
            <CommentList
                card={card}
                boardId={boardId}
                boardStatus={boardStatus}
            />
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
const BtnCmt = styled.button`
    background-color: transparent;
    border: 1px solid rgba(163, 164, 177, 0.2);
    font-weight: 300;
    font-family: inherit;
    text-align: center;
    width: 100%;
    padding: 6rem;
    border-radius: 4px;
    color: gray;
`
const Wrapper = styled.div`
    display: flex;
    width: auto;
    align-items: flex-start;
    gap: 10rem;
    justify-content: stretch;
    position: relative;
    width: 100%;
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
const Input = styled.input`
    background-color: transparent;
    border: 1px solid rgba(163, 164, 177, 0.2);
    color: #ffffff;
    font-weight: 300;
    font-family: inherit;
    text-align: center;
    min-width: 100%;
    padding: 6rem;
`
const WrapperInptBtn = styled.div`
    display: flex;
    width: 100%;
    flex-wrap: wrap;
`

export default Comments
