import React, { useState } from 'react'

import {
    FaBars,
    FaBusinessTime,
    FaWalking,
    FaCheckCircle,
    FaEllipsisH,
    FaRegClock,
    FaCheckDouble,
    FaTrash,
} from 'react-icons/fa'

import { ImCross } from 'react-icons/im'

const icons = {
    Menu: FaBars,
    Todo: FaBusinessTime,
    Doing: FaWalking,
    Done: FaCheckCircle,
    Ellipsis: FaEllipsisH,
    Close: ImCross,
    Clock: FaRegClock,
    Subtask: FaCheckDouble,
    Trash: FaTrash,
}

const Icon = ({ name, onClick, iconColor, hoverColor }) => {
    const [hover, setHover] = useState(false)

    let finalHoverColor = hoverColor
    if (hoverColor === undefined) {
        finalHoverColor = iconColor
    }
    const style = {
        color: hover ? finalHoverColor : iconColor,
        paddingRight: '5rem',
    }
    const mouseEnterHandler = () => {
        setHover(true)
    }
    const mouseLeaveHandler = () => {
        setHover(false)
    }
    const FinalIcon = icons[name]
    return (
        <FinalIcon
            onClick={onClick}
            style={style}
            size="20px"
            onMouseEnter={mouseEnterHandler}
            onMouseLeave={mouseLeaveHandler}
        />
    )
}

export default Icon
