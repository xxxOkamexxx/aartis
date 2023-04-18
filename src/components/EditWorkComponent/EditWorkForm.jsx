import { useRef, useState, useEffect, useCallback } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';


// firebase
import { setDoc, doc, updateDoc, Timestamp } from 'firebase/firestore'
import { db } from '../../firebase/config';


import { useAuthContext } from '../../context/AuthContext'

// components
import { TagsInput } from "react-tag-input-component";
import classNames from 'classnames'

// bootstrap
import { Container, Row, Col, Form, Button, Card, Alert, Image, ProgressBar } from 'react-bootstrap'

// icon
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material'

import useWork from '../../hooks/useWork';
import { useFieldArray } from 'react-hook-form';



const EditWorkForm = () => {
  const { id } = useParams()
  const { currentUser } = useAuthContext()
  const navigate = useNavigate()

  const {data, loading} = useWork(id)
  
  const titleRef = useRef('')
  const captionRef = useRef('')
  const [tags, setTags] = useState([])
  const [newTags, setNewTags] = useState([])
  const [category, setCategory] = useState()
  const [image, setImage] = useState([])
  const [error, setError] = useState(null)

  const [isUploaded, setIsUploaded] = useState(false)

  //console.log(data.tags, newTags)


  
  const handleSubmit = async(e) => {  
      e.preventDefault() 
      
      //console.log('after',category)
         
    // Merge fields onto work-document
    await updateDoc(doc(db, 'work', data.uuid), { 
        title: titleRef.current.value,
        caption: captionRef.current.value,
        tags: newTags,
        // tags: [...data.tags, newTags],
        category: category,
        updated: Timestamp.fromDate(new Date()),
    }) 
    // await updateDoc(doc(db, 'work', data.uuid), { 
    //     tags: arrayUnion(newTags),        
    // }) 
    

   
    // setIsUploaded(true)
    //console.log('changed!')   
    navigate('/dashboard')
                
  }

  useEffect(()=> {
    if(data){
        setCategory(data.category)
      }
    if(!data.tags){
      return
    }
    setTags(data.tags)
    
  },[data])
 console.log(category)

  return (
    
    <Container>

        <div  className='image-box'>
          { data &&
            <>
            {/* ---------------image---------------- */}
            <div className='mb-5'>
                                                        
                  <Image src={data.url} fluid/>
                                
              </div>

            {/* ---------------image end---------------- */}
        
              <Form onSubmit={handleSubmit} title='upload' >
                  
                  {/* form */}
                  {error && (<Alert variant="danger">{error}</Alert>)}
                          
                  <div className='formBoxWrapper mb-5'>
                      <Form.Group id='title' className='mb-3 form-font'>
                          <Form.Label>Title *</Form.Label>
                          <Form.Control 
                              type='text' 
                              defaultValue={data.title}
                              ref={titleRef} 
                              required 
                          />
                      </Form.Group>

                      <Form.Group id='caption' className='mb-3 form-font'>
                          <Form.Label>Caption</Form.Label>
                          <Form.Control 
                              type='text' 
                              as="textarea" 
                              rows={3}
                              defaultValue={data.caption}
                              ref={captionRef} 
                          />
                      </Form.Group>

                      <Form.Group id='tags' className='mb-3 form-font'>
                          <Form.Label>Tags</Form.Label>
                          <TagsInput
                              value={tags}
                              onChange={setNewTags}
                              name="tags"
                              placeHolder="enter tags"
                          />
                          {/* { data.tags.map( tag =><p>{tag}</p> )} */}
                          

                      </Form.Group>

                      <Form.Group id='category' className='mb-3 form-font formRadio'>
                          <Form.Label>Category</Form.Label>
                          <div>
                              <Form.Check
                                  inline
                                  label="Illustration"
                                  name="category"
                                  type='radio'
                                  id='radio-il'
                                  value='illustration'
                                  checked={category == 'illustration' }
                                  onChange={() => setCategory('illustration')}
                              />
                              <Form.Check
                                  inline
                                  label="photograph"
                                  name="category"
                                  type='radio'
                                  id='radio-ph'
                                  value='photograph'
                                  checked={category == 'photograph'}
                                  onChange={() => setCategory('photograph')}
                              />
                          </div>
                      </Form.Group>
                              
                      
                      <Button type='submit' className='btn-secondary btn-lg'>SAVE</Button>
                  </div>
              </Form>
            </>
          }
        </div>   
    </Container> 
        
      
    
  )
}

export default EditWorkForm
