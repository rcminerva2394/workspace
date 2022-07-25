import React from 'react'
import styled from 'styled-components'

const Button = ({ children, onClick, type, primary, secondary }) => {
    return (
        <ButtonWrapper
            onClick={onClick}
            type={type || 'button'}
            primary={primary}
            secondary={secondary}
        >
            {children}
        </ButtonWrapper>
    )
}

const ButtonWrapper = styled.button`
    background-color: ${(props) =>
        props.primary ? ({ theme }) => theme.button.blue : 'transparent'};
    padding: 10rem 20rem;
    outline: none;
    border: 2px solid
        ${(props) =>
            props.primary
                ? ({ theme }) => theme.button.blue
                : props.secondary
                ? ({ theme }) => theme.lightGray
                : 'transparent'};
    border-radius: 4rem;
    color: ${(props) =>
        props.primary ? '#ffffff' : props.secondary ? '#000000' : '#ffffff'};
    font-weight: 500;
    font-size: 12rem;
    :hover {
        background-color: ${(props) =>
            props.primary
                ? ({ theme }) => theme.button.hover
                : props.secondary
                ? 'transparent'
                : `rgba(221, 213, 213, 0.22)`};
        border: 2px solid
            ${(props) =>
                props.primary
                    ? ({ theme }) => theme.button.hover
                    : props.secondary
                    ? ({ theme }) => theme.darkGray
                    : 'transparent'};
    }
`
export default Button
