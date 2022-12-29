import { useEffect, useState } from "react"
import { Link, NavLink } from "react-router-dom"

// firebase
import { useAuthContext } from '../context/AuthContext'
import { doc, onSnapshot } from "firebase/firestore"
import { db } from "../firebase/config"

// bootstrap
import Container  from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"
import NavDropdown from 'react-bootstrap/NavDropdown'
import Image from 'react-bootstrap/Image'

import Logo from '../assets/logo/logo-initial-white.svg'


const Navigation = () => {
    const [data, setData] = useState([])
    const { currentUser, userName, userEmail, userPhotoUrl} = useAuthContext()


    useEffect(() => {
        if (currentUser) {
          const ref = doc(db, 'users', currentUser.uid)
          const unsubscribe = onSnapshot(ref, (snapshot) => {
            setData({
              id: snapshot.id,
              ...snapshot.data(),
            })
          })
          return unsubscribe
        }
        return
    },[currentUser])

    console.log('data', data)


  return (
    <Navbar className="navbar navbar-expand-lg navbar-dark bg-dark">
        <Container>
          <Navbar.Brand as={Link} to="/">
            <img
              src={Logo}
              height="30"
              className="d-inline-block align-top"
              alt="logo"
            />
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto align-items-center">
              {
                currentUser? (
                  <>
                    <NavDropdown                                    
                      align={'end'}
                      title={
                        userPhotoUrl
                        ? <Image
                            className="photo-placeholder"
                            src={userPhotoUrl}
                            height={50}
                            width={50}
                            fluid
                            roundedCircle
                            />
                        : userName || userEmail

                    }>
                      <NavLink to="/update-profile" className="dropdown-item">
                        Update Profile
                      </NavLink>
                      <NavDropdown.Divider />

                      { data.admin &&
                        (
                          <>
                            <NavLink to="/users" className="dropdown-item">All Users</NavLink>
                            <NavLink to="/add-places" className="dropdown-item">Add a new Places</NavLink>
                            <NavLink to="/places" className="dropdown-item">List of Places</NavLink>
                            <NavLink to="/tips" className="dropdown-item">List of Suggestions</NavLink>
                            <NavDropdown.Divider />
                          </>
                        )
                      }

                      <NavLink to="/logout"
                        className="dropdown-item">
                          Log Out
                      </NavLink>
                      </NavDropdown>
                    </>
                ) : (
                  <>
                    {/* No user is logged in */}
                    <Nav.Link as={NavLink} to="/login">Login</Nav.Link>
                    <Nav.Link as={NavLink} to="/signup">Signup</Nav.Link>
      
                  </>
                )
              }
            </Nav>
          </Navbar.Collapse>
        </Container>
      
    </Navbar>
  )
}

export default Navigation