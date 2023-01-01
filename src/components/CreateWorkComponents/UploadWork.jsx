import { useRef, useState, useEffect, useCallback } from 'react'
import { useDropzone } from 'react-dropzone';
import { Link, useNavigate } from 'react-router-dom';


// firebase
import { useAuthContext } from '../../context/AuthContext'
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';

// components
import FileUpload from './FileUpload'
import { TagsInput } from "react-tag-input-component";

// bootstrap
import { Container, Row, Col, Form, Button, Card, Alert, Image } from 'react-bootstrap'

// hooks
import useUploadImage from '../../hooks/useUploadImage';




const UploadWork = () => {
    const uploadFile = useUploadImage()
    
    const titleRef = useRef('')
    const captionRef = useRef('')
    const [tags, setTags] = useState([])
    const [category, setCategory] = useState(null)
    const [images, setImages] = useState([])
    const [error, setError] = useState(null)
	const [loading, setLoading] = useState(false)
	const [isUploaded, setIsUploaded] = useState(false)

    const { currentUser } = useAuthContext()
    const navigate = useNavigate()


    //console.log('tags', tags)
    //console.log('category', category)
    //console.log('title', titleRef.current.value)

    

    const handleSubmit = async(e) => {  
        e.preventDefault()       
              
        await addDoc(collection(db, 'work'), {
            title: titleRef.current.value,
            caption: captionRef.current.value,
            tags: tags,
            category: category,
            author_id: currentUser.uid,
            author_name: currentUser.displayName,
            url: images
        })  
        // setIsUploaded(true)
        console.log('changed!')   
        navigate('/home')
                 
    }
    //console.log('url', images)
    //console.log('user', currentUser?.displayName) // 'aaa' ok

  return (
    
    <div className='uploadWrapper'>

        <Form onSubmit={handleSubmit} title='upload' >
           
            < FileUpload images={images} setImages={setImages}/>
            
            {/* form */}
            {error && (<Alert variant="danger">{error}</Alert>)}
            <div></div>
                       
            <div className='formWrapper'>
                <Form.Group id='title' className='mb-3 formFont'>
                    <Form.Label>Title *</Form.Label>
                    <Form.Control 
                        type='text' 
                        ref={titleRef} 
                        required 
                    />
                </Form.Group>

                <Form.Group id='caption' className='mb-3 formFont'>
                    <Form.Label>Caption</Form.Label>
                    <Form.Control 
                        type='text' 
                        as="textarea" 
                        rows={3}
                        ref={captionRef} 
                    />
                </Form.Group>

                <Form.Group id='tags' className='mb-3 formFont'>
                    <Form.Label>Tags</Form.Label>
                    <TagsInput
                        value={tags}
                        onChange={setTags}
                        name="tags"
                        placeHolder="enter tags"
                    />
                </Form.Group>

                <Form.Group id='category' className='mb-3 formFont formRadio'>
                    <Form.Label>Category</Form.Label>
                    <div>
                        <Form.Check
                            inline
                            label="Illustration"
                            name="category"
                            type='radio'
                            id='radio-il'
                            value='illustration'
                            onChange={() => setCategory('illustration')}
                        />
                        <Form.Check
                            inline
                            label="Photography"
                            name="category"
                            type='radio'
                            id='radio-ph'
                            value='photography'
                            onChange={() => setCategory('photography')}
                        />
                    </div>
                </Form.Group>
                        
                
                <Button type='submit' className='btnSave'>SAVE</Button>
            </div>
        </Form>
        
    </div> 
        
      
    
  )
}

export default UploadWork
