import { Link } from 'react-router-dom'

import { useAuthContext } from '../context/AuthContext'

import { Container, Button, } from 'react-bootstrap'


const NotFound = () => {
	const { currentUser } = useAuthContext()

	return (
		<div className='page-bg'>
			<div className='formWrapper'>
				<h1>That page could not be found</h1>
				<Link to={currentUser? '/home' : '/'} >
					<Button className='btnField btnFont'>
						BACK
					</Button>
				</Link>
			</div>
		</div>
	)
}

export default NotFound
