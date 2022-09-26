import { collection, getDocs, query, where } from 'firebase/firestore'
import { db, auth } from '../firebase.config'

// get the initial boards from the firestore
const getBoards = async (setBoards) => {
    const { uid } = auth.currentUser

    try {
        const boards = []
        const queryBoards = query(
            collection(db, 'users', uid, 'boards'),
            where(`members.${uid}`, '==', 'owner' || 'member')
        )
        const querySnapshot = await getDocs(queryBoards)
        querySnapshot.forEach((doc) => {
            console.log(doc.id, ' => ', doc.data())
            boards.push(doc.data())
        })
        console.log(boards)
        setBoards(boards)
    } catch (err) {
        console.log(err)
        console.log(err.code)
    }
}

export default getBoards