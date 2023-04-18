import { useEffect, useState } from 'react'

import { useFirestoreQueryData } from '@react-query-firebase/firestore'
import { collection, query, where, orderBy, limit, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase/config'
import { useAuthContext } from '../context/AuthContext'

/**
 * get all users works
 */

const useWorks = (page) => {
	const [data, setData] = useState([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
    // create ref to collection 'works'
	const collectionRef = collection(db, 'work')

	// create queryKey based on whether all works 
	const queryKey = ['work', page]

	// create query for collectionRef, order result in reverse cronological order
	const queryRef = query(collectionRef, orderBy('created', 'desc'), limit(page))

	// subscribe to changes in collection
	const unsubscribe = onSnapshot(queryRef, (snapshot) => {
		// got a new snapshot 
		const docs = snapshot.docs.map(doc => {
			return {
				id: doc.id,
				...doc.data(),
			}
		})

		setData(docs)
		setLoading(false)
	})

	// // run query
	// const worksQuery = useFirestoreQueryData(queryKey, queryRef, {
	// 	idField: 'id',
	// },
	// {
	// 	refetchOnMount: "always",
	// })
	
	return unsubscribe
  },[page])

	return {
		data, loading
	}

}

export default useWorks
