import { useParams } from 'react-router-dom'
import { useFirestoreQueryData } from '@react-query-firebase/firestore'
import { collection, query, where, orderBy, limit } from 'firebase/firestore'
import { db } from '../firebase/config'
import { useAuthContext } from '../context/AuthContext'
import { useEffect } from 'react'

/**
 * get all users works
 */

const useWorks = (page) => {
	const { currentUser } = useAuthContext()


	// create ref to collection 'works'
	const collectionRef = collection(db, 'work')

	// create queryKey based on whether all works 
	const queryKey = ['work', page]

	// create query for collectionRef, order result in reverse cronological order
	const queryRef = query(collectionRef, orderBy('created', 'desc'), limit(page))



	// run query
	const worksQuery = useFirestoreQueryData(queryKey, queryRef, {
		idField: 'id',
	},
	{
		refetchOnMount: "always",
	})
	
	return worksQuery

}

export default useWorks
