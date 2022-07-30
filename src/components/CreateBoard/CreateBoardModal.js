import React, { useState } from 'react'
import styled from 'styled-components'
import Button from '../../UI/Button'
import device from '../../UI/Breakpoint'

const ModalBackdrop = ({ onCancel }) => (
    <Backdrop onClick={() => onCancel(false)} />
)

const ModalOverlay = ({ onCancel, onConfirm }) => {
    const [boardName, setBoardName] = useState('Board Name')
    const inputNameHandler = (e) => {
        setBoardName(e.target.value)
    }
    const boardNameSubmitHandler = (e) => {
        e.preventDefault()
        onConfirm(boardName)
    }
    return (
        <OverlayWrapper onSubmit={boardNameSubmitHandler}>
            <label htmlFor="boardname">Board Name</label>
            <input onChange={inputNameHandler} type="text" id="boardname" />
            <BtnWrapper>
                <Button type="submit" name="Create" primary>
                    Create
                </Button>
                <Button name="Cancel" secondary onClick={() => onCancel(false)}>
                    Cancel
                </Button>
            </BtnWrapper>
        </OverlayWrapper>
    )
}

const CreateBoardModal = ({ onConfirm }) => {
    const cancelHandler = (status) => {
        onConfirm({ stat: status })
    }
    const confirmHandler = (newboard) => {
        onConfirm({ stat: true, name: newboard })
    }
    return (
        <>
            <ModalBackdrop onCancel={cancelHandler} />
            <ModalOverlay onCancel={cancelHandler} onConfirm={confirmHandler} />
        </>
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
`

const OverlayWrapper = styled.form`
    background-color: #ffffff;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 100;
    width: 100vw;
    padding: 30rem;
    border-radius: 5rem;
    gap: 10rem;
    display: flex;
    flex-direction: column;
    place-items: center;

    @media only screen and ${device.mobileL} {
        max-width: 500px;
    }
`

const BtnWrapper = styled.div`
    display: flex;
    justify-content: center;
    gap: 5rem;
    margin-top: 10rem;
`

export default CreateBoardModal
