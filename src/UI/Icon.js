import React from 'react'

import {
    FaBars,
    FaBusinessTime,
    FaWalking,
    FaCheckCircle,
    FaEllipsisH,
} from 'react-icons/fa'

const icons = {
    Menu: FaBars,
    Todo: FaBusinessTime,
    Doing: FaWalking,
    Done: FaCheckCircle,
    Ellipsis: FaEllipsisH,
}

const Icon = ({ name, onClick, iconColor }) => {
    const FinalIcon = icons[name]
    return (
        <FinalIcon
            onClick={onClick}
            style={{
                color: iconColor,
                paddingRight: '5rem',
            }}
            size="20px"
        />
    )
}

export default Icon
