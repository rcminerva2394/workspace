import React from 'react'
import styled from 'styled-components'
import BoardType from './BoardType'
import device from '../../UI/Breakpoint'

const BoardItem = ({ board }) => {
    return (
        <BoardItemMargin>
            <h3>{board.boardName}</h3>
            <BoardTypesWrapper>
                <BoardType
                    boardStatus="Todo"
                    id={board.id}
                    cards={board.Todo}
                />
                <BoardType
                    boardStatus="Doing"
                    id={board.id}
                    cards={board.Doing}
                />
                <BoardType
                    boardStatus="Done"
                    id={board.id}
                    cards={board.Done}
                />
            </BoardTypesWrapper>
        </BoardItemMargin>
    )
}

const BoardItemMargin = styled.li`
    margin-top: 70rem;
`
const BoardTypesWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    flex-wrap: wrap;
    @media only screen and ${device.mobileXL} {
        flex-direction: row;
    }
`
export default BoardItem
