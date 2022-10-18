import React, { useState } from 'react'
import styled from 'styled-components'
import { doc, updateDoc } from 'firebase/firestore'
import { db, auth } from '../../../firebase.config'

import Button from '../../../UI/Button'
import Icon from '../../../UI/Icon'
import device from '../../../UI/Breakpoint'

const DateBackdrop = ({ onClose }) => <Backdrop onClick={onClose} />

const SetDate = ({ onUpdateDate, onClose, card, boardId, boardStatus }) => {
    const { uid } = auth.currentUser
    const todayDate = new Date().toISOString().substring(0, 10)
    const [startDateVal, setStartDateVal] = useState(card.date.startDate)
    const [dueDateVal, setDueDateVal] = useState(card.date.dueDate)
    const [dueDateTime, setDueDateTime] = useState(card.date.deadlineTime)
    const startDateValValidity = () => {
        if (startDateVal) {
            return true
        }
        return false
    }
    const [isStartDateChecked, setIsStartDateChecked] =
        useState(startDateValValidity)
    const dueDateValValidity = () => {
        if (dueDateVal) {
            return true
        }
        return false
    }
    const [isDueDateChecked, setIsDueDateChecked] = useState(dueDateValValidity)

    const months = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'June',
        'Jul',
        'Aug',
        'Sept',
        'Oct',
        'Nov',
        'Dec',
    ]
    const yearNow = new Date().getFullYear()

    // Edit the date into a right string format ('Month date')
    const editDateHandler = (date) => {
        const dateArr = date.split('-')
        const month = months[parseInt(`${dateArr[1]}`, 10) - 1]
        let updatedDate

        if (date === '' || date === undefined) {
            updatedDate = ''
        } else if (parseInt(dateArr[0], 10) === yearNow) {
            updatedDate = `${month} ${dateArr[2]}`
        } else if (parseInt(dateArr[0], 10) !== yearNow) {
            updatedDate = `${month} ${dateArr[2]}, ${dateArr[0]}`
        }
        return updatedDate
    }

    // Used to check if the saved dates are YYYY-MM-DD or not
    const dateRegexPatternCheck = (date) => {
        const dateReg = /^\d{4}[./-]\d{2}[./-]\d{2}$/
        return dateReg.test(date)
    }

    // cardDate reference in the firestore
    const cardDateRef = doc(
        db,
        'users',
        uid,
        'boards',
        boardId,
        boardStatus,
        card.id
    )

    const submitDateHandler = async (e) => {
        e.preventDefault()

        const regexCheckStartDate = dateRegexPatternCheck(startDateVal)
        const regexCheckDueDate = dateRegexPatternCheck(dueDateVal)
        const dateObj = {
            startDate: startDateVal,
            dueDate: dueDateVal,
            deadlineTime: dueDateTime,
            completed: false,
        }

        if (regexCheckStartDate === true && regexCheckDueDate === false) {
            dateObj.startDate = editDateHandler(startDateVal)
        } else if (regexCheckStartDate === true && regexCheckDueDate === true) {
            dateObj.startDate = editDateHandler(startDateVal)
            dateObj.dueDate = editDateHandler(dueDateVal)
        } else if (
            regexCheckStartDate === false &&
            regexCheckDueDate === true
        ) {
            dateObj.dueDate = editDateHandler(dueDateVal)
        }

        if (isStartDateChecked && !isDueDateChecked) {
            dateObj.dueDate = ''
            dateObj.time = ''
            onUpdateDate(dateObj)
        } else if (isDueDateChecked && !isStartDateChecked) {
            dateObj.startDate = ''
            onUpdateDate(dateObj)
        } else if (!isDueDateChecked && !isStartDateChecked) {
            dateObj.startDate = ''
            dateObj.dueDate = ''
            dateObj.deadlineTime = ''
            onUpdateDate(dateObj)
        } else if (isDueDateChecked && isStartDateChecked) {
            onUpdateDate(dateObj)
        }

        // Update date in firestore database
        await updateDoc(cardDateRef, {
            date: dateObj,
        })

        onClose()
    }

    const removeDateHandler = async () => {
        const dateObj = {
            startDate: '',
            dueDate: '',
            deadlineTime: '',
            completed: false,
        }
        onUpdateDate(dateObj)

        await updateDoc(cardDateRef, {
            date: dateObj,
        })
        onClose()
    }

    const startDateCheckboxHandler = () => {
        setIsStartDateChecked((prevState) => !prevState)
    }

    const dueDateCheckboxHandler = () => {
        setIsDueDateChecked((prevState) => !prevState)
    }

    return (
        <>
            <DateBackdrop onClose={onClose} />
            <Form onSubmit={submitDateHandler}>
                <Close onClick={onClose}>
                    <Icon
                        name="Close"
                        iconColor="#899090"
                        hoverColor="#ffffff"
                    />
                </Close>
                <Text>Start Date</Text>
                <DateWrap>
                    <label htmlFor="start-date">
                        <InputCheckbox
                            type="checkbox"
                            onChange={startDateCheckboxHandler}
                            checked={isStartDateChecked}
                        />
                    </label>
                    {!isStartDateChecked ? (
                        <DateFormat>dd-mm-yyyy</DateFormat>
                    ) : (
                        <Input
                            type="text"
                            min={todayDate}
                            value={startDateVal}
                            placeholder={todayDate}
                            onChange={(e) => setStartDateVal(e.target.value)}
                            onBlur={(e) => {
                                e.target.type = 'text'
                            }}
                            onFocus={(e) => {
                                e.target.type = 'date'
                            }}
                        />
                    )}
                </DateWrap>
                <Text>Due Date</Text>
                <DateWrap>
                    <label htmlFor="due-date">
                        <InputCheckbox
                            type="checkbox"
                            onChange={dueDateCheckboxHandler}
                            checked={isDueDateChecked}
                        />
                    </label>
                    {!isDueDateChecked ? (
                        <Span>
                            <DateFormat>dd-mm-yyyy</DateFormat>
                            <DateFormat>hh:mm</DateFormat>
                        </Span>
                    ) : (
                        <Span>
                            <Input
                                type="text"
                                min={startDateVal}
                                value={dueDateVal}
                                placeholder={todayDate}
                                onChange={(e) => setDueDateVal(e.target.value)}
                                onBlur={(e) => {
                                    e.target.type = 'text'
                                }}
                                onFocus={(e) => {
                                    e.target.type = 'date'
                                }}
                            />
                            <Input
                                onChange={(e) => setDueDateTime(e.target.value)}
                                placeholder="set time"
                                style={{ width: '10ch' }}
                                value={dueDateTime}
                            />
                        </Span>
                    )}
                </DateWrap>
                <BtnGrp>
                    <Button primary type="submit" padding="auto">
                        Save
                    </Button>
                    <Button padding="auto" onClick={removeDateHandler}>
                        Remove
                    </Button>
                </BtnGrp>
            </Form>
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
    background-color: transparent;
`
const Close = styled.span`
    display: flex;
    justify-content: flex-end;
    margin-bottom: 20rem;
`

const Text = styled.p`
    color: ${({ theme }) => theme.lightGray};
    padding-bottom: 5rem;
    font-size: 11rem;
    font-weight: 300;
`
const Form = styled.form`
    margin-top: 20rem;
    z-index: 100;
    background-color: #4b4e4e;
    padding: 20rem;
    border-radius: 2px;
    width: 320px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    @media only screen and ${device.mobileM} {
        left: 75%;
    }
`
const DateWrap = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-top: 10rem;
    margin-left: -10rem;
`
const Input = styled.input`
    max-width: 16ch;
    margin-left: -10rem;
`
const InputCheckbox = styled(Input)`
    margin-right: -10rem;
`
const DateFormat = styled.span`
    padding: 5rem;
    border: 1px solid;
    border-radius: 4px;
    color: ${({ theme }) => theme.darkGray};
    font-weight: 400;
    margin-left: -10rem;
`
const BtnGrp = styled.div`
    display: flex;
    margin-top: 40rem;
    gap: 5rem;
`
const Span = styled.span`
    display: flex;
    gap: 15rem;
`

export default SetDate
