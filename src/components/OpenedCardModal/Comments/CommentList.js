import React from 'react'
import styled from 'styled-components'
import Comment from './Comment'

const CommentList = ({ card, boardId, boardStatus }) => {
    return (
        <ListWrapper>
            {card.comments.map((comment) => (
                <Comment
                    commentItem={comment}
                    key={comment.id}
                    card={card}
                    boardId={boardId}
                    boardStatus={boardStatus}
                />
            ))}
        </ListWrapper>
    )
}

const ListWrapper = styled.ul`
    padding: 15rem 0;
`

export default CommentList
