import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useAuthContext } from '../context/AuthContext';

// components
import CardTemp from '../components/CardTemp';

// material ui
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import CardActions from '@mui/material/CardActions';
import { CardContent } from '@mui/material';

import {fieldsStyle} from '../helper/textFieldStyle'

const SignupPage = () => {

	const userNameRef = useRef(null)
  const emailRef = useRef(null)
	const passwordRef = useRef(null)
	const passwordConfirmRef = useRef(null)

  const [userNameValue, setUserNameValue] = useState('')
  const [emailValue, setEmailValue] = useState('')
  const [passwordValue, setPasswordValue] = useState('')
  const [passwordConfirmValue, setPasswordConfirmValue] = useState('')


	const [userNameError, setUserNameError] = useState(false)
	const [emailError, setEmailError] = useState(false)
	const [passwordError, setPasswordError] = useState(false)
	const [confirmPassError, setConfirmPassError] = useState(false)
	const [loading, setLoading] = useState(false)

	const [icon, setIcon] = useState(false)
	
	const navigate = useNavigate()

  // Validation
  const formValidation = () => {
    let valid = true

    // Check User name
    const userNameCheck = userNameRef?.current
    if (userNameCheck) {      
      const checked = userNameCheck.validity.valid
      setUserNameError(!checked)
      valid &&= checked
    }

    // Check Email
    const emailCheck = emailRef?.current
    if (emailCheck) {
      const checked = emailCheck.validity.valid
      setEmailError(!checked)
      valid &&= checked
    }
    
    // Check Password
    const passwordCheck = passwordRef?.current
    if (passwordCheck) {
      const checked = passwordCheck.validity.valid
      setPasswordError(!checked)
      valid &&= checked
    } 

    const PassConfirmCheck = confirmPasswordRef?.current;                         // ← ⑪
    if (PassConfirmCheck) {
      if (confirmPasswordValue.length > 0 &&                       // ← ⑫
          passwordValue !== confirmPasswordValue) {
        PassConfirmCheck.setCustomValidity("Password doesn't match");
      } else {
        PassConfirmCheck.setCustomValidity("");
      }

      const ok = PassConfirmCheck.validity.valid;                                // ← ⑬
      setConfirmPassError(!ok);
      valid &&= ok;
    }


    return valid
  }


  const onSubmit = async (e) => {
    
    

    try {
      setLoading(true)

      await signup(emailRef.current.value, passwordRef.current.value, userNameRef.current.value)
      
      await reloadUser()
      navigate('/')
    } catch (err) {
      setLoading(false)
    }

  }



  return (
    <div className='page-bg'>
      <div className='cardWrapper'>
          <CardTemp title='Sign up'>
              <CardContent className='card-content'>
                <form onSubmit={ onSubmit }>
                  <TextField 
                    label="User Name" 
                    fullWidth 
                    className='textField' 
                    sx={fieldsStyle} 
                    required
                    inputRef={userNameRef}
                    value={userNameValue}
                    error={userNameError}
                    helperText={userNameError && 'Input User Name'}
                    inputProps={{required: true}} 
                    onChange={e => setUserNameValue(e.target.value)}                   
                  />

                  <TextField 
                    label="E-mail" 
                    fullWidth 
                    className='textField' 
                    sx={fieldsStyle} 
                    required
                    inputRef={emailRef}
                    value={emailValue}
                    error={emailError}
                    helperText={emailError && 'Input valid email address'}
                    inputProps={{required: true}} 
                    onChange={e => setEmailValue(e.target.value)} 
                  />

                  <TextField 
                    label="Password" 
                    fullWidth 
                    className='textField' 
                    sx={fieldsStyle}
                    required
                    inputRef={passwordRef}
                    value={passwordValue}
                    error={passwordError}
                    helperText={passwordError && 'Input more than 6 words'}
                    inputProps={{required: true}} 
                    onChange={e => setPasswordValue(e.target.value)} 
                  />

                  <TextField 
                    label="Password" 
                    fullWidth 
                    className='textField' 
                    sx={fieldsStyle}
                    required
                    inputRef={passwordConfirmRef}
                    value={passwordConfirmValue}
                    error={confirmPassError}
                    helperText={confirmPassError && confirmPasswordRef?.current?.validationMessage}
                    inputProps={{required: true}} 
                    onChange={e => setPasswordConfirmValue(e.target.value)} 
                  />

                  <p>By logging in to AARTIS, I confirm that I have read and agree to the AARTIS Terms of Service, Privacy Policy, and to receive emails and updates.</p>
                  
                  <Button 
                    fullWidth 
                    className='btnField'
                    onClick={() => {
                      formValidation() 
                    }}
                  >
                    Sign up
                  </Button>               
                </form> 
              </CardContent>
              <h5>Already a member? Log In</h5>
          </CardTemp>
      </div>
    </div>    
  )
}

export default SignupPage