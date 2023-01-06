import React from 'react'
import { Card, Container, Image } from 'react-bootstrap'

const AllCommentsList = ({data}) => {
  return (
    <>
      { !data.comment &&
        <h3>No comments yet. Be the first to send a comment!</h3>
      }

      { data.comment &&
        <Container>
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
                

              </div>

            </Card>
          )}
        </Container>
      }
      
    </>
  )
}

export default AllCommentsList