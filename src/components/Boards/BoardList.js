import React from 'react'
import styled from 'styled-components'
import SectionWrapper from '../../UI/SectionWrapper'
import BoardType from './BoardType'
import device from '../../UI/Breakpoint'

const BoardList = ({ boardList }) => {
    return (
        <SectionWrapper>
            <ul>
                {boardList.map((board) => (
                    <BoardItem key={board.id} id={board.id}>
                        <h3>{board.name}</h3>
                        <BoardTypesWrapper>
                            <BoardType name="Todo" />
                            <BoardType name="Doing" />
                            <BoardType name="Done" />
                        </BoardTypesWrapper>
                    </BoardItem>
                ))}
            </ul>
        </SectionWrapper>
    )
}

const BoardItem = styled.li`
    margin-top: 20rem;
`
const BoardTypesWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    @media only screen and ${device.tablet} {
        flex-direction: row;
    }
`
export default BoardList
