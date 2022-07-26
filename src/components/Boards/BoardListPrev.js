import React from 'react'
import styled from 'styled-components'
import SectionWrapper from '../../UI/SectionWrapper'
import boardPhoto from '../../assets/night-view.png'
import device from '../../UI/Breakpoint'

const BoardListPrev = ({ boardList }) => {
    return (
        <SectionWrapper>
            <h2>Your Boards</h2>
            <BoardListWrapper>
                {boardList.map((board) => (
                    <a href={`#${board.id}`} key={board.id}>
                        <BoardName>{board.name}</BoardName>
                        <BGPhoto src={boardPhoto} alt="night view" />
                    </a>
                ))}
            </BoardListWrapper>
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
    z-index: 10;
    padding-left: 10rem;
`

export default BoardListPrev
