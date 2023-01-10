import React from 'react'
import { useLocation } from 'react-router-dom'

import { collection, query, where , orderBy} from 'firebase/firestore'
import { db } from '../firebase/config'

import SearchForm from '../components/SearchForm'
import { useFirestoreQueryData } from '@react-query-firebase/firestore'


const SearchPage = () => {
  const queryString = useLocation().search
  const queryParams = new URLSearchParams(queryString)
  const q = queryParams.get('q')

  
  const collectionRef = collection(db, 'work')

  const queryKey = ['work']

  const queryRef = query(collectionRef, where('tags', 'array-contains', q))

  const searchQuery = useFirestoreQueryData(queryKey,
    queryRef,{
      idField: 'id',
    })
  
  
  console.log('query', searchQuery)

  return (
    <div>
      <SearchForm />
      <h2>Search Result for: {q}</h2>
      
    </div>
  )
}

export default SearchPage
