import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import device from '../UI/Breakpoint'
import Button from '../UI/Button'
import TopNavBar from './TopNavBar'

const ForgotPassword = () => {
    return (
        <>
            <TopNavBar />
            <Wrapper>
                <Title>Forgot Password</Title>
                <SubText>
                    Enter your email address to reset your password
                </SubText>
                <Form>
                    <Input placeholder="Email address" />
                    <Button primary width="100%" type="submit" padding="5rem">
                        Send
                    </Button>
                </Form>
                <Span>
                    <SubText>Already have an account?</SubText>
                    <SignLink>
                        <Link to="/signin">Sign In</Link>
                    </SignLink>
                </Span>
            </Wrapper>
        </>
    )
}

const Wrapper = styled.div`
    width: 100vw;
    background-color: #4b4e4e;
    padding: 30rem 30rem 50rem 30rem;
    border-radius: 4px;
    display: flex;
    place-items: center;
    flex-direction: column;
    position: fixed;
    top: 50%;
    left: 50%;
    max-height: 100vh;
    transform: translate(-50%, -50%);
    gap: 10rem;
    @media only screen and ${device.mobileL} {
        width: 425px;
    }
`
const Title = styled.h3`
    font-weight: 400;
    text-align: center;
`
const SubText = styled.p`
    color: #aeb7b7;
    font-size: 13rem;
    font-weight: 400;
    text-align: center;
    @media only screen and ${device.mobileXL} {
        font-size: 15rem;
    }
`
const Input = styled.input`
    background-color: transparent;
    padding: 10rem;
    border: 1px solid #a2a4a4;
    height: 50px;
    ::placeholder {
        color: #a2a4a4;
    }
    width: inherit;
`

const Form = styled.form`
    display: flex;
    gap: 10rem;
    justify-content: flex-start;
    flex-direction: column;
    width: 100%;
`
const Span = styled.span`
    display: flex;
    justify-content: flex-start;
    gap: 10rem;
    place-items: center;
`
const SignLink = styled.p`
    color: #e4e7e7;
    font-weight: 400;
    font-size: 13rem;
    @media only screen and ${device.mobileXL} {
        font-size: 15rem;
    }
`

export default ForgotPassword
