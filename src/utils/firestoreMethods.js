import { doc, setDoc, deleteDoc } from 'firebase/firestore'
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
