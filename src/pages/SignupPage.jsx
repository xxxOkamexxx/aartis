import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// context
import { useAuthContext } from '../context/AuthContext'

// component
import FormBox from '../components/FormBox';

// bootstrap
import { 
  Container, 
  Row, 
  Col, 
  Form, 
  Button, 
  Card, 
  Image,
  Alert,
} from 'react-bootstrap'


const SignupPage = () => {

	const userNameRef = useRef()
  const emailRef = useRef()
	const passwordRef = useRef()
	const passwordConfirmRef = useRef()
	const [photo, setPhoto] = useState()
  const [error, setError] = useState(null)
	const [loading, setLoading] = useState(false)

	const { signup, reloadUser } = useAuthContext()
	
	const navigate = useNavigate()

  const handleFileChange = (e) => {
		if (!e.target.files.length) {
			setPhoto(null)
			return
		}

		setPhoto(e.target.files[0])
		console.log("File changed!", e.target.files[0])
	}


  const handleSubmit = async (e) => {
    e.preventDefault()

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
			return setError("The passwords does not match")
		}
    
    setError(null)

    try {

      setLoading(true)

      await signup(userNameRef.current.value, emailRef.current.value, passwordRef.current.value, photo)
      
      await reloadUser()
      navigate('/')

    } catch (err) {
      setError(err.message)
      setLoading(false)
    }

  }


  return (
      <FormBox>
        <>
          <Form onSubmit={handleSubmit} title='Signup' style={{width:'100%'}}>
              <h3 className='text-center title'>SIGN UP</h3>             

              {error && (
              <Alert variant="danger">{error}</Alert>
              )}

              <Form.Group className='d-flex align-content-end profile-header'> 

              <label className='input_icon'>
                  <Image 
                    src={'https://via.placeholder.com/225'} 
                    className='icon_image user-displa'
                    width='100px !important'
                    height='100px !important'
                    roundedCircle                  
                  /> 
                  <input 
                    type="file" 
                    onChange={handleFileChange} 
                  /> 
                  
                </label>
                <Form.Text>
                  {
                    photo
                      ? `${photo.name} (${Math.round(photo.size/1024)} kB)`
                      : 'No photo selected'
                  }
                 </Form.Text>
              </Form.Group>
              
              
              
              <Form.Group id='userName' className='mb-3 form-font'>
                <Form.Label>User Name *</Form.Label>
                <Form.Control 
                  type='text' 
                  ref={userNameRef} 
                  required />
              </Form.Group>

              
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
              
              <Form.Group id="password-confirm" className="mb-3 form-font">
                <Form.Label>Password Confirmation *</Form.Label>
                <Form.Control 
                  type='password' 
                  ref={passwordConfirmRef} 
                  required />
              </Form.Group>
                 
                
                  <p>By logging in to AARTIS, I confirm that I have read and agree to the AARTIS Terms of Service, Privacy Policy, and to receive emails and updates.</p>

                <div className='d-flex justify-content-center'>  
                  <Button
                    disabled={loading} 
                    className='btnField btn-font btn-lg'
                    type="submit"
                  >
                    CREATE ACCOUNT
                  </Button>               
                </div>
                
              <div className='text-center'>Already a member? <Link to="/login" className='linkText'>LOGIN</Link></div>

          </Form>
        </>
      </FormBox> 
  )
}

export default SignupPage