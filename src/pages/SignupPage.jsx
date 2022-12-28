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
  Image,
} from 'react-bootstrap'


const SignupPage = () => {

	const userNameRef = useRef()
  const emailRef = useRef()
	const passwordRef = useRef()
	const passwordConfirmRef = useRef()
  const [error, setError] = useState(null)
	const [loading, setLoading] = useState(false)
	const [avatar, setAvatar] = useState(false)

	const { signup } = useAuthContext()
	
	const navigate = useNavigate()

  const handleFileChange = (e) => {
		if (!e.target.files.length) {
			setAvatar(null)
			return
		}

		setAvatar(e.target.files[0])
		console.log("File changed!", e.target.files[0])
	}


  const handleSubmit = async (e) => {
    e.preventDefault()

    if (passwordRef.current.value !== passwordConfirmRef.current.value, avatar) {
			return setError("The passwords does not match")
		}
    
    setError(null)

    try {

      setLoading(true)

      await signup(userNameRef.current.value, emailRef.current.value, passwordRef.current.value, avatar)
      
      await reloadUser()
      navigate('/home')

    } catch (err) {
      setError(err.message)
      setLoading(false)
    }

  }



  return (
    <div className='page-bg'>
      <div className='formWrapper'>
          <Form onSubmit={handleSubmit} title='Sign up'>
              <h3 className='text-center title'>SIGN UP</h3>
              <Form.Group id='userName' className='mb-3 formFont'>
                <Form.Label>User Name *</Form.Label>
                <Form.Control 
                  type='text' 
                  ref={userNameRef} 
                  required />
              </Form.Group>

              <Form.Group id="avatar" className="mb-3 formFont">
									<Form.Label>Avatar</Form.Label>
									<Form.Control type="file" onChange={handleFileChange} className="custom-file-input"/>
									<Form.Text>
										{
											avatar
												? `${avatar.name} (${Math.round(avatar.size/1024)} kB)`
												: 'No photo selected'
										}
									</Form.Text>
								</Form.Group>
              
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
              
              <Form.Group id="password-confirm" className="mb-3 formFont">
                <Form.Label>Password Confirmation *</Form.Label>
                <Form.Control 
                  type='password' 
                  ref={passwordConfirmRef} 
                  required />
              </Form.Group>
                 
                
                  <p>By logging in to AARTIS, I confirm that I have read and agree to the AARTIS Terms of Service, Privacy Policy, and to receive emails and updates.</p>
                  
                  <Button
                    disabled={loading} 
                    className='btnField btnFont'
                    type="submit"
                  >
                    CREATE ACCOUNT
                  </Button>               
               
              <div className='text-center'>Already a member? <a href="/login" className='linkText'>Log In</a></div>

          </Form>
      </div>
    </div>    
  )
}

export default SignupPage