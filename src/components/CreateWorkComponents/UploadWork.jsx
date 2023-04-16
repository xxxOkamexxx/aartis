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



const UploadWork = () => {
  // const uploadFile = useUploadImage()
  const { 
    error, 
    isError, 
    isSuccess, 
    isUploading, 
    progress, 
    upload, 
    remove, 
    isUrl, 
    isUuid
  } = useUploadImage()

  
  const titleRef = useRef('')
  const captionRef = useRef('')
  const [tags, setTags] = useState([])
  const [category, setCategory] = useState(null)
  const [image, setImage] = useState('')
  const [fieldError, setFieldError] = useState(null)
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
		upload(acceptedFiles[0]) // ここでプロパティの変換（UUID）
    setImage(isUrl)
            
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

  /**
   * Delete upload image
   */
  const handleDelete = async(e) => {
   
    console.log(isUuid)
    remove(isUuid)
    setImage('File is not selected')
  }

  /**
   * Upload image with images info
   */

  const handleSubmit = async(e) => {  
    e.preventDefault() 

    if(image == '') {
      setFieldError('You ')
    }
    
    console.log(isUuid)
          
    // Merge fields onto work-document
    await setDoc(doc(db, 'work', isUuid), { 
        title: titleRef.current.value,
        caption: captionRef.current.value,
        tags: tags,
        category: category,
        creator_id: currentUser.uid,
        creator_name: currentUser.displayName,
        creator_avatar: currentUser.photoURL,
        comment:[],
        updated:null,
        likes:0
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
                <>
                  <div {...getRootProps()} id="dropzone-wrapper">
                    <input {...getInputProps()} className="imageUploadInput"/>

                    <div className="indicator" >
                                                            
                      { image == '' && 
                        <div className="imageUplodeBox">
                          <div className="imageLogoAndText">
                              
                            <IconButton>
                              <CloudUploadIcon  sx={{ fontSize: "50px", color:'#fcfcfc'}} />
                            </IconButton>
                                                            
                            <h3>Drag and drop files here!</h3>
                          </div>
                        </div>
                      }

                      {/* Upload Progress Bar */}
                      {progress !== null && (
                        <div style={{width:'70vw'}}>
                          <ProgressBar
                            className='progress_bar'
                            now={progress}
                            label={`${progress}%`}
                            variant="info"                         
                          />
                        </div>
                      )}

                      {isError && <Alert variant='danger'>{error.message}</Alert>}

                    
                    </div>
                  </div>
                </>  
              {/* Upload Progress Bar */}
              {/* {progress !== null && (
                <ProgressBar
                className='progress_bar'
                now={progress}
                label={`${progress}%`}
                />
              )} */}

              {isError && <Alert variant='danger'>{error.message}</Alert>}
              
              {isSuccess && image !== '' && (
                <>
                  <Image alt='preview' src={isUrl} className="img-thumbnail" />
                  <IconButton 
                    sx={{backgroundColor:'#AD9510', marginTop: 2,}}
                    onClick={handleDelete}
                  >
                    <DeleteIcon sx={{color:'#fcfcfc'}}/>
                  </IconButton>
                </>
              )}
            </div>
        </>

           {/* ---------------dropzone---------------- */}
       
            
            {/* form */}
            {fieldError && (<Alert variant="danger">{fieldError}</Alert>)}
         
                       
            <div className='formBoxWrapper mb-5'>
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
