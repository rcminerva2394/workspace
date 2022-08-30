import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'

import SideNavBar from './SideNavBar'
import { auth } from '../firebase'

const PrivateRoutes = () => {
    const user = auth.currentUser
    if (user) {
        return (
            <>
                <SideNavBar />
                <Outlet />
            </>
        )
    }
    return <Navigate to="/" />
}

export default PrivateRoutes
