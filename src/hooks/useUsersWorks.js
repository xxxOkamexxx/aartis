import { useParams } from 'react-router-dom'
import { useFirestoreQueryData } from '@react-query-firebase/firestore'
import { collection, query, where, orderBy } from 'firebase/firestore'
import { db } from '../firebase/config'
import { useAuthContext } from '../context/AuthContext'

/**
 * get specific users works
 */

const useUsersWorks = (id) => {
	const { currentUser } = useAuthContext()


	// create ref to collection 'works'
	const collectionRef = collection(db, 'work')

	// create queryKey based on whether all works or only the current user's works are requested
	const queryKey = ['work', { user: id }]
		console.log('go hooks', id)

	// create query for collectionRef, order result in reverse cronological order
	const queryRef =  query(collectionRef, where('user', '==', id), orderBy('created', 'desc'))
		

	// run query
	const worksQuery = useFirestoreQueryData(queryKey, queryRef, {
		idField: 'id',
		subscribe: true,
	})

	return worksQuery
}

export default useUsersWorks
