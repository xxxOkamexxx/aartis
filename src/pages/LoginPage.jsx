import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { Alert } from 'react-bootstrap';

// context contents
import { useAuthContext } from '../context/AuthContext'
import FormBox from '../components/FormBox';

// bootstrap
import { 
  Container, 
  Row, 
  Col, 
  Form, 
  Button, 
  Card, 
  Image 
} from 'react-bootstrap'
import { useEffect } from 'react';

const LoginPage = () => {
  const emailRef = useRef()
	const passwordRef = useRef()
  const [error, setError] = useState(null)
	const [loading, setLoading] = useState(false)
	const { login } = useAuthContext()
	
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
		e.preventDefault()
		setError(null);


		try {
			setLoading(true)
			await login(emailRef.current.value, passwordRef.current.value)
			navigate('/')

		} catch (err) {      
			setError('Email address or password is incorrect')
			setLoading(false)
      console.log(err.message)
		}

	}

  

  return (
    <FormBox>
      <>
          <Form title='Log in' onSubmit={handleSubmit} style={{width:'100%'}}>

              <h3 className='text-center title'>LOGIN</h3>

              <Form.Group id='email' className='mb-3 form-font'>
                <Form.Label>E-mail *</Form.Label>
                <Form.Control 
                  type='email' 
                  ref={emailRef} 
                  required />
              </Form.Group>
              
              <Form.Group id='password' className='mb-3 form-font'>
                <Form.Label>Password *</Form.Label>
                <Form.Control 
                  type='password' 
                  ref={passwordRef} 
                  required />
              </Form.Group>

              <div className="text-center mt-5">

                <Link to='#' >Forgot Password?</Link>
              </div>
              {error && (
                <Alert variant='danger'>{error}</Alert>
              )}

              <div className='d-flex justify-content-center'>
                <Button 
                    disabled={loading} 
                    className='btnField btn-font btn-lg'
                    type="submit"
                >
                  LOGIN
                </Button>             
              </div>
                
              
                
              <div className='text-center'>Join AARTIS? <Link to='/signup' className='linkText'>CREATE ACCOUNT</Link></div>
                <p>By logging in to AARTIS, I confirm that I have read and agree to the AARTIS Terms of Service, Privacy Policy, and to receive emails and updates.</p>
                                
          </Form>
      </>
    </FormBox> 
    
  
  )
}

export default LoginPage