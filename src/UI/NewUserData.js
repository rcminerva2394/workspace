import { doc, setDoc, collection } from 'firebase/firestore'
import { db } from '../firebase.config'
import { sampleTaskItem } from './exampleBoards'

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
const setData = async (authData) => {
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

        await setDoc(subBoards, {
            name: 'Sample Board Title',
            id: subBoards.id,
            members: { [uid]: 'owner' },
        })

        console.log(subBoards.id)

        // Subcollection Todo
        const subTodo = doc(
            collection(db, 'users', uid, 'boards', subBoards.id, 'todo')
        )

        await setDoc(subTodo, {
            ...sampleTaskItem,
            id: subTodo.id,
            status: 'Todo',
            members: { [uid]: 'owner' },
        })

        // subTaskFunc(uid, subBoards.id, 'todo', subTodo.id)

        // Subcollection Doing
        const subDoing = doc(
            collection(db, 'users', uid, 'boards', subBoards.id, 'doing')
        )

        await setDoc(subDoing, {
            ...sampleTaskItem,
            id: subDoing.id,
            status: 'Doing',
            members: { [uid]: 'owner' },
        })

        // subTaskFunc(uid, subBoards.id, 'doing', subTodo.id)

        // Subcollection Done
        const subDone = doc(
            collection(db, 'users', uid, 'boards', subBoards.id, 'done')
        )
        await setDoc(subDone, {
            ...sampleTaskItem,
            id: subDone.id,
            status: 'Done',
            members: { [uid]: 'owner' },
        })

        // subTaskFunc(uid, subBoards.id, 'done', subTodo.id)
    } catch (err) {
        console.log('Error setting a document', err)
    }
}

export default setData
