import React from 'react'

import { FaBars } from 'react-icons/fa'

const icons = { menu: FaBars }

const Icon = ({ name, onClick }) => {
    const FinalIcon = icons[name]
    return <FinalIcon onClick={onClick} />
}

export default Icon
