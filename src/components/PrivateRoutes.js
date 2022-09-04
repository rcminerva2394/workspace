import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'

import { auth } from '../firebase.config'
import SideNavBar from './SideNavBar'

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
