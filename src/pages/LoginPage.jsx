import React from 'react'

// components
import CardTemp from '../components/CardTemp';

// material ui
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { CardContent } from '@mui/material';

import {fieldsStyle} from '../helper/textFieldStyle'

const LoginPage = () => {
  

  return (
    <div className='page-bg'>
        <div className='cardWrapper'>
            <CardTemp title='Login'>
                <CardContent className='card-content'>
                    <TextField label="User Name" fullWidth className='textField' sx={fieldsStyle}></TextField>
                    <TextField label="Password" fullWidth className='textField' sx={fieldsStyle}></TextField>
                    <FormControlLabel control={<Checkbox defaultChecked />} label="Keep me logged in" />
                    <Button fullWidth className='btnField'>Login</Button>               
                    <p>Forgot username or password?</p>
                </CardContent>
                <h5>Join AARTIS?</h5>
                <p>By logging in to AARTIS, I confirm that I have read and agree to the AARTIS Terms of Service, Privacy Policy, and to receive emails and updates.</p>
            </CardTemp>
        </div> 
    </div>   
  )
}

export default LoginPage