import React, { useState, useRef, useEffect } from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'

import { collection, getDocs, query, where } from 'firebase/firestore'
import { db, auth } from '../../firebase.config'

import device from '../../UI/Breakpoint'
import Button from '../../UI/Button'

const ShareBoardBackdrop = ({ onClose }) => <Backdrop onClick={onClose} />

const Main = () => {
    const [users, setUsers] = useState('')
    const inputSize = useRef(null)
    const [inputMeasure, setInputMeasure] = useState({
        width: 0,
        top: 0,
        height: 0,
        left: 0,
    })
    const { displayName } = auth.currentUser
    console.log(displayName)

    const searchUserHandler = async (e) => {
        const matchedUser = e.target.value.toLowerCase()
        try {
            const matchedUsers = []
            const queryUsers = query(
                collection(db, 'users'),
                where('nameArray', 'array-contains', matchedUser),
                where('nameArray', '!=', displayName.toLowerCase()) // this is to avoid fetching or seeing own account
            )
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

    // setting same length for search results and input being on top of the form or modal itself
    useEffect(() => {
        const resizeHandler = () => {
            const { x, y } = inputSize.current.getBoundingClientRect()
            setInputMeasure({
                width: inputSize.current.offsetWidth,
                height: inputSize.current.offsetHeight,
                top: Math.floor(y),
                left: Math.floor(x),
            })
        }

        window.addEventListener('resize', resizeHandler)
        resizeHandler()
        return () => window.removeEventListener('resize', resizeHandler)
    }, [])

    return (
        <>
            <OverlayWrapper>
                <ShareBoardText>Share Board</ShareBoardText>
                <Form>
                    <FilterWrap ref={inputSize}>
                        <Input
                            onKeyDown={searchUserHandler}
                            placeholder="Search by name or email address"
                            type="text"
                        />
                    </FilterWrap>
                    <Button primary fontSize="13rem" padding="12rem">
                        Share
                    </Button>
                </Form>
            </OverlayWrapper>
            {users ? (
                <FoundUsers size={inputMeasure}>
                    {users.map((user) => {
                        return (
                            <List key={user.id}>
                                {user.photo != null ? (
                                    <Img
                                        src={user.photo}
                                        alt="profile pic"
                                        style={{ width: '50px' }}
                                    />
                                ) : (
                                    <ProfilePic>{user.initials}</ProfilePic>
                                )}
                                <Text>{user.name}</Text>
                            </List>
                        )
                    })}
                </FoundUsers>
            ) : users.length === 0 ? (
                <FoundUsers size={inputMeasure}>
                    Looks like the person is not a workspace member yet. Share a
                    link to invite them
                </FoundUsers>
            ) : (
                ''
            )}
        </>
    )
}

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
    z-index: 90;
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
    place-items: center;
    width: 100%;
    gap: 15rem;
    flex-wrap: wrap;
    @media only screen and ${device.mobileL} {
        flex-wrap: nowrap;
    }
`
const FilterWrap = styled.div`
    border: 1px solid #cccccc;
    padding: 6rem;
    width: 100%;
    border-radius: 4px;
    margin-bottom: -4rem;
`
const Input = styled.input`
    outline: none;
    background-color: transparent;
    min-width: 100%;
    border: 0;
    color: #ffffff;
    font-weight: 300;
`
const ShareBoardText = styled.p`
    font-size: 20rem;
    font-weight: 400;
`
const Img = styled.img`
    border-radius: 50%;
    width: 50px;
`
const Text = styled.p`
    color: #000000;
    font-weight: 400;
`

const ProfilePic = styled.p`
    background-color: ${({ theme }) => theme.user};
    border-radius: 50%;
    width: 50px;
    text-align: center;
    padding: 12px;
    align-self: flex-start;
    font-weight: 600;
    color: #000000;
`
const FoundUsers = styled.ul`
    background-color: #b6b6b6;
    border-radius: 4px;
    padding: 5rem;
    width: ${(props) => `${props.size.width}px`};
    top: ${(props) => `${props.size.top + props.size.height}px`};
    left: ${(props) => `${props.size.left}px`};
    z-index: 100;
    transform: translate
        ${(props) =>
            `${props.size.top + props.size.height}px, ${props.size.left}px`};
    position: fixed;
    color: #000000;
    font-weight: 300;
`
const List = styled.li`
    color: #000000;
    font-weight: 300;
    display: flex;
    align-items: center;
    gap: 10rem;
`
export default ShareBoard
