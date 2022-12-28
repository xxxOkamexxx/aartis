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


const SignupPage = () => {

	const userNameRef = useRef()
  const emailRef = useRef()
	const passwordRef = useRef()
	const passwordConfirmRef = useRef()
  const [error, setError] = useState(null)
	const [loading, setLoading] = useState(false)
	const [icon, setIcon] = useState(false)

	const { signup } = useAuthContext()
	
	const navigate = useNavigate()

  const handleFileChange = (e) => {
		if (!e.target.files.length) {
			setIcon(null)
			return
		}

		setPhoto(e.target.files[0])
		console.log("File changed!", e.target.files[0])
	}


  const onSubmit = async (e) => {
    e.preventDefault()

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
			return setError("The passwords does not match")
		}
    
    setError(null)

    try {

      setLoading(true)

      await signup(userNameRef.current.value, emailRef.current.value, passwordRef.current.value, icon)
      
      await reloadUser()
      navigate('/')

    } catch (err) {
      setError(err.message)
      setLoading(false)
    }

  }



  return (
    <div className='page-bg'>
      <div className='cardWrapper'>
          <Form title='Sign up'>
              <Form.Group id='userName' className='mb-3'>
                <Form.Label>User Name *</Form.Label>
                <Form.Control 
                  type='text' 
                  ref={userNameRef} 
                  required />
              </Form.Group>
              
              <Form.Group id='email' className='mb-3'>
                <Form.Label>E-mail *</Form.Label>
                <Form.Control 
                  type='email' 
                  ref={emailRef} 
                  required />
              </Form.Group>
              
              <Form.Group id='password' className='mb-3'>
                <Form.Label>Password *</Form.Label>
                <Form.Control 
                  type='password' 
                  ref={passwordRef} 
                  required />
              </Form.Group>
              
              <Form.Group id="password-confirm" className="mb-3">
                <Form.Label>Password Confirmation *</Form.Label>
                <Form.Control 
                  type='password' 
                  ref={passwordConfirmRef} 
                  required />
              </Form.Group>
                 
                
                  <p>By logging in to AARTIS, I confirm that I have read and agree to the AARTIS Terms of Service, Privacy Policy, and to receive emails and updates.</p>
                  
                  <Button 
                    className='btnField'
                    onClick={onSubmit}
                  >
                    Sign up
                  </Button>               
               
              <h5>Already a member? <a href="/login">Log In</a></h5>

          </Form>
      </div>
    </div>    
  )
}

export default SignupPage