import React from 'react'
import { Route, Routes } from 'react-router-dom'

import { AuthProvider } from './contexts/auth-context'
import Home from './components/Home'
import SignUp from './components/SignUp'
import LogIn from './components/LogIn'
import ForgotPassword from './components/ForgotPassword'
import PrivateRoutes from './components/PrivateRoutes'

// import BoardsContext from './contexts/boards-context'
// import exampleBoards from './UI/exampleBoards'
import BoardItem from './components/Boards/BoardItem'
import CreateBoard from './components/CreateBoard/CreateBoard'
import NotFound from './components/NotFound'

const App = () => {
    // boards sample
    // const [boards, setBoards] = useState()
    // const boardsValue = useMemo(() => ({ boards, setBoards }), [boards])

    return (
        <AuthProvider>
            {/* <BoardsContext.Provider value={boardsValue}> */}
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
            {/* </BoardsContext.Provider> */}
        </AuthProvider>
    )
}
export default App
