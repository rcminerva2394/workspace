import { doc, setDoc, collection } from 'firebase/firestore'
import { db } from '../../firebase.config'
import { sampleTaskItem } from '../exampleData'

// For new users, a function to create a collection of boards with subcollections todos, doings, and done
const setData = async (authData, setBoards) => {
    const { uid, email, displayName, photoURL, emailVerified, metadata } =
        authData

    // Set the creation time if metadata creation time is not available
    const today = new Date()

    try {
        const docRef = doc(db, 'users', uid)
        const userObj = {
            userId: uid,
            name: displayName,
            userEmail: email,
            photo: photoURL,
            isEmailVerified: emailVerified,
            created: metadata.creationTime || today,
            lastSignIn: metadata.lastSignInTime,
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
