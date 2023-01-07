import React from 'react'

//import useWorks from '../hooks/useWorks'
import useWorks from '../hooks/useWorks'


import ImageBox from '../components/HomeComponents/ImageBox'

const HomePage = () => {
  // get works
  const imageQuery = useWorks()

  return (
    <>
      <div >
        <ImageBox query={imageQuery}/>
      </div>
    </>
  )
}

export default HomePage