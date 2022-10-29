import React from 'react'
import styled from 'styled-components'

const Comment = ({ commentItem }) => {
    const { photo, comment, initials, date } = commentItem

    const timeComment = `${date.toDateString()} at ${date.toLocaleTimeString()}`

    return (
        <Wrapper>
            {photo ? (
                <Img src={photo} alt="profile pic" style={{ width: '50px' }} />
            ) : (
                <ProfilePic>{initials}</ProfilePic>
            )}
            <WrapperComment>
                <TimeText>{timeComment}</TimeText>
                <CommentText>{comment}</CommentText>
            </WrapperComment>
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
`

export default Comment
