import React, { useState, useEffect, useContext } from 'react'
import { v4 as uuidv4 } from 'uuid'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import { signOut } from 'firebase/auth'
import { auth } from '../firebase.config'
import Icon from '../UI/Icon'
import device from '../UI/Breakpoint'
import BoardsContext from '../contexts/boards-context'
import CreateBoardModal from './CreateBoard/CreateBoardModal'

const SideNavBackdrop = ({ onClose }) => {
    return <Backdrop onClick={onClose} />
}

const SideNav = ({ onClose }) => {
    const [isCreatingBoard, setIsCreatingBoard] = useState(false)
    const { boards, setBoards } = useContext(BoardsContext)
    const logOut = () => {
        return signOut(auth)
    }

    const addBoardHandler = () => {
        setIsCreatingBoard(true)
    }
    const createBoardHandler = (response) => {
        if (response.stat === true) {
            setBoards((prevState) => {
                return [
                    ...prevState,
                    {
                        id: uuidv4(),
                        boardName: response.name,
                        Todo: [],
                        Doing: [],
                        Done: [],
                    },
                ]
            })
            setIsCreatingBoard(false)
        } else if (response.stat === false) {
            setIsCreatingBoard(false)
        }
    }

    return (
        <>
            {isCreatingBoard && (
                <CreateBoardModal onConfirm={createBoardHandler} />
            )}
            <SideNavBackdrop onClose={onClose} />
            <NavWrapper>
                <BrandName>Workspace</BrandName>
                <SettingsWrapper>
                    <Link to="/dashboard">
                        <NavItem>
                            <Link to="/dashboard">
                                <Span>
                                    <Icon name="Home" padding margin="20rem" />
                                    Dashboard
                                </Span>
                            </Link>
                        </NavItem>
                    </Link>

                    <NavItem>
                        <div>
                            <AllBoardsWrap>
                                <AllBoards>ALL BOARDS</AllBoards>
                                <Icon
                                    name="Plus"
                                    hoverColor="#ffffff"
                                    onClick={addBoardHandler}
                                />
                            </AllBoardsWrap>
                            <ul>
                                {boards.map((board) => (
                                    <Link to={`board/${board.id}`}>
                                        <Span key={board.id}>
                                            <Icon name="Board" margin="20rem" />
                                            {board.boardName}
                                        </Span>
                                    </Link>
                                ))}
                            </ul>
                        </div>
                    </NavItem>
                    <NavItem last>
                        <Span>
                            <Icon name="Settings" margin="20rem" />
                            Settings
                        </Span>
                        <Link to="/">
                            <Span>
                                <Icon
                                    name="LogOut"
                                    margin="20rem"
                                    onClick={logOut}
                                />
                                Log Out
                            </Span>
                        </Link>
                    </NavItem>
                </SettingsWrapper>
            </NavWrapper>
        </>
    )
}

const SideNavBar = () => {
    const [showSideNav, setShowSideNav] = useState(false)
    const [windowWidth, setWindowWidth] = useState()

    // For updating layout whenever viewport size changes
    useEffect(() => {
        const updateSize = () => {
            setWindowWidth(window.innerWidth)
        }
        window.addEventListener('resize', updateSize)
        updateSize()
        if (windowWidth >= 1024) {
            setShowSideNav(true)
        } else if (windowWidth < 1024) {
            setShowSideNav(false)
        }
        return () => window.removeEventListener('resize', updateSize)
    }, [windowWidth])

    return (
        <Wrapper>
            <TopBar>
                <Icon
                    name="Menu"
                    iconColor="#a2a4a4"
                    hoverColor="#ffffff"
                    onClick={() => setShowSideNav((prevState) => !prevState)}
                />
            </TopBar>
            {showSideNav && <SideNav onClose={() => setShowSideNav(false)} />}
        </Wrapper>
    )
}

const Backdrop = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    z-index: 10;
    background-color: hsla(0, 0%, 22%, 0.83);
    @media only screen and ${device.laptop} {
        display: none;
    } ;
`
const TopBar = styled.div`
    background-color: ${({ theme }) => theme.darkestGray};
    margin: -20rem -20rem 0rem;
    padding: 20rem 30rem;
    z-index: 1;
`
const Wrapper = styled.div`
    position: relative;
`
const NavWrapper = styled.nav`
    width: 250px;
    border-right: 1px solid #575757;
    height: 100vh;
    color: #a2a4a4;
    font-weight: 600;
    padding-top: 20rem;
    background-color: ${({ theme }) => theme.darkerGray};
    z-index: 50;
    position: fixed;
    top: 0;
    left: 0;
    padding-left: 20rem;
`
const BrandName = styled.span`
    font-size: 22rem;
    font-weight: 600;
    color: #ffffff;
    text-align: center;
    padding-bottom: 30rem;
`
const NavItem = styled.div`
    border-bottom: ${(props) => (props.last ? 'none' : '1px solid #575757')};
    padding: 10rem;
`
const AllBoards = styled.p`
    font-size: 12rem;
    color: ${({ theme }) => theme.fontColors.inActive};
`

const Span = styled.span`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-top: 10rem;
    padding-bottom: 10rem;
    padding-left: 10rem;
    gap: 5rem;
    font-weight: 300;
    :hover {
        color: #ffffff;
        background-color: rgba(221, 213, 213, 0.22);
        border-radius: 4px;
    }
`
const SettingsWrapper = styled.div`
    margin-top: 20rem;
`
const AllBoardsWrap = styled(Span)`
    padding-bottom: 5rem;
    :hover {
        background-color: transparent;
        border-radius: 0;
    }
`
export default SideNavBar
