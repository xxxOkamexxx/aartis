import { useRef, useState } from 'react'
import { useDropzone } from 'react-dropzone';
import { TagsInput } from "react-tag-input-component";

// firebase
import { useAuthContext } from '../context/AuthContext'
import { doc, onSnapshot } from "firebase/firestore"
import { db } from "../firebase/config"

import classNames from 'classnames'

// bootstrap
import { Container, Row, Col, Form, Button, Card, Alert, Image } from 'react-bootstrap'



const UploadImages = () => {
    
    const titleRef = useRef('')
    const captionRef = useRef('')
    const [tags, setTags] = useState([])
    const [category, setCategory] = useState(null)
    const [uploadImage, setUploadImage] = useState([])
    
    const { currentUser, userName, userEmail, userPhotoUrl} = useAuthContext()


    //console.log('tags', tags)
    console.log('category', category)


    const {
		acceptedFiles,
		getRootProps,
		getInputProps,
		isDragActive,
		isDragAccept,
		isDragReject,
	} = useDropzone({
        accept: {
			'image/gif': ['.gif'],
			'image/jpeg': ['.jpg', '.jpeg'],
			'image/png': ['.png'],
			'image/webp': ['.webp'],
		},
		maxFiles: 1,
		maxSize: 2 * 1024 * 1024, // 2 MB
		multiple: false,
		//onDrop,
	})
    const cssClasses = classNames({
		'drag-accept': isDragAccept,
		'drag-reject': isDragReject,
	})

    const handleSubmit = () => {
        console.log('changed!')
    }

    //console.log('user', currentUser?.displayName) // 'aaa' ok

  return (
    
    <div className='uploadWrapper'>

        <Form Form onSubmit={handleSubmit} title='upload' >
            <div {...getRootProps()} id="upload-image-dropzone-wrapper" className={cssClasses}>
                <input {...getInputProps()} />
                    {
                        isDragActive ?
                        <p>Drop the files here ...</p> :
                        <p>Drag 'n' drop some files here, or click to select files</p>
                    }

                    {acceptedFiles.length > 0 && (
                        <div className="accepted-files mt-2">
                            
                            <ul className="list-unstyled">
                                {acceptedFiles.map(file => (
                                    <>
                                        <Image thumbnail src={file.name} />
                                        <li key={file.name}>{file.name} ({Math.round(file.size / 1024)} kB)</li>
                                    </>
                                ))}
                            </ul>
                        </div>
                    )}
            </div>
            
                       
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

export default UploadImages
