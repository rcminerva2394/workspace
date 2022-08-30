import React, { useContext } from 'react'

import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import BoardType from './BoardType'
import device from '../../UI/Breakpoint'
import BoardsContext from '../../contexts/boards-context'

const BoardItem = () => {
    const { boards } = useContext(BoardsContext)
    const { id } = useParams()
    const Board = boards.filter((board) => board.id === id)

    return (
        <ContentWrap>
            <h3>{Board[0].boardName}</h3>
            <BoardTypesWrapper>
                <BoardType
                    boardStatus="Todo"
                    id={Board[0].id}
                    cards={Board[0].Todo}
                />
                <BoardType
                    boardStatus="Doing"
                    id={Board[0].id}
                    cards={Board[0].Doing}
                />
                <BoardType
                    boardStatus="Done"
                    id={Board[0].id}
                    cards={Board[0].Done}
                />
            </BoardTypesWrapper>
        </ContentWrap>
    )
}

const BoardTypesWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    flex-wrap: wrap;
    @media only screen and ${device.mobileXL} {
        flex-direction: row;
    }
`
const ContentWrap = styled.li`
    margin-top: 70rem;
    position: relative;
    display: flex;
    justify-content: center;
    flex-direction: column;
    @media only screen and ${device.mobileL} {
        margin: 20rem;
    }
    @media only screen and ${device.laptop} {
        margin-left: 270px;
        margin: 30rem 30rem 30remm 220px;
    }
`

export default BoardItem
