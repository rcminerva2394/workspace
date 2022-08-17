import React, { useContext } from 'react'
import styled from 'styled-components'
import SectionWrapper from '../../UI/SectionWrapper'
import BoardType from './BoardType'
import device from '../../UI/Breakpoint'
import BoardsContext from '../../context/boards-context'

const BoardList = () => {
    const { boards } = useContext(BoardsContext)
    const dragOverHandler = (e) => {
        e.preventDefault()
    }
    const dragEnterHandler = (e) => {
        e.preventDefaul()
    }
    const dragLeaveHandler = () => {}
    const dropHandler = () => {}

    return (
        <SectionWrapper>
            <ul>
                {boards.map((board) => (
                    <BoardItem key={board.id} id={board.id}>
                        <h3>{board.boardName}</h3>
                        <BoardTypesWrapper>
                            <BoardType
                                boardStatus="Todo"
                                id={board.id}
                                cards={board.Todo}
                                onDragOver={dragOverHandler}
                                onDragEnter={dragEnterHandler}
                                onDragLeave={dragLeaveHandler}
                                onDrop={dropHandler}
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
                    </BoardItem>
                ))}
            </ul>
        </SectionWrapper>
    )
}

const BoardItem = styled.li`
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
export default BoardList
