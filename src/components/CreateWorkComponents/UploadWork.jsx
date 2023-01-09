import { useRef, useState, useEffect, useCallback } from 'react'
import { useDropzone } from 'react-dropzone';
import { Link, useNavigate } from 'react-router-dom';


// firebase
import { setDoc, doc } from 'firebase/firestore';
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

// hooks
import useUploadImage from '../../hooks/useUploadImage';
import useDeleteImage from '../../hooks/useDeleteImage'




const UploadWork = () => {
  const uploadFile = useUploadImage()
  const deleteFile = useDeleteImage()
  
  const titleRef = useRef('')
  const captionRef = useRef('')
  const [tags, setTags] = useState([])
  const [category, setCategory] = useState(null)
  const [image, setImage] = useState([])
  const [error, setError] = useState(null)
	const [loading, setLoading] = useState(false)
	const [isUploaded, setIsUploaded] = useState(false)

  const { currentUser } = useAuthContext()
  const navigate = useNavigate()


    //console.log('tags', tags)
    //console.log('category', category)
    //console.log('title', titleRef.current.value)

  
  const onDrop = useCallback((acceptedFiles) => {
		if (!acceptedFiles.length) {
			return
		}

		console.log("acceptedFiles", acceptedFiles[0]) // 変換前のパス（オリジナル）

		// trigger upload of the first image
		uploadFile.upload(acceptedFiles[0]) // ここでプロパティの変換（UUID）
            
	}, [])

  const { getRootProps, getInputProps} = useDropzone({
    accept: {
      'image/jpeg': [],
      'image/jpg': [],
      'image/png': [],
    },
    maxFiles: 1,
    maxSize: 4 * 1024 * 1024, // 4 mb
    onDrop,
	})

  const handleSubmit = async(e) => {  
    e.preventDefault() 
    
    console.log(uploadFile.isUuid)
          
    // Merge fields onto work-document
    await setDoc(doc(db, 'work', uploadFile.isUuid), { 
        title: titleRef.current.value,
        caption: captionRef.current.value,
        tags: tags,
        category: category,
        creator_id: currentUser.uid,
        creator_name: currentUser.displayName,
        creator_avatar: currentUser.photoURL,
        comment:[],
        updated:''
    }, { merge: true }) 
    
    // setIsUploaded(true)
    console.log('changed!')   
    navigate('/dashboard')
                
  }
  //console.log('url', images)
  //console.log('user', currentUser?.displayName) // 'aaa' ok

  return (
    
    <div className='uploadWrapper'>

        <Form onSubmit={handleSubmit} title='upload' >
           
           {/* ---------------dropzone---------------- */}
           <>
            <div className="outerBox">
              {  !uploadFile.isUrl && 
                <>
                  <div {...getRootProps()} id="dropzone-wrapper">
                    <input {...getInputProps()} className="imageUploadInput" required/>

                    <div className="indicator" >
                                                            
                      <div className="imageUplodeBox">
                        <div className="imageLogoAndText">
                            
                          <IconButton>
                            <CloudUploadIcon  sx={{ fontSize: "50px", color:'#fcfcfc'}} />
                          </IconButton>
                                                          
                          <h3>Drag and drop files here!</h3>
                        </div>
                      </div>
                                                            
                    </div>

                    {/* Upload Progress Bar */}
                    {uploadFile.progress !== null && (
                      <ProgressBar
                      className='progress_bar'
                      now={uploadFile.progress}
                      label={`${uploadFile.progress}%`}
                      />
                    )}

                  </div>
                </>  
              }
              {uploadFile.isError && <Alert variant='danger'>{uploadFile.error.message}</Alert>}
              {uploadFile.isSuccess && (
                <>
                  <Image alt='preview' src={uploadFile.isUrl} className="img-thumbnail" />
                  <IconButton 
                    sx={{backgroundColor:'#AD9510', marginTop: 2,}}
                    //onChange={deleteFile.mutate()}
                  >
                    <DeleteIcon sx={{color:'#fcfcfc'}}/>
                  </IconButton>
                </>
              )}
            </div>
        </>

           {/* ---------------dropzone---------------- */}
       
            
            {/* form */}
            {error && (<Alert variant="danger">{error}</Alert>)}
         
                       
            <div className='formWrapper mb-5'>
                <Form.Group id='title' className='mb-3 form-font'>
                    <Form.Label>Title *</Form.Label>
                    <Form.Control 
                        type='text' 
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
                        ref={captionRef} 
                    />
                </Form.Group>

                <Form.Group id='tags' className='mb-3 form-font'>
                    <Form.Label>Tags</Form.Label>
                    <TagsInput
                        value={tags}
                        onChange={setTags}
                        name="tags"
                        placeHolder="enter tags"
                    />
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
                            onChange={() => setCategory('illustration')}
                        />
                        <Form.Check
                            inline
                            label="photograph"
                            name="category"
                            type='radio'
                            id='radio-ph'
                            value='photograph'
                            onChange={() => setCategory('photograph')}
                        />
                    </div>
                </Form.Group>
                        
                
                <Button type='submit' className='btnSave btn-lg'>SAVE</Button>
            </div>
        </Form>
        
    </div> 
        
      
    
  )
}

export default UploadWork
