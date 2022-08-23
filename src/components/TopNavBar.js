import React from 'react'
import styled from 'styled-components'

const TopNavBar = () => {
    return (
        <Nav>
            <Brand>Workspace</Brand>
            <HeaderLinks>
                <li href>Sign In</li>
                <SignLink>Sign up</SignLink>
            </HeaderLinks>
        </Nav>
    )
}

const Brand = styled.p`
    font-size: 20rem;
    font-weight: 600;
    color: inherit;
`

const Nav = styled.nav`
    background-color: ${({ theme }) => theme.darkestGray};
    display: flex;
    align-items: stretch;
    justify-content: space-between;
    padding: 0 0 0 30rem;
    margin: -20rem -20rem 0rem;
`
const HeaderLinks = styled.ul`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 30rem;
    margin: 0;
    padding: 0;
`
const SignLink = styled.li`
    height: 100%;
    background-color: blue;
    display: flex;
    align-items: center;
    padding: 0 30rem;
`

export default TopNavBar
