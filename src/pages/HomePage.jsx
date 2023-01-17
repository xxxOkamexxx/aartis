import React, { useEffect, useState } from 'react'

import { Button } from 'react-bootstrap'

//import useWorks from '../hooks/useWorks'
import useWorks from '../hooks/useWorks'

import ImageBox from '../components/HomeComponents/ImageBox'



const HomePage = () => {
  const [pageQuery, setPageQuery] = useState(4)

  // get works
  let imageQuery = useWorks(pageQuery)
  

  return (
    <>
      <div >
        <ImageBox query={imageQuery} setPageQuery={setPageQuery} pageQuery={pageQuery}/>
      </div>
    </>
  )
}

export default HomePage