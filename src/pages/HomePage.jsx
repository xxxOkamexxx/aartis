import React, { useEffect, useState } from 'react'

import { Button } from 'react-bootstrap'

//import useWorks from '../hooks/useWorks'
import useWorks from '../hooks/useWorks'
import useStreamCollection from '../hooks/useStreamCollection'

import ImageBox from '../components/HomeComponents/ImageBox'



const HomePage = () => {
  const [pageQuery, setPageQuery] = useState(4)
  const { data } = useStreamCollection('work')


  // get works
  let {data:imageQuery} = useWorks(pageQuery)

  //console.log(data)
  console.log(pageQuery)
  console.log(imageQuery)

  return (
    <>
      <div >
        <ImageBox 
          query={imageQuery} 
          setPageQuery={setPageQuery} 
          pageQuery={pageQuery}
          data={data}
        />
      </div>
    </>
  )
}

export default HomePage