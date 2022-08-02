import React from 'react'
import styled from 'styled-components'
import Button from '../../UI/Button'
import Icon from '../../UI/Icon'
import device from '../../UI/Breakpoint'

const ModalBackdrop = ({ onClose }) => <Backdrop onClick={onClose} />

const OpenCardModal = ({ card, onClose }) => {
    const cardStatus = ['Todo', 'Doing', 'Done']
    const filteredStatus = cardStatus.filter((status) => status !== card.status)
    const optionStatus = filteredStatus.map((status) => {
        return <option value={status}>{status}</option>
    })
    return (
        <>
            <ModalBackdrop onClose={onClose} />
            <OpenCardWrapper>
                <Close onClick={onClose}>
                    <Icon
                        name="Close"
                        iconColor="#899090"
                        hoverColor="#ffffff"
                    />
                </Close>
                <CardDetails>
                    <div>
                        <h3>{card.title}</h3>
                        <LabelWrapper>
                            <Label htmlFor={card.id}>Description</Label>
                            <Description
                                id={card.id}
                                placeholder="e.g. Set up a meeting with the stakeholders regarding the targets next year"
                            />
                        </LabelWrapper>
                        <LabelWrapper>
                            <Label htmlFor="card-status">Status</Label>
                            <select id="card-status" name="card status">
                                <option value={card.status}>
                                    {card.status}
                                </option>
                                {optionStatus}
                            </select>
                        </LabelWrapper>
                    </div>
                    <BtnGrp>
                        <AddCardWrapper>
                            <Text>Add to Card</Text>
                            <Button tertiary padding="auto" width="100px">
                                <Icon name="Clock" iconColor="#323434" />
                                <span>Deadline</span>
                            </Button>
                            <Button tertiary padding="auto" width="100px">
                                <Icon name="Subtask" iconColor="#323434" />
                                <span>Subtasks</span>
                            </Button>
                        </AddCardWrapper>
                        <Actions>
                            <Text>Actions</Text>
                            <Button del padding="auto" with="100px">
                                <Icon name="Trash" />
                                <span>Delete</span>
                            </Button>
                        </Actions>
                    </BtnGrp>
                </CardDetails>
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
    padding: 20rem 20rem 30rem 20rem;
    width: 100%;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    @media only screen and ${device.mobileXL} {
        width: 600px;
        padding-left: 30rem;
        padding-bottom: 80rem;
    }
    @media only screen and ${device.tablet} {
        width: 700px;
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
    font-weight: 300;
`
const Description = styled.textarea`
    display: block;
    width: 100%;
`
const AddCardWrapper = styled.div`
    display: flex;
    flex-direction: column;
`

const Text = styled.span`
    color: ${({ theme }) => theme.lightGray};
    padding-bottom: 5rem;
    font-size: 11rem;
    font-weight: 200;
`
const BtnGrp = styled.div`
    margin-top: 30rem;
`

const Actions = styled.div`
    margin-top: 20rem;
`

const CardDetails = styled.div`
    @media only screen and ${device.mobileXL} {
        display: grid;
        grid-auto-flow: column;
        grid-template-columns: 4fr 1fr;
        column-gap: 40rem;
    }
`

export default OpenCardModal
