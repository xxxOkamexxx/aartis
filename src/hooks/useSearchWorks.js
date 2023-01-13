import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useFirestoreQueryData } from '@react-query-firebase/firestore'
import { collection, query, where, orderBy } from 'firebase/firestore'
import { db } from '../firebase/config'
import { useAuthContext } from '../context/AuthContext'

/**
 * get all users works
 */

const useSearchWorks = (q) => {

	 /**
   *  Hook to get works from firebase with query constraints
   */

	const collectionRef = collection(db, 'work')

  const queryKey = ['work', {tags: q}]
  let queryRef = q !=='' 
    ? query(collectionRef, where('tags', 'array-contains', q), orderBy('created', 'desc'))
    : query(collectionRef, orderBy('created', 'desc'))

  const searchQuery = useFirestoreQueryData(queryKey,
    queryRef,{
      idField: 'id',
      subscribe: true,
    },{
      refetchOnMount: "always",
    }) 

	return searchQuery
}

export default useSearchWorks
