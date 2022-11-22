import React from 'react'
import { Link } from 'react-router-dom'

import styled from 'styled-components'

import SectionWrapper from '../../UI/SectionWrapper'
import boardPhoto from '../../assets/night-view.png'
import device from '../../UI/Breakpoint'
import { useBoards } from '../../contexts/boards-context'

import Loader from '../../UI/Loader'

const BoardListPrev = () => {
    const { boards } = useBoards()
    console.log(boards)

    return (
        <SectionWrapper>
            <>
                <h2>Your Boards</h2>
                <BoardListWrapper>
                    {boards === undefined ||
                    boards === null ||
                    boards.length === 0 ? (
                        <Loader />
                    ) : (
                        boards.map((board) => (
                            <Link to={`board/${board.id}`} key={board.id}>
                                <li key={board.id}>
                                    <BoardName>{board.name}</BoardName>
                                    <BGPhoto
                                        src={boardPhoto}
                                        alt="night view"
                                    />
                                </li>
                            </Link>
                        ))
                    )}
                </BoardListWrapper>
            </>
        </SectionWrapper>
    )
}

const BoardListWrapper = styled.ul`
    display: flex;
    flex-direction: column;
    position: relative;
    gap: 10rem;
    flex-wrap: wrap;
    @media only screen and ${device.mobileL} {
        flex-direction: row;
    }
`
const BGPhoto = styled.img`
    width: 100%;
    object-fit: cover;
    height: 90px;
    @media only screen and ${device.mobileL} {
        width: 320px;
    }
`
const BoardName = styled.p`
    position: absolute;
    z-index: 5;
    padding-left: 10rem;
    font-weight: 500;
`
export default BoardListPrev
