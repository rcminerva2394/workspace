import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import Icon from '../UI/Icon'
import { auth } from '../firebase'
import Button from '../UI/Button'
import device from '../UI/Breakpoint'

const SideNavBackdrop = ({ onClose }) => {
    return <Backdrop onClick={onClose} />
}

const SideNav = ({ onClose }) => {
    const signOut = () => {
        return auth.signOut()
    }

    return (
        <>
            <SideNavBackdrop onClose={onClose} />
            <NavWrapper>
                <BrandName>Workspace</BrandName>
                <NavItem>
                    <Span>
                        <Icon name="Home" padding margin="20rem" />
                        <p>Dashboard</p>
                    </Span>
                </NavItem>
                <NavItem>
                    <Span>
                        <AllBoards>ALL BOARDS</AllBoards>
                        <Icon name="Plus" />
                    </Span>
                    {/* Map the list of boards here */}
                </NavItem>
                <NavItem last>
                    <Span>
                        <Icon name="Settings" margin="20rem" />
                        <p>Settings</p>
                    </Span>
                    <Link to="/">
                        <Button onClick={signOut} width="inherit">
                            <Icon name="LogOut" margin="20rem" />
                            Log Out
                        </Button>
                    </Link>
                </NavItem>
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
    place-items: center;
    padding-top: 10rem;
`

export default SideNavBar
