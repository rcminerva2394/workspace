import React from 'react'
import SubtaskItem from './SubtaskItem'

const SubtasksList = ({ card, boardId, boardStatus }) => {
    return (
        <ul>
            {card.subtasks.map((subtask) => (
                <SubtaskItem
                    key={subtask.id}
                    card={card}
                    subtask={subtask}
                    boardId={boardId}
                    boardStatus={boardStatus}
                >
                    {subtask.title}
                </SubtaskItem>
            ))}
        </ul>
    )
}

export default SubtasksList
