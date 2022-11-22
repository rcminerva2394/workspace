import { doc, setDoc, collection } from 'firebase/firestore'
import { db, auth } from '../../firebase.config'
import { sampleTaskItem } from '../exampleData'

export const addBoard = async (title, setBoards) => {
    const { uid } = auth.currentUser

    // Subcollection board
    const boardsCol = doc(collection(db, 'boards'))

    const boardObj = {
        name: title,
        id: boardsCol.id,
        members: { [uid]: 'owner' },
    }

    await setDoc(boardsCol, boardObj)

    // Subcollection Todo
    const subTodo = doc(collection(db, 'boards', boardObj.id, 'todo'))

    const todoObj = {
        ...sampleTaskItem,
        id: subTodo.id,
        status: 'todo',
        members: { [uid]: 'owner' },
    }
    await setDoc(subTodo, todoObj)

    setBoards((prevState) => {
        return [...prevState, boardObj]
    })

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

    setBoards((prevState) => {
        const updatedBoards = prevState.map((board) => {
            if (board.id === boardObj.id) {
                return {
                    ...board,
                    todo: [todoObj],
                    doing: [doingObj],
                    done: [doneObj],
                }
            }
            return board
        })
        return updatedBoards
    })
}

export const setNewCardItem = async (
    boardId,
    boardStatus,
    cardTitle,
    setBoards
) => {
    const { uid } = auth.currentUser

    const cardRef = doc(collection(db, 'boards', boardId, boardStatus))

    const cardObj = {
        ...sampleTaskItem,
        title: cardTitle,
        id: cardRef.id,
        status: boardStatus,
        members: { [uid]: 'owner' },
    }
    await setDoc(cardRef, cardObj)

    setBoards((prevState) => {
        const updatedBoards = prevState.map((board) => {
            if (board.id === boardId) {
                return {
                    ...board,
                    [boardStatus]: [...board[boardStatus], cardObj],
                }
            }
            return board
        })
        return updatedBoards
    })
}

// export const updateMembers = (updatedMembers, board, boardtype) => {
//     // board
//     const boardTypeRef = doc(db, 'boards', board.id, boardtype)
//     const updateBoard = async () => {
//         await updateDoc(boardRef, updatedMembers)
//     }
// }

// also to boardtypes, subtasks, and comments

// Delete all subtasks from the firestore (firestore doesn't allow deleting entire subcollection)
// const delSubtasks = async () => {
//     await Promise.all(
//         card.subtasks.forEach(async (subtask) => {
//             await deleteDoc(
//                 doc(
//                     db,
//                     'boards',
//                     boardId,
//                     boardStatus,
//                     card.id,
//                     'subtasks',
//                     subtask.id
//                 )
//             )
//         })
//     )
