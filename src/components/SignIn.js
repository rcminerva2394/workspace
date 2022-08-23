import React from 'react'
import styled from 'styled-components'
import Button from '../UI/Button'
import Icon from '../UI/Icon'
import device from '../UI/Breakpoint'

const SignIn = () => {
    return (
        <Wrapper>
            <header>
                <Title>Sign In</Title>
                <Span>
                    <SubText>Do not have an account?</SubText>
                    <AnotherLink>Sign Up</AnotherLink>
                </Span>
            </header>
            <BtnGrp>
                <Button primary fontSize="15rem" width="250px">
                    <Icon name="Facebook" size="24px" />
                    <span>Sign in with Facebook</span>
                </Button>
                <Button red fontSize="15rem" width="250px">
                    <Icon name="Google" size="24px" />
                    <span>Sign in with Google</span>
                </Button>
                <Button tertiary fontSize="15rem" width="250px">
                    <Icon name="Github" size="24px" />
                    <span>Sign in with Github</span>
                </Button>
                <Button green fontSize="15rem" width="250px">
                    <Icon name="Guest" size="24px" />
                    <span>Sign in as a guest</span>
                </Button>
            </BtnGrp>
            <LineBreak>or</LineBreak>
            <SignForm>
                <Input placeholder="Email Address" />
                <Input placeholder="Password" />
                <Button primary width="100%">
                    Sign In
                </Button>
            </SignForm>
        </Wrapper>
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
    position: relative;
    left: 50%;
    transform: translate(-50%, 0);
    @media only screen and ${device.mobileL} {
        width: 425px;
    }
`
const Title = styled.h3`
    font-weight: 400;
    text-align: center;
`
const Span = styled.span`
    display: flex;
    justify-content: flex-start;
    gap: 10rem;
    place-items: center;
`
const SubText = styled.p`
    color: #aeb7b7;
    font-size: 13rem;
    font-weight: 400;
    @media only screen and ${device.mobileXL} {
        font-size: 15rem;
    }
`
const AnotherLink = styled.p`
    color: #e4e7e7;
    font-weight: 400;
    font-size: 13rem;
    @media only screen and ${device.mobileXL} {
        font-size: 15rem;
    }
`
const BtnGrp = styled.div`
    display: flex;
    gap: 5rem;
    flex-direction: column;
`
const LineBreak = styled.p`
    overflow: hidden;
    text-align: center;
    width: 250px;
    :before {
        content: '';
        display: inline-block;
        height: 1px;
        position: relative;
        vertical-align: middle;
        width: 50%;
        background: #a2a4a4;
        right: 0.5em;
        margin-left: -50%;
    }
    :after {
        content: '';
        display: inline-block;
        vertical-align: middle;
        height: 1px;
        position: relative;
        width: 50%;
        background: #a2a4a4;
        left: 0.5em;
        margin-right: -50%;
    }
`

const Input = styled.input`
    background-color: transparent;
    padding: 10rem;
    border: 1px solid #a2a4a4;
    width: 250px;
    ::placeholder {
        color: #a2a4a4;
    }
`

const SignForm = styled.form`
    display: flex;
    flex-direction: column;
    width: 250px;
    gap: 10rem;
`
export default SignIn
