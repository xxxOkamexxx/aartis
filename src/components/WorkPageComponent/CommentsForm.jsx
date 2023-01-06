import { Timestamp } from 'firebase/firestore'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

import { Button, Container, Form } from 'react-bootstrap'

import { useAuthContext } from '../../context/AuthContext'

const CommentsForm = () => {
  const [newComment, setNewComment] = useState('')

  const { currentUser } = useAuthContext()
  const uuid = uuidv4() 
  
  const handleSubmit = async (e) => {
    e.preventDefault()

    const commentToAdd = {
      displayName: currentUser.displayName,
      photoURL: currentUser.photoURL,
      content: newComment,
      created: Timestamp.fromDate(new Date()),
      id: uuid
    }
    console.log(commentToAdd)
  }
 //console.log( currentUser.displayName, newComment)
  
  return (
    <Container>

      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label as='p'>Add new comments</Form.Label>
          <Form.Control 
            type='text' 
            as="textarea" 
            rows={3}
            required
            onChange={(e) => setNewComment(e.target.value)}
            value={newComment}
          />
          <Button type='submit' className='btn'>Add Comment</Button>
        </Form.Group> 
      </Form>
    </Container>
  )
}

export default CommentsForm
