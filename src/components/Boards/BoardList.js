import React, { useContext } from 'react'
import styled from 'styled-components'
import SectionWrapper from '../../UI/SectionWrapper'
import BoardType from './BoardType'
import device from '../../UI/Breakpoint'
import BoardsContext from '../../context/boards-context'

const BoardList = () => {
    const { boards } = useContext(BoardsContext)
    return (
        <SectionWrapper>
            <ul>
                {boards.map((board) => (
                    <BoardItem key={board.id} id={board.id}>
                        <h3>{board.boardName}</h3>
                        <BoardTypesWrapper>
                            <BoardType
                                name="Todo"
                                id={board.id}
                                cards={board.Todo}
                            />
                            <BoardType
                                name="Doing"
                                id={board.id}
                                cards={board.Doing}
                            />
                            <BoardType
                                name="Done"
                                id={board.id}
                                cards={board.Done}
                            />
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
    justify-content: space-around;
    @media only screen and ${device.tablet} {
        flex-direction: row;
    }
`
export default BoardList
