import React, { useState, useRef, useEffect } from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'

import { collection, getDocs, query, where } from 'firebase/firestore'
import { db, auth } from '../../firebase.config'

import device from '../../UI/Breakpoint'
import Button from '../../UI/Button'
import barfadeloader from '../../assets/bars-scale-fade.svg'
import Icon from '../../UI/Icon'

const ShareBoardBackdrop = ({ onClose }) => <Backdrop onClick={onClose} />

const Main = () => {
    const [users, setUsers] = useState([])
    const inputSize = useRef(null)
    const [inputMeasure, setInputMeasure] = useState({
        width: 0,
        top: 0,
        height: 0,
        left: 0,
    })
    const [isSearching, setIsSearching] = useState(false) // this is to hide the search results if they found a user and click on it to add on user tags
    const [isLoading, setIsLoading] = useState(false)
    const [userTags, setUserTags] = useState([])
    const { uid } = auth.currentUser

    const searchUserHandler = async (e) => {
        const matchedUser = e.target.value.toLowerCase()
        setIsSearching(true)
        setIsLoading(true)

        try {
            const matchedUsers = []
            const queryUsers = query(
                collection(db, 'users'),
                where('nameArray', 'array-contains', matchedUser)
            )
            const querySnapshot = await getDocs(queryUsers)
            querySnapshot.forEach((doc) => {
                const userObj = {
                    id: doc.data().userId,
                    name: doc.data().name,
                    photo: doc.data().photo,
                    initials: doc.data().initials,
                }

                // This part is to check first if the object is already in the user tag, if undefined, then push it to the array and show the matchedUsers
                const checkObj = userTags.find(
                    (userTag) => userTag.id === userObj.id
                )

                if (checkObj === undefined) {
                    matchedUsers.push(userObj)
                }

                console.log(matchedUsers)
            })

            setUsers(matchedUsers)
            setIsLoading(false)
            console.log(users)
            console.log(matchedUsers)
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

    const addUserTagHandler = (val) => {
        setUserTags((prevState) => {
            return [...prevState, val]
        })
        setIsSearching(false)
        console.log(userTags)
    }

    const closeUserTagHandler = (tag) => {
        const updatedTags = userTags.filter((userTag) => userTag.id !== tag.id)
        setUserTags(updatedTags)
    }

    return (
        <>
            <OverlayWrapper>
                <ShareBoardText>Share Board</ShareBoardText>
                <Form>
                    <FilterWrap ref={inputSize}>
                        {userTags && (
                            <UserTagList>
                                {userTags.map((userTag) => {
                                    return (
                                        <Usertag key={userTag.id}>
                                            <span>{userTag.name}</span>
                                            <Icon
                                                name="Close"
                                                size="12rem"
                                                iconColor="#9c9a97"
                                                hoverColor="#000000"
                                                onClick={() =>
                                                    closeUserTagHandler(userTag)
                                                }
                                            />
                                        </Usertag>
                                    )
                                })}
                            </UserTagList>
                        )}
                        <Input
                            onChange={searchUserHandler}
                            placeholder="Search by name or email address"
                            type="text"
                        />
                    </FilterWrap>
                    <Button primary fontSize="13rem" padding="12rem">
                        Share
                    </Button>
                </Form>
            </OverlayWrapper>
            {isSearching && (
                <FoundUsers size={inputMeasure}>
                    {isLoading ? (
                        <Loader>
                            <img src={barfadeloader} alt="loader" />
                        </Loader>
                    ) : users.length === 0 ? (
                        <span>
                            Looks like the person is not a workspace member yet.
                            Share a link to invite them
                        </span>
                    ) : (
                        users.length !== 0 &&
                        users.map((user) => {
                            if (user.id === uid) {
                                return (
                                    <List key={user.id} disable>
                                        {user.photo != null ? (
                                            <Img
                                                src={user.photo}
                                                alt="profile pic"
                                                style={{ width: '50px' }}
                                            />
                                        ) : (
                                            <ProfilePic>
                                                {user.initials}
                                            </ProfilePic>
                                        )}
                                        <Wrap>
                                            <Text>{user.name}</Text>
                                            <BoardOwner>Board Owner</BoardOwner>
                                        </Wrap>
                                    </List>
                                )
                            }
                            return (
                                <List
                                    key={user.id}
                                    disable={false}
                                    onClick={() => addUserTagHandler(user)}
                                >
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
                        })
                    )}
                </FoundUsers>
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
    padding: 20rem 30rem 30rem 30rem;
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
    width: 100%;
    border-radius: 4px;
    margin-bottom: -4rem;
    padding: 2rem;
`
const Input = styled.input`
    outline: none;
    background-color: transparent;
    min-width: 100%;
    border: 0;
    color: #ffffff;
    font-weight: 300;
    padding: 5rem;
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
    padding: 10px;
    text-align: center;
    padding: 5px;
    width: 34px;
    height: 34px;
    font-weight: 600;
    color: #000000;
    background-color: #d9d9d9;
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
    display: flex;
    margin-top: 5rem;
    flex-wrap: wrap;
`
const List = styled.li`
    color: #000000;
    font-weight: 300;
    display: flex;
    align-items: center;
    gap: 10rem;
    &:hover {
        background-color: #ffffff;
    }
    cursor: ${(props) => (props.disable === true ? 'not-allowed' : 'pointer')};
    width: 100%;
    border-radius: 4px;
`
const Loader = styled.div`
    margin-left: 46%;
`
const BoardOwner = styled.span`
    font-size: 12rem;
`
const Wrap = styled.div`
    display: flex;
    flex-direction: column;
    align-self: flex-end;

    align-items: center;
`
const Usertag = styled.li`
    padding: 3rem;
    background-color: #ffffff;
    color: #000000;
    width: fit-content;
    height: fit-content;
    border-radius: 2px;
    font-weight: 400;
    display: flex;
    gap: 5rem;
    align-items: center;
`
const UserTagList = styled.ul`
    display: flex;
    gap: 5rem;
    width: inherit;
    flex-wrap: wrap;
    padding: auto;
    padding-top: -2rem;
`
export default ShareBoard
