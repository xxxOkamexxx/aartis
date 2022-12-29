import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// context
import { useAuthContext } from '../context/AuthContext'

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
			navigate('/home')

		} catch (err) {
			setError(err.message)
			setLoading(false)
		}
	}

  

  return (
    <div className='page-bg'>
      <div className='formWrapper'>
          <Form title='Log in' onSubmit={handleSubmit}>
              <h3 className='text-center title'>LOGIN</h3>
              <Form.Group id='email' className='mb-3 formFont'>
                <Form.Label>E-mail *</Form.Label>
                <Form.Control 
                  type='email' 
                  ref={emailRef} 
                  required />
              </Form.Group>
              
              <Form.Group id='password' className='mb-3 formFont'>
                <Form.Label>Password *</Form.Label>
                <Form.Control 
                  type='password' 
                  ref={passwordRef} 
                  required />
              </Form.Group>

              <div className="text-center mt-3">

                <Link to='#' >Forgot Password?</Link>
              </div>

              <Button 
                  disabled={loading} 
                  className='btnField btnFont'
                  type="submit"
              >
                LOGIN
              </Button>
              
                
              <div className='text-center'>Join AARTIS? <Link to='/signup' className='linkText'>CREATE ACCOUNT</Link></div>
                <p>By logging in to AARTIS, I confirm that I have read and agree to the AARTIS Terms of Service, Privacy Policy, and to receive emails and updates.</p>
                                
          </Form>
      </div>
    </div> 
    
  
  )
}

export default LoginPage