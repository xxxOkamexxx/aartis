import { useState, useEffect } from 'react'
import { Card, Container, Image } from 'react-bootstrap'

import { doc, getDoc } from "firebase/firestore";
import { db } from '../../firebase/config'

import useUser from '../../hooks/useUser'

import moment from 'moment';
import BeatLoader from 'react-spinners/BeatLoader'


const AllCommentsList = ({data}) => {
  const [isUser, setIsUser] = useState()
  const [isLoading, setIsLoading] = useState(false)

  
  useEffect(()=>{
    if(!data){
      setIsLoading(true)
    }
    setIsLoading(false)
    console.log('data', data)
  
  },[data])
 

  return (
    <Container className='mb-5'>
 
        { data.comment == 0 &&
          
          <h3 className='mb-5'>No comments yet. Be the first to send a comment!</h3>
        }

        { isLoading && 
          <div id="initial-loader">
            <BeatLoader color='#AD9510'/>
          </div>
        }

        { data.comment && !isLoading &&
          <>
            { data.comment.map(come => 
              <Card 
                key={come.id} 
                className='comment-card p-3 mb-1 work-info-box'
              >

                {/* sender */}
                <div >
                  <Image 
                    src={come.photoURL}
                    width='30px !important'
                    height='30px !important'
                    roundedCircle
                    style={{ backgroundImage: `url("https://via.placeholder.com/500")` }}
                  />
                  <span className='ms-2'>{come.displayName}</span>

                </div>

                {/* message */}
                <Card className='mt-2 p-2 mb-2'>
                  <p style={{color: 'black'}}>{come.content}</p> 

                </Card>
                    <p className='my-auto text-end display-date' style={{color: 'black'}}>
                      {moment( come.created.toMillis() ).format('YYYY-MM-DD HH:mm:ss')}
                    </p>

              </Card>
            )}
          </>
        }
 
    </Container>
  )
}

export default AllCommentsList