import React, { useState, useEffect } from 'react'

import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import BoardType from './BoardType'
import device from '../../UI/Breakpoint'
import { useBoards } from '../../contexts/boards-context'
import { getBoardType } from '../../utils/reads/FetchDataFuncs'
import Button from '../../UI/Button'
import Icon from '../../UI/Icon'
import ShareBoard from './ShareBoard'

const BoardItem = () => {
    const [willShareBoard, setWillShareBoard] = useState(false)
    const { id } = useParams()
    const { boards, setBoards } = useBoards()

    // fetch the todo, doing, and done subcollection
    useEffect(() => {
        getBoardType(id, 'todo', setBoards)
        getBoardType(id, 'doing', setBoards)
        getBoardType(id, 'done', setBoards)
    }, [id])

    const Board = boards.filter((board) => board.id === id)

    return (
        <>
            {willShareBoard && (
                <ShareBoard
                    onClose={() => setWillShareBoard(false)}
                    board={Board[0]}
                />
            )}
            <ContentWrap>
                <TitleBtnWrap>
                    <h3>{Board[0].name}</h3>
                    <Button
                        tertiary
                        fontSize="15rem"
                        padding="auto"
                        onClick={() => setWillShareBoard(true)}
                    >
                        <Icon name="AddUser" margin="1rem" />
                        Share
                    </Button>
                </TitleBtnWrap>
                <BoardTypesWrapper>
                    <BoardType
                        board={Board[0]}
                        boardStatus="todo"
                        id={Board[0].id}
                        cards={Board[0].todo}
                    />
                    <BoardType
                        board={Board[0]}
                        boardStatus="doing"
                        id={Board[0].id}
                        cards={Board[0].doing}
                    />
                    <BoardType
                        board={Board[0]}
                        boardStatus="done"
                        id={Board[0].id}
                        cards={Board[0].done}
                    />
                </BoardTypesWrapper>
            </ContentWrap>
        </>
    )
}

const BoardTypesWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
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
const TitleBtnWrap = styled.div`
    display: flex;
    justify-content: space-between;
`
export default BoardItem
