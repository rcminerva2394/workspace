import React from 'react'
import styled from 'styled-components'

const Button = ({
    children,
    onClick,
    type,
    primary,
    secondary,
    tertiary,
    del,
    fontSize,
    padding,
    width,
}) => {
    return (
        <ButtonWrapper
            onClick={onClick}
            type={type || 'button'}
            primary={primary}
            secondary={secondary}
            tertiary={tertiary}
            del={del}
            fontSize={fontSize}
            padding={padding}
            width={width}
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
            : props.del
            ? '#D85443'
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
    :hover {
        background-color: ${(props) =>
            props.primary
                ? ({ theme }) => theme.button.hover
                : props.secondary
                ? 'transparent'
                : props.tertiary
                ? '#939f9f'
                : props.del
                ? '#be3927'
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
