import { doc, setDoc, deleteDoc, updateDoc } from 'firebase/firestore'
import { db } from '../firebase.config'

// function to delete subcollections
export const deleteSubCollection = async (
    boardId,
    boardType,
    cardId,
    subColl,
    subCollName
) => {
    await Promise.all(
        subColl.forEach(async (subCollItem) => {
            await deleteDoc(
                doc(
                    db,
                    'boards',
                    boardId,
                    boardType,
                    cardId,
                    subCollName,
                    subCollItem.id
                )
            )
        })
    )
}

// function to set subscollection for comments and subtasks
export const setSubCollection = async (
    boardId,
    boardType,
    cardId,
    subColl,
    subCollName
) => {
    await Promise.all(
        subColl.map(async (subCollItem) => {
            await setDoc(
                doc(
                    db,
                    'boards',
                    boardId,
                    boardType,
                    cardId,
                    subCollName,
                    subCollItem.id
                ),
                subCollItem
            )
        })
    )
}

// function to update the members for boardtypes
export const updateMembers = async (
    boardTypeSubColl,
    boardId,
    boardType,
    updatedMembers
) => {
    await Promise.all(
        boardTypeSubColl.map(async (boardTypeSubCollItem) => {
            await updateDoc(
                doc(db, 'boards', boardId, boardType, boardTypeSubCollItem.id),
                updatedMembers
            )

            boardTypeSubCollItem.subtasks.map(async (subtask) => {
                await updateDoc(
                    doc(
                        db,
                        'boards',
                        boardId,
                        boardType,
                        boardTypeSubCollItem.id,
                        'subtasks',
                        subtask.id
                    ),
                    updatedMembers
                )
            })

            boardTypeSubCollItem.comments.map(async (commentItem) => {
                await updateDoc(
                    doc(
                        db,
                        'boards',
                        boardId,
                        boardType,
                        boardTypeSubCollItem.id,
                        'comments',
                        commentItem.id
                    ),
                    updatedMembers
                )
            })
        })
    )
}
