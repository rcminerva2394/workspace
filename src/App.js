import React from 'react'
import { Route, Routes } from 'react-router-dom'

import { AuthProvider } from './contexts/auth-context'
import Home from './components/Pages/Home'
import SignUp from './components/Pages/SignUp'
import LogIn from './components/Pages/LogIn'
import ForgotPassword from './components/Pages/ForgotPassword'
import PrivateRoutes from './components/Pages/PrivateRoutes'

import BoardItem from './components/Boards/BoardItem'
import CreateBoard from './components/CreateBoard/CreateBoard'
import NotFound from './components/Pages/NotFound'

const App = () => {
    return (
        <AuthProvider>
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path="/signin" element={<LogIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/reset-password" element={<ForgotPassword />} />
                <Route path="*" element={<NotFound />} />
                <Route path="/dashboard" element={<PrivateRoutes />}>
                    <Route index element={<CreateBoard />} />
                    <Route path="board/:id" element={<BoardItem />} />
                </Route>
            </Routes>
        </AuthProvider>
    )
}
export default App
