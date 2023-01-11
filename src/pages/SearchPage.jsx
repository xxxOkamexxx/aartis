import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

import { collection, query, where , orderBy} from 'firebase/firestore'
import { db } from '../firebase/config'
import { useFirestoreQueryData } from '@react-query-firebase/firestore'

import { Container, Row, Col } from 'react-bootstrap'

import SearchForm from '../components/SearchForm'
import AllWorks from '../components/HomeComponents/AllWorks'
import useSearchWorks from '../hooks/useSearchWorks'


const SearchPage = () => {
  const queryString = useLocation().search
  const queryParams = new URLSearchParams(queryString)
  const q = queryParams.get('q')

  //const { data } = useSearchWorks(q)
  
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
  console.log('query', searchQuery.data)


  useEffect(() => {
    // console.log('fired')
    // if(!data){
    // return
    // }
    
  },[q])



  return (
    <Container>
      <SearchForm />
      <h2>Search Result for: {q}</h2>
      <p>{searchQuery.data?.length} items found</p>

      <Row xs={1} sm={2} md={3} lg={4}>
        {searchQuery.data && searchQuery.data.map(image => (
          <Col key={image.id} className="d-flex mb-4">
        
              <AllWorks image={image} />

          </Col>
        ))}
      </Row>
      
    </Container>
  )
}

export default SearchPage
