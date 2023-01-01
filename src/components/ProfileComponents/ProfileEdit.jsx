import { createRef, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext'
// bootstrap
import { Container, Row, Col, Form, Button, Card, Alert, Image } from 'react-bootstrap'

const ProfileEdit = () => {
  const userNameRef = useRef()
  const emailRef = useRef()
	const passwordRef = useRef()
	const passwordConfirmRef = useRef()
	const descriptionRef = useRef()
	const [photo, setPhoto] = useState()
  const [error, setError] = useState(null)
	const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(null)
  const { 
    update, 
    currentUser, 
    reloadUser, 
    setUserDisplay, 
    setEmail, 
    setPassword, 
  } = useAuthContext()
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

		setError(null);
		setMessage(null);
		console.log(descriptionRef.current.value, currentUser.description)

		// update user profile
		try {
			setLoading(true)
			// upldate users name or photo
			if (
				userNameRef.current.value !== currentUser.displayName
				
			) {
				await setUserDisplay(userNameRef.current.value, photo)
			}

			// update email
			// if (emailRef.current.value !== currentUser.email) {
			// 	await setEmail(emailRef.current.value)
			// }

			//update password
			if (passwordRef.current.value) {
				await setPassword(passwordRef.current.value)
			}
			
			update({
				name:userNameRef.current.value, 
				email:emailRef.current.value, 
				photo,
        description:descriptionRef.current.value
			})
			await reloadUser()

			setMessage("Profile successfully updated")
			setLoading(false)
   
      navigate('/profile')


		} catch (err) {
			console.log("Error updating profile", err)
			setError(err.message)
			setLoading(false)
		}

  }
  
  console.log(currentUser.photoURL)
  return ( 

      <div>
        <Form onSubmit={handleSubmit}>
          
          <Form.Group>
            
              <Image 
                src={currentUser.photoURL? currentUser.photoURL : 'https://via.placeholder.com/225' }
                fluid
                width='100px'
                height='100px'
                roundedCircle
              />
            <input type="file" onChange={handleFileChange} />  
          </Form.Group>
          

          <Form.Group>
            <Form.Label>User name</Form.Label>
            <Form.Control 
              type='text' 
              ref={userNameRef} 
              defaultValue={currentUser.displayName}
            />
          </Form.Group> 
          
          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control 
              type='text' 
              as="textarea" 
              rows={3}
              ref={descriptionRef} 
              defaultValue={currentUser.description}
            />
          </Form.Group> 

          <Form.Group id="password" className="mb-3">
            <Form.Label>New Password</Form.Label>
            <Form.Control type="password" ref={passwordRef} autoComplete="new-password" />
          </Form.Group>

          <Form.Group id="password-confirm" className="mb-3">
            <Form.Label>Confirm New Password</Form.Label>
            <Form.Control type="password" ref={passwordConfirmRef} autoComplete="new-password" />
          </Form.Group>
          
          <Button disabled={loading} type="submit" className='btn-color'>UPPDATE</Button>

        </Form>     
      </div>
    
    )
}

export default ProfileEdit

