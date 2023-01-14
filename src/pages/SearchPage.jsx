import React, { useEffect, useState } from 'react'
import { useSearchParams, useLocation } from 'react-router-dom'

import SearchImageBox from '../components/SearchResultComponents/SearchImageBox'
import useSearchWorks from '../hooks/useSearchWorks'


const SearchPage = () => {
  const [search, setSearch] = useState('')
  const queryString = useLocation().search
  const queryParams = new URLSearchParams(queryString)
  const q = queryParams.get('q') ?? ''

  console.log(q)

  const searchQuery = useSearchWorks(q) // Not reload

  useEffect(() => {
    console.log('new q:', q )
    setSearch(q)
  },[q])

  return (
    <>
      <div>
        <SearchImageBox query={searchQuery} search={search}/>
      </div>
      
    </>
  )
}

export default SearchPage
