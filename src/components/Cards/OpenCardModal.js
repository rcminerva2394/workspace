import React from 'react'
import styled from 'styled-components'
import Button from '../../UI/Button'
import Icon from '../../UI/Icon'
import device from '../../UI/Breakpoint'

const ModalBackdrop = ({ onClose }) => <Backdrop onClick={onClose} />

const OpenCardModal = ({ card, onClose }) => {
    return (
        <>
            <ModalBackdrop onClose={onClose} />
            <OpenCardWrapper>
                <Close onClick={onClose}>
                    <Icon name="Close" />
                </Close>
                <div>
                    <h3>{card.title}</h3>
                    <LabelWrapper>
                        <Label htmlFor={card.id}>Description</Label>
                        <Input
                            id={card.id}
                            placeholder="e.g. Set up a meeting with the stakeholders regarding the targets next year"
                        />
                    </LabelWrapper>
                    <LabelWrapper>
                        <Label htmlFor="card-status">Status</Label>
                        <select id="card-status" name="card status">
                            <option value={card.status}>{card.status}</option>
                            <option value="Todo">Todo</option>
                            <option value="Doing">Doing</option>
                            <option value="Done">Done</option>
                        </select>
                    </LabelWrapper>
                </div>
                <div>
                    <AddCardWrapper>
                        <Text>Add to Card</Text>
                        <Button>Deadline</Button>
                        <Button>Subtasks</Button>
                    </AddCardWrapper>
                    <div>
                        <Text>Actions</Text>
                        <Button>Delete</Button>
                    </div>
                </div>
            </OpenCardWrapper>
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
const Close = styled.span`
    display: flex;
    justify-content: flex-end;
`

const OpenCardWrapper = styled.div`
    z-index: 100;
    background-color: ${({ theme }) => theme.darkestGray};
    padding: 30rem;
    width: 100%;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    @media only screen and ${device.mobileXL} {
        width: 600px;
    }
`
const LabelWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 20rem;
    gap: 10rem;
`
const Label = styled.label`
    color: #ffffff;
    font-weight: 400;
`
const Input = styled.input`
    display: block;
    width: 100%;
    height: 100px;
    padding: 0;
`
const AddCardWrapper = styled.div`
    display: flex;
    flex-direction: column;
`

const Text = styled.p`
    color: ${({ theme }) => theme.lightGray};
`
export default OpenCardModal
