import React, { useState, useMemo } from 'react'
import { Route, Routes } from 'react-router-dom'

// import { AuthProvider } from './contexts/auth-context'
import Home from './components/Home'
import SignUp from './components/SignUp'
import LogIn from './components/LogIn'
import ForgotPassword from './components/ForgotPassword'
// import SideNavBar from './components/SideNavBar'
import Dashboard from './components/Dashboard'
// import Main from './components/Main'

import BoardsContext from './contexts/boards-context'
import exampleBoards from './UI/exampleBoards'

const App = () => {
    // boards sample
    const [boards, setBoards] = useState(exampleBoards)
    const boardsValue = useMemo(() => ({ boards, setBoards }), [boards])

    return (
        <>
            {/* <AuthProvider> */}
            <BoardsContext.Provider value={boardsValue}>
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route path="/signin" element={<LogIn />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route
                        path="/reset-password"
                        element={<ForgotPassword />}
                    />
                    <Route path="/settings" element />
                    <Route path="/board" element />
                </Routes>
                {/* </AuthProvider> */}

                {/* <Main /> */}
            </BoardsContext.Provider>
        </>
    )
}
export default App
