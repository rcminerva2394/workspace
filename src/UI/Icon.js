import React, { useState } from 'react'

import {
    FaBars,
    FaBusinessTime,
    FaWalking,
    FaCheckCircle,
    FaEllipsisH,
    FaRegClock,
    FaCheckDouble,
    FaTrashAlt,
    FaPencilAlt,
    FaSave,
    FaFacebook,
    FaGoogle,
    FaGithub,
    FaUserAlt,
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
    Trash: FaTrashAlt,
    Edit: FaPencilAlt,
    Save: FaSave,
    Facebook: FaFacebook,
    Google: FaGoogle,
    Github: FaGithub,
    Guest: FaUserAlt,
}

const Icon = ({ name, onClick, iconColor, hoverColor, size }) => {
    const [hover, setHover] = useState(false)

    let finalHoverColor = hoverColor
    if (hoverColor === undefined) {
        finalHoverColor = iconColor
    }

    let finalSize
    if (size) {
        finalSize = size
    } else {
        finalSize = '20px'
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
            size={finalSize}
            onMouseEnter={mouseEnterHandler}
            onMouseLeave={mouseLeaveHandler}
        />
    )
}

export default Icon
