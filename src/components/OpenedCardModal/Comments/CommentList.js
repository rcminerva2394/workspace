import React from 'react'
import Comment from './Comment'

const CommentList = ({ card, boardId, boardStatus }) => {
    return (
        <ul>
            {card.comments.map((comment) => (
                <Comment
                    commentItem={comment}
                    key={comment.id}
                    card={card}
                    boardId={boardId}
                    boardStatus={boardStatus}
                />
            ))}
        </ul>
    )
}

export default CommentList
