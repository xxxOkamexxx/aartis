import { useState, useEffect } from 'react'

import { useFirestoreQueryData } from '@react-query-firebase/firestore'
import { collection, query, where, orderBy } from 'firebase/firestore'
import { db } from '../firebase/config'

import useStreamCollection from '../hooks/useStreamCollection'

const getOptions = () => {
  const [options, setOptions] = useState([])
	const {data} = useStreamCollection('work')


  // create ref to collection 'works'
	const collectionRef = collection(db, 'work')

	// create queryKey based on whether all works 
	const queryKey = ['work']

	// create query for collectionRef, order result in reverse cronological order
	const queryRef = query(collectionRef)

	// run query
	const worksQuery = useFirestoreQueryData(queryKey, queryRef, {
		idField: 'id',
		subscribe: true,
	})


  
  const getTags = async() => {
		if(data){
			const tags = data
			.map(work => work.tags)
			.flat(1)
			.filter((value, index, self) => self.indexOf(value) === index)
			setOptions(tags)
		}
	}

  //get tags
	useEffect(() => {			
		getTags()
	},[query])
 
  return {
    options,
  }
}

export default getOptions
