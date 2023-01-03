import { useFirestoreQueryData } from '@react-query-firebase/firestore'
import { collection, query, where, orderBy } from 'firebase/firestore'
import { db } from '../firebase/config'
import { useAuthContext } from '../context/AuthContext'

const useWorks = (options = {}) => {
	const { currentUser } = useAuthContext()

	// create ref to collection 'works'
	const collectionRef = collection(db, 'work')

	// create queryKey based on whether all works or only the current user's works are requested
	const queryKey = options.fetchOnlyCurrentUser
		? ['work', { user: currentUser.uid }]
		: ['work']

	// create query for collectionRef, order result in reverse cronological order
	const queryRef = options.fetchOnlyCurrentUser
		? query(collectionRef, where('user', '==', currentUser.uid), orderBy('created', 'desc'))
		: query(collectionRef, orderBy('created', 'desc'))

	// run query
	const worksQuery = useFirestoreQueryData(queryKey, queryRef, {
		idField: 'id',
		subscribe: true,
	})

	return worksQuery
}

export default useWorks
