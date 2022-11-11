import { doc, setDoc, collection } from 'firebase/firestore'
import { db } from '../../firebase.config'
import { sampleTaskItem } from '../exampleData'

// For new users, a function to create a collection of boards with subcollections todos, doings, and done
const setData = async (authData, setBoards) => {
    const { uid, email, displayName, photoURL, emailVerified, metadata } =
        authData

    // Set the creation time if metadata creation time is not available
    const today = new Date()

    // For User initials
    // Check if displayName is one word or more
    let initialsName
    if (displayName === null) {
        initialsName = email[0].toUpperCase()
    } else if (/\s/g.test(displayName) === true) {
        initialsName = displayName
            .split(' ')
            .map((word) => word[0])
            .join('')
            .toUpperCase()
    } else if (/\s/g.test(displayName) === false) {
        initialsName = displayName[0].toUpperCase()
    }

    // For extracting the names from the email
    const name = email.split('@')[0].split(/[^a-z]/i)

    // For namearray that I will use for searching users later when another user wants to invite or add a user
    const arr = []
    const e = (displayName || name.join(' ')).toLowerCase()

    /* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */
    for (let i = 1; i < e.length + 1; i++) {
        arr.push(e.substring(0, i))
    }

    const capitalizedName = name
        .map((nameItem) => {
            return nameItem.charAt(0).toUpperCase() + nameItem.slice(1)
        })
        .join(' ')

    try {
        const docRef = doc(db, 'users', uid)
        const userObj = {
            userId: uid,
            name: displayName || capitalizedName,
            userEmail: email,
            photo: photoURL,
            initials: initialsName,
            isEmailVerified: emailVerified,
            created: metadata.creationTime || today,
            lastSignIn: metadata.lastSignInTime,
            nameArray: arr,
        }

        // Set it
        await setDoc(docRef, userObj, { merge: true })

        // board collection
        const boardCol = doc(collection(db, 'boards'))

        const boardObj = {
            name: 'Sample Board Title',
            id: boardCol.id,
            members: { [uid]: 'owner' },
        }

        await setDoc(boardCol, boardObj)

        // Subcollection Todo
        const subTodo = doc(collection(db, 'boards', boardObj.id, 'todo'))

        const todoObj = {
            ...sampleTaskItem,
            id: subTodo.id,
            status: 'todo',
            members: { [uid]: 'owner' },
        }
        await setDoc(subTodo, todoObj)

        // Subcollection Doing
        const subDoing = doc(collection(db, 'boards', boardObj.id, 'doing'))

        const doingObj = {
            ...sampleTaskItem,
            id: subDoing.id,
            status: 'doing',
            members: { [uid]: 'owner' },
        }
        await setDoc(subDoing, doingObj)

        // Subcollection Done
        const subDone = doc(collection(db, 'boards', boardObj.id, 'done'))

        const doneObj = {
            ...sampleTaskItem,
            id: subDone.id,
            status: 'done',
            members: { [uid]: 'owner' },
        }

        await setDoc(subDone, doneObj)

        setBoards([
            {
                ...boardObj,
                todo: [todoObj],
                doing: [doingObj],
                done: [doneObj],
            },
        ])
    } catch (err) {
        console.log('Error setting a document', err)
    }
}

export default setData
