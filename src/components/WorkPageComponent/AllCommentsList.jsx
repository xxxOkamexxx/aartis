import React from 'react'
import { Card, Container, Image } from 'react-bootstrap'

import moment from 'moment';

const AllCommentsList = ({data}) => {


  return (
    <Container className='mb-5'>
 
        { data.comment == 0 &&
          
          <h3 className='mb-5'>No comments yet. Be the first to send a comment!</h3>
        }

        { data.comment &&
          <>
            { data.comment.map(come => 
              <Card 
                key={come.id} 
                className='comment-card p-3 mb-1'
              >

                {/* sender */}
                <div >
                  <Image 
                    src={come ?  come.photoURL : ''}
                    width='30px !important'
                    height='30px !important'
                    roundedCircle
                    style={{ backgroundImage: `url("https://via.placeholder.com/500")` }}
                  />
                  <span className='ms-2'>{come.displayName}</span>

                </div>

                {/* message */}
                <Card className='mt-2 p-2 mb-2'>
                  <p>{come.content}</p> 

                </Card>
                    <p className='my-auto text-end display-date'>
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