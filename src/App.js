import React from 'react'
import Main from './components/Main'
import TopNavBar from './components/TopNavBar'
import SignIn from './components/SignIn'
// import {Route, Routes } from 'react-router-dom'

const App = () => {
    return (
        // <Routes>
        //     <Route path="/dashboard" />

        // </Routes>
        <>
            <TopNavBar />
            <SignIn />
            <Main />
        </>
    )
}
export default App
