import React from 'react'
import styled from 'styled-components'
import SectionWrapper from '../../UI/SectionWrapper'
import BoardType from './BoardType'

const BoardList = ({ boardList }) => {
    return (
        <SectionWrapper>
            <ul>
                {boardList.map((board) => (
                    <BoardItem key={board.id} id={board.id}>
                        <h3>{board.name}</h3>
                        <BoardType name="Todo" />
                        <BoardType name="Doing" />
                        <BoardType name="Done" />
                    </BoardItem>
                ))}
            </ul>
        </SectionWrapper>
    )
}

const BoardItem = styled.li`
    margin-top: 20rem;
`

export default BoardList
