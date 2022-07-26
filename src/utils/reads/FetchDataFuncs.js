import { collection, getDocs, query, where } from 'firebase/firestore'
import { db, auth } from '../../firebase.config'

// get the initial boards from the firestore
export const getBoards = async (updateContext) => {
    const { uid } = auth.currentUser
    try {
        const boards = []
        const queryBoards = query(
            collection(db, 'boards'),
            where(`members.${uid}`, '==', 'owner')
        )
        const querySnapshot = await getDocs(queryBoards)
        querySnapshot.forEach((doc) => {
            boards.push(doc.data())
        })
        updateContext([...boards])
    } catch (err) {
        console.log(err)
    }
}

// function to fetch the Board type (Todos, Doings, Dones and its subtasks and comments)
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
                // Fetch Subtasks
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

                // Fetch comments if there are too :)
                const queryComments = query(
                    collection(
                        db,
                        'boards',
                        boardId,
                        boardStatus,
                        doc.id,
                        'comments'
                    ),
                    where(`members.${uid}`, '==', 'owner' || 'member')
                )
                const queryCommentsSnapshot = await getDocs(queryComments)
                const commentList = []
                queryCommentsSnapshot.forEach((comment) => {
                    const commentObj = {
                        ...comment.data(),
                    }

                    commentList.push(commentObj)
                })

                return {
                    ...doc,
                    subtasks: subtasksList,
                    comments: commentList,
                }
            })
        )

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
    } catch (err) {
        console.log(err)
        console.log(err.message)
    }
}
