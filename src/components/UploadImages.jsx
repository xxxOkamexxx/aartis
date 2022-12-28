import { useState } from 'react'
import { useDropzone } from 'react-dropzone';
import classNames from 'classnames'

// bootstrap
import { Container, Row, Col, Form, Button, Card, Alert, Image } from 'react-bootstrap'


// Temporary option list
const tagList = ['test', 'Landscape', 'Fashion illust', 'Fantasy']

const UploadImages = () => {
    const [uploadImage, setUploadImage] = useState([])

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
		maxFiles: 5,
		maxSize: 2 * 1024 * 1024, // 2 MB
		multiple: false,
		//onDrop,
	})
    const cssClasses = classNames({
		'drag-accept': isDragAccept,
		'drag-reject': isDragReject,
	})

  return (
    <>
        <div className='uploadWrapper'>
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
                                    <li key={file.name}>{file.name} ({Math.round(file.size / 1024)} kB)</li>
                                ))}
                            </ul>
                        </div>
                    )}
            </div>

            {/* <div className='formWrapper'>
                <TextField fullWidth label="title" id="title" className='textField' sx={fieldsStyle} />
                
                <TextField fullWidth label="description" id="description" multiline rows={4} className='textField bgColor' sx={fieldsStyle} />
                
                <Autocomplete
                    multiple
                    id="tags-filled"
                    options={tagList.map((option) => option)}
                    getOptionLabel={(option) => {
                        // Value selected with enter, right from the input
                        if (typeof option === 'string') {
                        return option;
                        }
                        // Add "xxx" option created dynamically
                        if (option.inputValue) {
                        return option.inputValue;
                        }
                        // Regular option
                        return option;
                    }}
                    renderOption={(props, option) => <li {...props}>{option}</li>}
                    // defaultValue={[tagList[13].title]}
                    freeSolo
                    renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                        <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                    ))
                    }
                    renderInput={(params) => (
                    <TextField
                        {...params}
                        fullWidth
                        variant="outlined"
                        label="Tags"
                        className='textField bgColor'
                        sx={fieldsStyle}
                    />
                    
                    )}
                />
                <FormControl className='radioWrapper'>
                    <FormLabel id="demo-radio-buttons-group-label" className='label'>Category</FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="illustration"
                        name="radio-buttons-group"
                    >
                        <FormControlLabel value="illustration" control={<Radio />} label="Illustration" />
                        <FormControlLabel value="photography" control={<Radio />} label="Photography" />
                    </RadioGroup>
                </FormControl>
                
                <Button className='btnSave'>SAVE</Button>
            </div> */}
            
        </div> 
        
      
    </>
  )
}

export default UploadImages
