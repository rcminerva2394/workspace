import React from 'react'

import { FaBars, FaBusinessTime } from 'react-icons/fa'

const icons = { menu: FaBars, clock: FaBusinessTime }

const Icon = ({ name, onClick, Iconcolor }) => {
    const FinalIcon = icons[name]
    return (
        <FinalIcon
            onClick={onClick}
            style={{ color: Iconcolor, paddingRight: '5rem' }}
            size="20px"
        />
    )
}

export default Icon
