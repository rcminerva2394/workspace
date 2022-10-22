import { collection, getDocs, query, where } from 'firebase/firestore'
import { db, auth } from '../../firebase.config'

// get the initial boards from the firestore
export const getBoards = async (updateContext) => {
    const { uid } = auth.currentUser
    try {
        const boards = []
        const queryBoards = query(
            collection(db, 'boards'),
            where(`members.${uid}`, '==', 'owner' || 'member')
        )
        const querySnapshot = await getDocs(queryBoards)
        querySnapshot.forEach((doc) => {
            console.log(doc.id, ' => ', doc.data())
            boards.push(doc.data())
        })
        console.log(boards)
        updateContext([...boards])
    } catch (err) {
        console.log(err)
    }
}

// function to fetch the Board type (Todos, Doings, Dones)
export const getBoardType = async (boardId, boardStatus, updateContext) => {
    const { uid } = auth.currentUser
    try {
        const queryBoardType = query(
            collection(db, 'boards', boardId, boardStatus),
            where(`members.${uid}`, '==', 'owner' || 'member')
        )
        const querySnapshot = await getDocs(queryBoardType)
        const boardTypeTasks = []
        querySnapshot.forEach((docTask) => {
            boardTypeTasks.push(docTask.data())
        })

        // Fetch subtasks if there are too :)
        const boardType = await Promise.all(
            boardTypeTasks.map(async (doc) => {
                const querySubtasks = query(
                    collection(
                        db,
                        'boards',
                        boardId,
                        boardStatus,
                        doc.id,
                        'subtasks'
                    ),
                    where(`members.${uid}`, '==', 'owner' || 'member')
                )
                const querySubtasksSnapshot = await getDocs(querySubtasks)
                const subtasksList = []
                querySubtasksSnapshot.forEach((task) => {
                    subtasksList.push(task.data())
                })
                return {
                    ...doc,
                    subtasks: subtasksList,
                }
            })
        )
        console.log(boardTypeTasks)

        // Update the Board Context which includes the board types
        updateContext((prevState) => {
            const updatedBoards = prevState.map((project) => {
                if (project.id === boardId) {
                    return {
                        ...project,
                        [boardStatus]: boardType,
                    }
                }

                return project
            })
            return updatedBoards
        })

        console.log(boardType)
    } catch (err) {
        console.log(err)
        console.log(err.message)
    }
}
