import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'

import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../firebase.config'

import device from '../../UI/Breakpoint'
import Button from '../../UI/Button'

const ShareBoardBackdrop = ({ onClose }) => <Backdrop onClick={onClose} />

const Main = () => {
    // const [searchVal, setSearchVal] = useState('')
    const [users, setUsers] = useState()
    // const [userTags, setUserTags] = useState([])

    const searchUserHandler = async (e) => {
        const matchedUser = e.target.value.toLowerCase()
        console.log(matchedUser)
        try {
            const matchedUsers = []
            const queryUsers = query(
                collection(db, 'users'),
                where('name', '>=', matchedUser),
                // where('name', '==', matchedUser),
                where('name', '<=', `${matchedUser} \uf8ff`)
            )
            // //`${matchedUser} \uf8ff`
            const querySnapshot = await getDocs(queryUsers)
            querySnapshot.forEach((doc) => {
                console.log(doc.data())
                const userObj = {
                    id: doc.data().userId,
                    name: doc.data().name,
                    photo: doc.data().photo,
                    initials: doc.data().initials,
                }
                matchedUsers.push(userObj)
            })
            setUsers(matchedUsers)
            console.log(matchedUsers)
            console.log(users)
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <OverlayWrapper>
            <ShareBoardText>Share Board</ShareBoardText>
            <Form>
                <FilterWrap>
                    <Input
                        onKeyDown={searchUserHandler} /// will change this one to ref not onchange because it will trigger multiple calling of the firestore
                        placeholder="Email address or name"
                        type="text"
                    />
                </FilterWrap>
                <Button primary fontSize="14rem" padding="13rem">
                    Share
                </Button>
            </Form>
            {users && (
                <FoundUsers>
                    {users.map((user) => {
                        return (
                            <li key={user.id}>
                                {user.photo != null ? (
                                    <Img
                                        src={user.photo}
                                        alt="profile pic"
                                        style={{ width: '50px' }}
                                    />
                                ) : (
                                    <ProfilePic>{user.initials}</ProfilePic>
                                )}
                                <p>{user.name}</p>
                            </li>
                        )
                    })}
                </FoundUsers>
            )}
        </OverlayWrapper>
    )
}

// 1) input onchange getValue
// 2) While input value is updated
// 3) Cloud function will query the users collection with the strings or idea/ username
// 4) then fetch those to show them to the div of matched usernames/account
// 5) then if user clicks into one of it, the account will be added to the array of usertags
// 6) then, if user press share , there will be event listener to add or change the member of the boards and its subcollections, to update the id, so the member added wil be able to change or update the boards and everything under it.

const ShareBoard = ({ onClose }) => {
    return (
        <>
            {ReactDOM.createPortal(
                <ShareBoardBackdrop onClose={onClose} />,
                document.getElementById('modal-backdrop')
            )}
            {ReactDOM.createPortal(
                <Main />,
                document.getElementById('modal-overlay')
            )}
        </>
    )
}

const Backdrop = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    z-index: 52;
    background: rgba(0, 0, 0, 0.72);
`

const OverlayWrapper = styled.div`
    z-index: 100;
    background-color: ${({ theme }) => theme.darkerGray};
    padding: 30rem 30rem 30rem 30rem;
    width: 100vw;
    top: 50%;
    left: 50%;
    position: fixed;
    max-height: 100vh;
    overflow-y: scroll;
    overflow-x: hidden;
    transform: translate(-50%, -50%);
    -ms-overflow-style: none; /* Internet Explorer 10+ */
    scrollbar-width: none; /* Firefox */
    ::-webkit-scrollbar {
        display: none; /* Safari and Chrome */
    }
    @media only screen and ${device.mobileXL} {
        width: 600px;
        padding-left: 30rem;
        padding-bottom: 80rem;
    }
    @media only screen and ${device.tablet} {
        width: 700px;
    }
`

const Form = styled.form`
    padding: 5rem;
    display: flex;
    align-items: center;
    gap: 10rem;
    width: 100%;
`
const FilterWrap = styled.div`
   border: 1px solid
   padding: 5rem;
   width: 100%;
`
const Input = styled.input`
    border: 1px solid #cccccc;
    outline: none;
    background-color: transparent;
    padding: 15rem;
    min-width: 100%;
`
const ShareBoardText = styled.p`
    font-size: 20rem;
    font-weight: 400;
`
const Img = styled.img`
    border-radius: 50%;
    width: 50px;
`

const ProfilePic = styled.p`
    background-color: ${({ theme }) => theme.user};
    color: white;
    border-radius: 50%;
    width: 50px;
    text-align: center;
    padding: 12px;
    align-self: flex-start;
    font-weight: 600;
`
const FoundUsers = styled.div`
    background-color: #b6b6b6;
    border-radius: 4px;
    padding: 5rem;
`
export default ShareBoard
