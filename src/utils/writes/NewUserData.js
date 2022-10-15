import { doc, setDoc, collection } from 'firebase/firestore'
import { db } from '../../firebase.config'
import { sampleTaskItem } from '../exampleData'

// const subTaskFunc = (uid, boardId, type, taskId) => {
//     const subtasks = doc(
//         collection(
//             db,
//             'users',
//             uid,
//             'boards',
//             boardId,
//             type,
//             taskId,
//             'subtasks'
//         )
//     )

//     return subtasks
// }

// For new users, a function to create a user document including the subcollections of boards, todos, doings, and done
const setData = async (authData, setBoards) => {
    const { uid, email, displayName, photoURL, emailVerified, metadata } =
        authData

    try {
        const docRef = doc(db, 'users', uid)

        // Set it
        await setDoc(
            docRef,
            {
                userId: uid,
                name: displayName,
                userEmail: email,
                photo: photoURL,
                isEmailVerified: emailVerified,
                created: metadata.creationTime || null,
                lastSignIn: metadata.lastSignInTime,
            },
            { merge: true }
        )

        // Subcollection board
        const subBoards = doc(collection(db, 'users', uid, 'boards'))

        const boardObj = {
            name: 'Sample Board Title',
            id: subBoards.id,
            members: { [uid]: 'owner' },
        }

        await setDoc(subBoards, boardObj)

        console.log(subBoards.id)

        // Subcollection Todo
        const subTodo = doc(
            collection(db, 'users', uid, 'boards', subBoards.id, 'todo')
        )

        const todoObj = {
            ...sampleTaskItem,
            id: subTodo.id,
            status: 'todo',
            members: { [uid]: 'owner' },
        }
        await setDoc(subTodo, todoObj)

        // subTaskFunc(uid, subBoards.id, 'todo', subTodo.id)

        // Subcollection Doing
        const subDoing = doc(
            collection(db, 'users', uid, 'boards', subBoards.id, 'doing')
        )

        const doingObj = {
            ...sampleTaskItem,
            id: subDoing.id,
            status: 'doing',
            members: { [uid]: 'owner' },
        }
        await setDoc(subDoing, doingObj)

        // subTaskFunc(uid, subBoards.id, 'doing', subTodo.id)

        // Subcollection Done
        const subDone = doc(
            collection(db, 'users', uid, 'boards', subBoards.id, 'done')
        )

        const doneObj = {
            ...sampleTaskItem,
            id: subDone.id,
            status: 'done',
            members: { [uid]: 'owner' },
        }

        await setDoc(subDone, doneObj)

        // subTaskFunc(uid, subBoards.id, 'done', subTodo.id)

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
