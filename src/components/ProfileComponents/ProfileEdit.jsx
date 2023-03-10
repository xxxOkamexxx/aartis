import { createRef, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

// context components
import { useAuthContext } from '../../context/AuthContext'
import FormBox from '../FormBox';

// hooks
import useUser from '../../hooks/useUser';


// bootstrap style images
import { Container, Row, Col, Form, Button, Card, Alert, Image } from 'react-bootstrap'
import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from '@mui/material';
import { VerticalAlignBottom } from '@mui/icons-material';




const ProfileEdit = () => {
  
  const displayNameRef = useRef()
  const emailRef = useRef()
  const photoRef = useRef()
	const passwordRef = useRef()
	const passwordConfirmRef = useRef()
  const descriptionRef = useRef()
	const [photo, setPhoto] = useState()
  const [error, setError] = useState(null)
	const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(null)
  const navigate = useNavigate() 
  const {  
    update,
    currentUser, 
    reloadUser, 
    setUserDisplay, 
    setEmail, 
    setPassword, 
    setUserDescription,
  } = useAuthContext()

  // get current users info 
  const { data } = useUser(currentUser.uid)
  console.log(data.description)

  
  // change photo
  const handleFileChange = (e) => {
    if (!e.target.files.length) {
			setPhoto(null)
			return
		}

		setPhoto(e.target.files[0])
		console.log("File changed!", e.target.files[0])    
    console.log('photo', photo)
  }

  // submit edit
  const handleSubmit = async (e) => {
    e.preventDefault()
		
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
			return setError("The passwords does not match")
    }

    setError(null);
		setMessage(null);

		// update user profile
		try {
			setLoading(true)
			// upldate users name or photo
			if (
				displayNameRef.current.value !== currentUser.displayName
				|| photo
			) {
				await setUserDisplay(displayNameRef.current.value, photo)
			}
			// update email
			if (emailRef.current.value !== currentUser.email) {
				await setEmail(emailRef.current.value)
			}
			//update password
			if (passwordRef.current.value) {
				await setPassword(passwordRef.current.value)
			}
     
      await update({
        name:displayNameRef.current.value,
        email:emailRef.current.value, 
        photoURL: photo,
        description:descriptionRef.current.value,
      });
			
			await reloadUser()

			setMessage("Profile successfully updated")
			setLoading(false)
   
      navigate(`/profile/${currentUser.uid}`)


		} catch (err) {
			console.log("Error updating profile", err)
			setError(err.message)
			setLoading(false)
		}

  }
  
 
  return ( 
    
      <FormBox>
        <>
          <Form onSubmit={handleSubmit} title='edit-profile' style={{width:'100%'}} className='form-wrapper'>


           
              <Form.Group className='d-flex align-content-end profile-header'> 

                <label className='input_icon'>
                    <Image 
                      src={currentUser.photoURL? currentUser.photoURL : 'https://via.placeholder.com/225' }
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
                <IconButton
                  style={{width:'30px', height:'30px'}}
                  type="file" 
                  //onChange={handleFileChange} 
                >
                  <EditIcon 
                    className='edit_icon' 
                    style={{color:'#fcfcfc'}}
                  />
                </IconButton> 
                <Form.Text>
                  {
                    photo
                      ? `${photo.name} (${Math.round(photo.size/1024)} kB)`
                      : ''
                  }
                 </Form.Text>
              </Form.Group>

              {error && (
                <Alert variant='danger' className='mt-3'>{error}</Alert>
              )}
              

              <Form.Group className='mb-3 form-font'>
                <Form.Label>User name</Form.Label>
                <Form.Control 
                  type="text" 
                  ref={displayNameRef} 
                  defaultValue={currentUser.displayName}
                />
              </Form.Group> 
              
              <Form.Group className='mb-3 form-font'>
                <Form.Label>Description</Form.Label>
                <Form.Control 
                  type='text' 
                  as="textarea" 
                  rows={3}
                  ref={descriptionRef}
                  defaultValue={data.description}
                />
              </Form.Group> 

              <Form.Group id="email" className='mb-3 form-font'>
                <Form.Label>E-mail</Form.Label>
                <Form.Control 
                  type="email" 
                  ref={emailRef} 
                  defaultValue={currentUser.email}
                />
              </Form.Group>

              <Form.Group id="password" className='mb-3 form-font'>
                <Form.Label>New Password</Form.Label>
                <Form.Control 
                  type="password" 
                  ref={passwordRef} 
                  defaultValue={currentUser.password}
                  autoComplete="new-password" 
                />
              </Form.Group>

              <Form.Group id="password-confirm" className='mb-3 form-font'>
                <Form.Label>Confirm New Password</Form.Label>
                <Form.Control type="password" ref={passwordConfirmRef} autoComplete="new-password" />
              </Form.Group>

              <p></p>

              <div className='d-flex justify-content-center'>  
                <Button disabled={loading} type="submit" className='btnField btn-lg'>UPPDATE</Button>
              </div>
           
          </Form>     
        </>
      </FormBox>
  )
}

export default ProfileEdit

