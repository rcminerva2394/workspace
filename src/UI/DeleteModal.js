import React from 'react'
import styled from 'styled-components'
import Button from './Button'
import device from './Breakpoint'
import Icon from './Icon'

const DELETETYPES = {
    carditem: {
        title: 'Delete Card?',
        message:
            'All actions will be removed from the card list and you won’t be able to re-open the card. There is no undo.',
    },
    subtasks: {
        title: 'Delete Subtasks?',
        message:
            'Deleting subtasks is permanent and there is no way to undo it',
    },
    comment: {
        title: 'Delete Comment?',
        message:
            'Deleting a comment is permanent and there is no way to undo it',
    },
}

const DeleteBackdrop = ({ onCancel }) => <Backdrop onClick={onCancel} />

const DeleteOverlay = ({ type, onDelete, onCancel }) => {
    return (
        <Overlay>
            <IconSpan>
                <Icon name="Close" iconColor="#D85443" size="26rem" />
            </IconSpan>
            <Title>{DELETETYPES[type].title}</Title>
            <p>{DELETETYPES[type].message}</p>
            <BtnGrp>
                <Button onClick={onCancel} padding="auto">
                    Cancel
                </Button>
                <Button del onClick={onDelete} padding="auto">
                    Delete
                </Button>
            </BtnGrp>
        </Overlay>
    )
}
const DeleteModal = ({ type, onDelete, onCancel }) => {
    return (
        <>
            <DeleteBackdrop onCancel={onCancel} />
            <DeleteOverlay
                type={type}
                onDelete={onDelete}
                onCancel={onCancel}
            />
        </>
    )
}

const Backdrop = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    z-index: 15;
    background: transparent;
`
const Overlay = styled.div`
    background-color: #4b4e4e;
    z-index: 100;
    padding: 30rem;
    position: fixed;
    top: 50%;
    width: 320px;
    transform: translate (50%, 50%);
    @media only screen and ${device.mobileL} {
        transform: translate (0%, 70%);
        left: 50%;
    }
`

const Title = styled.p`
    font-size: 15rem;
    font-weight: 500;
    color: ${({ theme }) => theme.lightGray};
    text-align: center;
`

const BtnGrp = styled.div`
    display: flex;
    justify-content: space-evenly;
`
const IconSpan = styled.span`
    display: flex;
    justify-content: center;
`
export default DeleteModal
