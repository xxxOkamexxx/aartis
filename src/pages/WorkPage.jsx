import React from 'react'
import { Link, useParams } from 'react-router-dom'

// hooks
import useWork from '../hooks/useWork'


// bootstrap
import { Button, Image } from 'react-bootstrap'


import { useAuthContext } from '../context/AuthContext'



const WorkPage = () => {
  const { currentUser } = useAuthContext()

  const { id } = useParams()
  const { data, loading } = useWork(id)

  
  console.log(data.creator_id)

  return (
    <>
    
      {/* image */}
      <div>

        <Image src={data.url}/>

      </div>
      {/* image end */}



      {/* creator info */}
      <div>  
          <Image
            src={data ?  data.creator_avatar : ''}
            height={70}
            width={70}
            roundedCircle
            style={{backgroundColor:'#fcfcfc'}}
          /> 
      
          <h3>{data.creator_name}</h3>
      
          <div>
            <h2>{data.title}</h2>
          </div>          
      
      </div> 
      {/* creatorinfo end */}
      
    </>
  )
}

export default WorkPage
