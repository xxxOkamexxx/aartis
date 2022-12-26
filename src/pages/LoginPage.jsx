import React from 'react'

// components
import CardTemp from '../components/CardTemp';

// material ui
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import CardActions from '@mui/material/CardActions';
import { CardContent } from '@mui/material';

const LoginPage = () => {
    const fieldsStyle = {
        '& label.Mui-focused': {
            color: '#9D9876',
          },
          '& .MuiInput-underline:after': {
            borderBottomColor: '#9D9876',
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#fcfcfc',
              backgroundColor: '#fcfcfc'
            },
            '&:hover fieldset': {
              borderColor: '#9D9876',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#9D9876',
            },
          },
      }

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