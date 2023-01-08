import { useParams } from 'react-router-dom'
import { useFirestoreQueryData } from '@react-query-firebase/firestore'
import { collection, query, where, orderBy } from 'firebase/firestore'
import { db } from '../firebase/config'
import { useAuthContext } from '../context/AuthContext'

/**
 * get all users works
 */

const useWorks = () => {
	const { currentUser } = useAuthContext()


	// create ref to collection 'works'
	const collectionRef = collection(db, 'work')

	// create queryKey based on whether all works 
	const queryKey = ['work']

	// create query for collectionRef, order result in reverse cronological order
	const queryRef = query(collectionRef, orderBy('created', 'desc'))

	// run query
	const worksQuery = useFirestoreQueryData(queryKey, queryRef, {
		idField: 'id',
		subscribe: true,
	})

	return worksQuery
}

export default useWorks
