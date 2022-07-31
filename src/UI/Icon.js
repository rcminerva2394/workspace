import React from 'react'

import {
    FaBars,
    FaBusinessTime,
    FaWalking,
    FaCheckCircle,
    FaEllipsisH,
} from 'react-icons/fa'

import { ImCross } from 'react-icons/im'

const icons = {
    Menu: FaBars,
    Todo: FaBusinessTime,
    Doing: FaWalking,
    Done: FaCheckCircle,
    Ellipsis: FaEllipsisH,
    Close: ImCross,
}

const Icon = ({ name, onClick, iconColor }) => {
    const FinalIcon = icons[name]
    const style = {
        color: iconColor,
        paddingRight: '5rem',
    }
    return <FinalIcon onClick={onClick} style={style} size="20px" />
}

export default Icon
