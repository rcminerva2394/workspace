import React, { useState } from 'react'
import styled from 'styled-components'
import Button from '../../UI/Button'

const SetDate = ({ onUpdateDate }) => {
    const todayDate = new Date().toISOString().substring(0, 10)
    const [startDateVal, setStartDateVal] = useState('')
    const [dueDateVal, setDueDateVal] = useState('')
    const [dueDateTime, setDueDateTime] = useState('')
    const [isStartDateChecked, setIsStartDateChecked] = useState(false)
    const [isDueDateChecked, setIsDueDateChecked] = useState(false)

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

    //  Parsing the Date format
    const parseDateHandler = (date) => {
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

    const submitDateHandler = (e) => {
        e.preventDefault()
        const parsedStartDate = parseDateHandler(startDateVal)
        const parsedDueDate = parseDateHandler(dueDateVal)
        const dateObj = {
            startDate: parsedStartDate,
            dueDate: parsedDueDate,
            time: dueDateTime,
            completed: false,
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
            onUpdateDate(dateObj)
        } else if (isDueDateChecked && isStartDateChecked) {
            onUpdateDate(dateObj)
        }
    }

    return (
        <Form onSubmit={submitDateHandler}>
            <Text>Start Date</Text>
            <DateWrap>
                <label htmlFor="start-date">
                    <Input
                        type="checkbox"
                        onChange={() =>
                            setIsStartDateChecked((prevState) => !prevState)
                        }
                    />
                </label>
                {!isStartDateChecked ? (
                    <DateFormat>dd-mm-yyyy</DateFormat>
                ) : (
                    <Input
                        type="date"
                        min={todayDate}
                        value={startDateVal}
                        onChange={(e) => setStartDateVal(e.target.value)}
                    />
                )}
            </DateWrap>
            <Text>Due Date</Text>
            <DateWrap>
                <label htmlFor="due-date">
                    <Input
                        type="checkbox"
                        onChange={() =>
                            setIsDueDateChecked((prevState) => !prevState)
                        }
                    />
                </label>
                {!isDueDateChecked ? (
                    <span>
                        <DateFormat>dd-mm-yyyy</DateFormat>
                        <DateFormat>hh:mm AM/PM</DateFormat>
                    </span>
                ) : (
                    <span>
                        <Input
                            type="date"
                            min={startDateVal}
                            value={dueDateVal}
                            onChange={(e) => setDueDateVal(e.target.value)}
                        />
                        <Input
                            onChange={(e) => setDueDateTime(e.target.value)}
                            placeholder="time"
                            style={{ width: '10ch' }}
                        />
                    </span>
                )}
            </DateWrap>
            <BtnGrp>
                <Button primary type="submit" padding="auto">
                    Save
                </Button>
                <Button padding="auto"> Remove </Button>
            </BtnGrp>
        </Form>
    )
}

const Text = styled.p`
    color: ${({ theme }) => theme.lightGray};
    padding-bottom: 5rem;
    font-size: 11rem;
    font-weight: 300;
`
const Form = styled.form`
    margin-top: 20rem;
    z-index: 110;
    background-color: #4b4e4e;
    padding: 20rem;
    border-radius: 2px;
`
const DateWrap = styled.div`
    display: flex;
    place-items: center;
    gap: 10rem;
    margin-top: 10rem;
`
const Input = styled.input`
    width: auto;
    margin-left: 10rem;
`
const DateFormat = styled.span`
    padding: 10rem;
    border: 1px solid;
    border-radius: 4px;
    color: ${({ theme }) => theme.darkGray};
    font-weight: 400;
    margin-left: 10rem;
`
const BtnGrp = styled.div`
    display: flex;
    margin-top: 40rem;
    gap: 5rem;
`

export default SetDate
