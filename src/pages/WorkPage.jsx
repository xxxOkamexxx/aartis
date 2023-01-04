import React from 'react'
import { Link, useParams } from 'react-router-dom'

// hooks
import useWork from '../hooks/useWork'
import useUser from '../hooks/useUser'

// bootstrap
import { Button, Image } from 'react-bootstrap'

import { doc, getDoc } from "firebase/firestore";
import { db } from '../firebase/config'

import { useAuthContext } from '../context/AuthContext'



const WorkPage = () => {
  const { currentUser } = useAuthContext()

  const { id } = useParams()
  const { data, loading } = useWork(id)

  // get creators image
  const docRef = doc(db, "user", `${data.author_id}`);
  const docSnap = getDoc(docRef);

  console.log("Document data:", docSnap);
 
  
  
  console.log(data.author_id)

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
            src={data ?  data.photoURL : ''}
            height={70}
            width={70}
            roundedCircle
            style={{backgroundColor:'#fcfcfc'}}
          /> 
      
          <h3>{data.author_name}</h3>
      
          <div>
            <h2>{data.title}</h2>
          </div>          
      
      </div> 
      {/* creatorinfo end */}
      
    </>
  )
}

export default WorkPage
