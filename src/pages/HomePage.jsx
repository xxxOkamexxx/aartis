import React, { useEffect, useState } from 'react'

import { Button } from 'react-bootstrap'

//import useWorks from '../hooks/useWorks'
import useWorks from '../hooks/useWorks'

import ImageBox from '../components/HomeComponents/ImageBox'



const HomePage = () => {
  const [pageQuery, setPageQuery] = useState(4)

  // get works
  let imageQuery = useWorks(pageQuery)
  
  //console.log(imageQuery)

  // useEffect(() => {
  //   console.log('pageQuery', pageQuery)
  // },[pageQuery])

  
  // const updatePost = async() => {
  //   setPage(page + 4)
  // }


  return (
    <>
      <div >
        <ImageBox query={imageQuery} setPageQuery={setPageQuery} />
        {/* <Button 
          onClick={updatePost}
          className='btn-secondary align-center'
        >
          See more...
        </Button> */}
      </div>
    </>
  )
}

export default HomePage