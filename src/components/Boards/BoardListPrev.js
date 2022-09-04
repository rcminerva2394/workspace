import React, { useContext } from 'react'
import { Link } from 'react-router-dom'

import styled from 'styled-components'
import SectionWrapper from '../../UI/SectionWrapper'
import boardPhoto from '../../assets/night-view.png'
import device from '../../UI/Breakpoint'
import BoardsContext from '../../contexts/boards-context'

const BoardListPrev = () => {
    // const [areBoardsNull, setAreBoardsNull] = useState(false)
    const { boards } = useContext(BoardsContext)
    let areBoardsNull = false

    if (boards !== undefined || boards !== null) {
        areBoardsNull = true
    }

    return (
        <SectionWrapper>
            {areBoardsNull && (
                <>
                    <h2>Your Boards</h2>
                    <BoardListWrapper>
                        {areBoardsNull &&
                            boards.map((board) => (
                                <Link to={`board/${board.id}`}>
                                    <li key={board.id}>
                                        <BoardName>{board.boardName}</BoardName>
                                        <BGPhoto
                                            src={boardPhoto}
                                            alt="night view"
                                        />
                                    </li>
                                </Link>
                            ))}
                    </BoardListWrapper>
                </>
            )}
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
