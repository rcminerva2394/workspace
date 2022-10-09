import { doc, setDoc, collection } from 'firebase/firestore'
import { db, auth } from '../../firebase.config'
import { sampleTaskItem } from '../exampleData'

export const addBoard = async (title, setBoards) => {
    const { uid } = auth.currentUser

    // Subcollection board
    const subBoards = doc(collection(db, 'users', uid, 'boards'))

    const boardObj = {
        name: title,
        id: subBoards.id,
        members: { [uid]: 'owner' },
    }

    await setDoc(subBoards, boardObj)

    // Subcollection Todo
    const subTodo = doc(
        collection(db, 'users', uid, 'boards', subBoards.id, 'todo')
    )

    const todoObj = {
        ...sampleTaskItem,
        id: subTodo.id,
        status: 'Todo',
        members: { [uid]: 'owner' },
    }
    await setDoc(subTodo, todoObj)

    // Subcollection Doing
    const subDoing = doc(
        collection(db, 'users', uid, 'boards', subBoards.id, 'doing')
    )

    const doingObj = {
        ...sampleTaskItem,
        id: subDoing.id,
        status: 'Doing',
        members: { [uid]: 'owner' },
    }

    await setDoc(subDoing, doingObj)

    // Subcollection Done
    const subDone = doc(
        collection(db, 'users', uid, 'boards', subBoards.id, 'done')
    )

    const doneObj = {
        ...sampleTaskItem,
        id: subDone.id,
        status: 'Done',
        members: { [uid]: 'owner' },
    }
    await setDoc(subDone, doneObj)

    setBoards((prevState) => {
        return [
            ...prevState,
            {
                ...boardObj,
                todo: [todoObj],
                doing: [doingObj],
                done: [doneObj],
            },
        ]
    })
}

export const setBoardType = () => {}
