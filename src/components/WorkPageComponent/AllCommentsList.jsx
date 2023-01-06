import React from 'react'
import { Card, Container, Image } from 'react-bootstrap'

import moment from 'moment';

const AllCommentsList = ({data}) => {


  return (
    <Container>
 
        { data.comment == 0 &&
          
          <h3>No comments yet. Be the first to send a comment!</h3>
        }

        { data.comment &&
          <>
            { data.comment.map(come => 
              <Card 
                key={come.id} 
                className='comment-card p-2 mb-1'
              >

                {/* sender */}
                <div>
                  <Image 
                    src={come ?  come.photoURL : ''}
                    width='30px !important'
                    height='30px !important'
                    roundedCircle
                  />
                  <span className='ms-2'>{come.displayName}</span>

                </div>

                {/* message */}
                <div>
                  <p>{come.content}</p> 
                    <p>
                      {moment( come.created.toMillis() ).format('YYYY-MM-DD')}
                    </p>

                </div>

              </Card>
            )}
          </>
        }
 
    </Container>
  )
}

export default AllCommentsList