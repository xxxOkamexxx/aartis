import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone'
import classNames from 'classnames'

import { ref, getDownloadURL, uploadBytes, uploadBytesResumable } from 'firebase/storage'
import { storage } from '../firebase/config';

// bootstrap
import ProgressBar from 'react-bootstrap/ProgressBar'
import Alert from 'react-bootstrap/Alert'
import Image from 'react-bootstrap/Image'

// icon
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material'

import useUploadImage from '../hooks/useUploadImage';
import { useEffect } from 'react';


const FileUpload = (props) => {
    // const [error, setError] = useState(null)
	// const [loading, setLoading] = useState(false)
	// const [isUploaded, setIsUploaded] = useState(false)
    const uploadFile = useUploadImage()

    const onDrop = useCallback((acceptedFiles) => {
		if (!acceptedFiles.length) {
			return
		}

		console.log("acceptedFiles", acceptedFiles[0])

		// trigger upload of the first image
		uploadFile.upload(acceptedFiles[0])
      

        // const url = getDownloadURL(uploadFile)
        
        
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

    props.setImages(uploadFile.isUrl)
   
    
  return (
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
                        <IconButton sx={{backgroundColor:'#AD9510', marginTop: 2,}}>
                            <DeleteIcon sx={{color:'#fcfcfc'}}/>
                        </IconButton>
                    </>
                )}
    </div>
    </>
)
    //   <>                            
    //     {/* Upload Dropzone */}  
    //     <div className="outerBox">
    //         <div>
    //             {/* { props.images.length > 0 && (
    //                 props.images.map(image => <ImagePreview id={image.id} path={image.path} key={image.i} /> )
    //             )} */}

    //         </div>

    //         <div className="imageUplodeBox">
    //             <div className="imageLogoAndText">
                 
    //                 <CloudUploadIcon  sx={{ fontSize: "50px" }} />
          
                
    //             <h3>Drag and drop files here!</h3>
    //             </div>
    //             <input 
    //                 className="imageUploadInput" 
    //                 multiple 
    //                 name="imageURL" 
    //                 type="file"
    //                 accept='png, jpg, jpeg'
    //                 onChange={handleFileChange}
    //             />
    //         </div>

    //     </div>
    // </>
  
}

export default FileUpload