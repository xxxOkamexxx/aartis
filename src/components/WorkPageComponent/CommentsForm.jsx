import { useState } from 'react'
// firebase
import { updateDoc, doc } from 'firebase/firestore'
import { db } from '../../firebase/config'
import { Timestamp } from 'firebase/firestore'


// bootstrap style icons 
import { Button, Container, Form } from 'react-bootstrap'

import { useAuthContext } from '../../context/AuthContext'
import { v4 as uuidv4 } from 'uuid'


const CommentsForm = ({data}) => {
  const [newComment, setNewComment] = useState('')

 
  const { currentUser } = useAuthContext()
  const uuid = uuidv4() 

 //console.log(data.comment)
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const commentToAdd = {
      displayName: currentUser.displayName,
      photoURL: currentUser.photoURL,
      content: newComment,
      created: Timestamp.fromDate(new Date()),
      id: uuid
    }
    
    await updateDoc(doc(db, 'work', data.uuid),{
      comment: [...data.comment, commentToAdd]
    })

    //console.log(commentToAdd)
  }
 //console.log( currentUser.displayName, newComment)
  
  return (
    <Container className='mb-5'>

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
          <Button type='submit' className='btn btn-font mt-2'>Add Comment</Button>
        </Form.Group> 
      </Form>
    </Container>
  )
}

export default CommentsForm
