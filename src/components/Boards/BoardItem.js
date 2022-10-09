import React, { useEffect } from 'react'

import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import BoardType from './BoardType'
import device from '../../UI/Breakpoint'
import { useBoards } from '../../contexts/boards-context'
import { getBoardType } from '../../utils/reads/FetchDataFuncs'
import Loader from '../../UI/Loader'

const BoardItem = () => {
    const { id } = useParams()
    const { boards, setBoards } = useBoards()

    // fetch the todo, doing, and done subcollection
    useEffect(() => {
        getBoardType(id, 'todo', setBoards)
        getBoardType(id, 'doing', setBoards)
        getBoardType(id, 'done', setBoards)
    }, [id])

    const Board = boards.filter((board) => board.id === id)

    if (Board === undefined || Board.length === 0) {
        return <Loader />
    }

    console.log(boards)

    return (
        <ContentWrap>
            <h3>{Board[0].name}</h3>
            <BoardTypesWrapper>
                <BoardType
                    boardStatus="Todo"
                    id={Board[0].id}
                    cards={Board[0].todo}
                />
                <BoardType
                    boardStatus="Doing"
                    id={Board[0].id}
                    cards={Board[0].doing}
                />
                <BoardType
                    boardStatus="Done"
                    id={Board[0].id}
                    cards={Board[0].done}
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
