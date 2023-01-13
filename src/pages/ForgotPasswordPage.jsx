import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'

// contexts
import { useAuthContext } from '../context/AuthContext'

// bootstrap
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap'

// component
import FormBox from '../components/FormBox'


const ForgotPasswordPage = () => {
	const emailRef = useRef()
	const [error, setError] = useState(null)
	const [loading, setLoading] = useState(false)
	const [message, setMessage] = useState(false)
	const { resetPassword } = useAuthContext()

	const handleSubmit = async (e) => {
		e.preventDefault()
		setError(null);
		setMessage(null);

		try {
			setLoading(true)
			await resetPassword(emailRef.current.value)
			setMessage("Password reset link successfully sent!")

		} catch (err) {
			setError(err.message)
			setLoading(false)

		} finally {
			setLoading(false)

		}
	}

	return (
		<FormBox className="py-3 center-y">
			<Form 
				onSubmit={handleSubmit} 
				style={{width:'100%'}}
			>
			
				{error && (<Alert variant="danger">{error}</Alert>)}
				{message && (<Alert variant="success">{message}</Alert>)}

				<p>Enter your email address and we will send you a password reset link.</p>

				<p><small><em>Please check your spam-folder if you do not receive the email.</em></small></p>


					<Form.Group 
						id="email" 
						className='mb-3 form-font'
					>
						<Form.Label className='input_icon'>Email</Form.Label>
						<Form.Control type="email" ref={emailRef} required />
					</Form.Group>

					<Button 
						disabled={loading} 
						type="submit" 
						className='btnField btn-font btn-lg'
					>
						Send password reset email
					</Button>
					
					<div className="text-center mt-3">
						Suddenly remembered your password?<br/>
						<Link to="/login">Log In</Link>
					</div>
			
			</Form>		
		
		</FormBox>
	)
}

export default ForgotPasswordPage
