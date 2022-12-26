import { Link, NavLink } from 'react-router-dom'

// Bootstrap
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

// Image
import Logo from '../assets/logo/logo-initial-white.svg'

const Navigation = () => {
	return (
		<Navbar className='navbar-wrapper' expand="md">
			<Container>
				<Navbar.Brand as={Link} to="/">
					<img src={Logo} style={{height:'35px'}} />
				</Navbar.Brand>

				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="ms-auto">
						<Nav.Link as={NavLink} end to="/">
							Menu
						</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	)
}

export default Navigation
