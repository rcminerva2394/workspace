import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import TopNavBar from './TopNavBar'
import Button from '../../UI/Button'
import backgroundPhoto from '../../assets/man-writing.png'
import device from '../../UI/Breakpoint'

const Home = () => {
    return (
        <>
            <TopNavBar />
            <HomeWrapper>
                <span>
                    <Photo
                        src={backgroundPhoto}
                        alt="Man writing and planning"
                    />
                </span>
                <TextDiv>
                    <Text>
                        Workspace helps you organize and track your project
                        progress
                    </Text>
                    <SubText>
                        You can now break down your projects into managaeble
                        pieces. Reach productivity peaks without any cost.
                    </SubText>
                    <Link to="/signup">
                        <Button primary fontSize="16rem" width="inherit">
                            Sign up for free{' '}
                        </Button>
                    </Link>
                </TextDiv>
            </HomeWrapper>
        </>
    )
}

const HomeWrapper = styled.div`
    display: flex;
    justify-content: center;
    place-items: center;
    flex-direction: column;
    gap: 20rem;
    margin: 60rem 10rem;
    @media only screen and ${device.tablet} {
        flex-direction: row-reverse;
        justify-content: space-evenly;
    }
`
const Text = styled.p`
    font-size: 22rem;
    font-weight: 500;
    margin-bottom: 20rem;
    color: inherit;
    @media only screen and ${device.laptop} {
        font-size: 24rem;
    }
`
const SubText = styled.p`
    font-size: 17rem;
    font-weight: 300;
`
const TextDiv = styled.div`
    text-align: center;
    width: 100%;
    @media only screen and ${device.mobileL} {
        width: 350px;
    }
    @media only screen and ${device.mobileXL} {
        width: 400px;
    }
    @media only screen and ${device.tablet} {
        text-align: left;
    }
`
const Photo = styled.img`
    width: 230px;
    object-fit: cover;
    margin-top: 20rem;
    @media only screen and ${device.mobileL} {
        width: 300px;
    }
    @media only screen and ${device.tablet} {
        width: 250px;
    }
    @media only screen and ${device.laptop} {
        width: 320px;
    }
`

export default Home
