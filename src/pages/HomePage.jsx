import React, { useEffect, useState } from 'react'

import { Button } from 'react-bootstrap'

//import useWorks from '../hooks/useWorks'
import useWorks from '../hooks/useWorks'


import ImageBox from '../components/HomeComponents/ImageBox'

const HomePage = () => {
  const [page, setPage] = useState(4)
  
  // get works
  const imageQuery = useWorks(page)

  
  const updatePost = () => {
    setPage(page + 4)
  }


  console.log(page)

  // useEffect(() => {
  //   setPage(4)
  // },[])

  return (
    <>
      <div >
        <ImageBox query={imageQuery}/>
        <Button onClick={updatePost}>See more...</Button>
      </div>
    </>
  )
}

export default HomePage