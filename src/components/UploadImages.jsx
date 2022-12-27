import React from 'react'

//bootstrap
import { Container } from 'react-bootstrap'

// material ui
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';

import {fieldsStyle} from '../helper/textFieldStyle'


const UploadImages = () => {
    const tagList = ['test', 'landscape']


  return (
    <>
        <div className='uploadWrapper'>
            <div>Upload</div>
            <div className='formWrapper'>
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
            </div>
            
        </div>
        
      
    </>
  )
}

export default UploadImages
