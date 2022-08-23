import React from 'react'
import styled from 'styled-components'
import device from './Breakpoint'

const Button = ({
    children,
    onClick,
    type,
    primary,
    secondary,
    tertiary,
    red,
    fontSize,
    padding,
    width,
    signUp,
    green,
}) => {
    return (
        <ButtonWrapper
            onClick={onClick}
            type={type || 'button'}
            primary={primary}
            secondary={secondary}
            tertiary={tertiary}
            red={red}
            fontSize={fontSize}
            padding={padding}
            width={width}
            signUp={signUp}
            green={green}
        >
            {children}
        </ButtonWrapper>
    )
}

const ButtonWrapper = styled.button`
    background-color: ${(props) =>
        props.primary
            ? ({ theme }) => theme.button.blue
            : props.tertiary
            ? ({ theme }) => theme.fontColors.date
            : props.red
            ? '#D85443'
            : props.green
            ? '#658668'
            : 'transparent'};
    padding: ${(props) => (props.padding ? props.padding : '10rem 20rem')};
    outline: none;
    margin-top: 5rem;
    cursor: pointer;
    width: ${(props) => (props.width ? props.width : 'auto')};
    border: 2px solid
        ${(props) =>
            props.primary
                ? ({ theme }) => theme.button.blue
                : props.secondary
                ? ({ theme }) => theme.lightGray
                : 'transparent'};
    border-radius: 4rem;
    color: ${(props) =>
        props.primary
            ? '#ffffff'
            : props.secondary
            ? '#000000'
            : props.tertiary
            ? '#000000'
            : '#ffffff'};
    font-weight: 400;
    font-size: ${(props) => (props.fontSize ? props.fontSize : '12rem')};
    display: flex;
    place-items: center;
    justify-content: center;
    gap: 10rem;
    text-align: left;
    :hover {
        background-color: ${(props) =>
            props.primary
                ? ({ theme }) => theme.button.hover
                : props.secondary
                ? 'transparent'
                : props.tertiary
                ? '#939f9f'
                : props.red
                ? '#be3927'
                : props.green
                ? '#567359'
                : `rgba(221, 213, 213, 0.22)`};
        border: 2px solid
            ${(props) =>
                props.primary
                    ? ({ theme }) => theme.button.hover
                    : props.secondary
                    ? ({ theme }) => theme.darkGray
                    : 'transparent'};
    }
    @media only screen and ${device.mobileS} {
        width: ${(props) => props.signUp && '100%'};
    }
    @media only screen and ${device.tablet} {
        width: ${(props) => props.signUp && 'auto'};
    }
`
export default Button
