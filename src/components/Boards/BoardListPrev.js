import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import styled from 'styled-components'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db, auth } from '../../firebase.config'

import SectionWrapper from '../../UI/SectionWrapper'
import boardPhoto from '../../assets/night-view.png'
import device from '../../UI/Breakpoint'
import { useBoards } from '../../contexts/boards-context'

import Icon from '../../UI/Icon'

const BoardListPrev = () => {
    const { boards, setBoards } = useBoards()
    const [loading, setLoading] = useState(false)

    // get the initial boards from the firestore
    useEffect(
        () => async () => {
            setLoading(true)
            const { uid } = auth.currentUser
            const boardList = []
            try {
                const queryBoards = query(
                    collection(db, 'users', uid, 'boards'),
                    where(`members.${uid}`, '==', 'owner' || 'member')
                )
                const querySnapshot = await getDocs(queryBoards)
                querySnapshot.forEach((doc) => {
                    console.log(doc.id, ' => ', doc.data())
                    boardList.push(doc.data())
                })
                setBoards(boardList)
                console.log(boards)
            } catch (err) {
                console.log(err)
                console.log(err.code)
            }
            setLoading(false)
        },
        []
    )

    return (
        <SectionWrapper>
            <>
                <h2>Your Boards</h2>
                <BoardListWrapper>
                    {loading ? (
                        <Icon name="Spinner" />
                    ) : (
                        boards.map((board) => (
                            <Link to={`board/${board.id}`}>
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
