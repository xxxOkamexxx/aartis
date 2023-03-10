import { Link } from 'react-router-dom'

import { useAuthContext } from '../context/AuthContext'

import { Container, Button, } from 'react-bootstrap'


const NotFound = () => {
	const { currentUser } = useAuthContext()

	return (
		<div className='page-bg'>
			<div className='formBoxWrapper'>
				<h1>That page could not be found</h1>
				<Link to={currentUser? '/' : '/en'} >
					<Button className='btnField btn-font'>
						BACK
					</Button>
				</Link>
			</div>
		</div>
	)
}

export default NotFound
