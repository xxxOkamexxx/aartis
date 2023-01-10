import { useParams } from 'react-router-dom'
import { useFirestoreQueryData } from '@react-query-firebase/firestore'
import { collection, query, where, orderBy } from 'firebase/firestore'
import { db } from '../firebase/config'
import { useAuthContext } from '../context/AuthContext'

/**
 * get all users works
 */

const useSearchWorks = (term) => {


	// create ref to collection 'works'
	const collectionRef = collection(db, 'work')

	// create queryKey based on whether all works 
	const queryKey = ['work', term]

	// create query for collectionRef, order result in reverse cronological order
	let queryRef 
		if(term){
			query(collectionRef, where('tags', '==', term),orderBy('created', 'desc'))
		}else{
			query(collectionRef, orderBy('created', 'desc'))
		}

	// run query
	const worksQuery = useFirestoreQueryData(queryKey, queryRef, {
		idField: 'id',
		subscribe: true,
	})

	return worksQuery
}

export default useSearchWorks