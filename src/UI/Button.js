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
                : ({ theme }) => theme.lightGray};
    border-radius: 4rem;
    color: ${(props) => (props.primary ? '#ffffff' : '#000000')};
    font-weight: 500;
    font-size: 12rem;
    :hover {
        background-color: ${(props) =>
            props.primary ? ({ theme }) => theme.button.hover : 'transparent'};
        border: 2px solid
            ${(props) =>
                props.primary
                    ? ({ theme }) => theme.button.hover
                    : ({ theme }) => theme.darkGray};
    }
`
export default Button
