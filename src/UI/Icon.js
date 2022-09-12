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
    FaPlus,
    FaHome,
} from 'react-icons/fa'

import { ImCross, ImSpinner6 } from 'react-icons/im'
import { BiExit } from 'react-icons/bi'
import { FiSettings } from 'react-icons/fi'
import { MdOutlineSpaceDashboard } from 'react-icons/md'

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
    LogOut: BiExit,
    Plus: FaPlus,
    Settings: FiSettings,
    Home: FaHome,
    Board: MdOutlineSpaceDashboard,
    Spinner: ImSpinner6,
}

const Icon = ({ name, onClick, iconColor, hoverColor, size, margin }) => {
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

    let finalMarginRight
    if (margin) {
        finalMarginRight = margin
    } else {
        finalMarginRight = '5rem'
    }

    const style = {
        color: hover ? finalHoverColor : iconColor,
        marginRight: finalMarginRight,
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
