import { useEffect, useState } from "react"
import { Link, NavLink, useNavigate } from "react-router-dom"

// components
import NavItems from "./NavItems"

// firebase
import { useAuthContext } from '../../context/AuthContext'
import { doc, onSnapshot } from "firebase/firestore"
import { db } from "../../firebase/config"

// bootstrap
import Container  from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"
import NavDropdown from 'react-bootstrap/NavDropdown'
import Image from 'react-bootstrap/Image'
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button"
import Offcanvas from 'react-bootstrap/Offcanvas';

import Logo from '../../assets/logo/logo-initial-white.svg'


const Navigation = () => {
    const [data, setData] = useState([])
    const { currentUser, userName, userEmail, userPhotoUrl} = useAuthContext()
    const navigate = useNavigate()

    const handleSubmit = async(e) => {
      e.preventDefault()

      try {

        console.log('start search')
        navigate('/')
  
      } catch (err) {       
        console.log('something is wrong')
      }
    }

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

    //console.log('data', data)


  return (
        <Navbar bg="dark" expand='lg' className="navbar navbar-dark">         
          <Container className="d-flex align-items-center">
            
            {/* Logo */}
            <div className="d-flex align-self-start">
                <Navbar.Brand as={Link} to={currentUser? '/' :'/en'}>
                <img
                  src={Logo}
                  height="30"
                  className="d-inline-block"
                  alt="logo"
                />
              </Navbar.Brand>
            </div>

       
            { currentUser ?( 
              <div className="d-flex flex-row justify-content-end align-item-center"> 
                {/* users setting */}
                <div className='d-flex align-items-center justify-content-end'>              
                    <NavItems />
                  </div>


                 {/* menu  */}
                <div >

         
                    <Navbar.Toggle aria-controls='offcanvasNavbar' />
                    <Navbar.Offcanvas
                      id='offcanvasNavbar'
                      aria-labelledby='offcanvasNavbarLabel'
                      placement="start"
                      className='offcanva'
                    >
                      <Offcanvas.Header closeButton>
                        <Offcanvas.Title id='offcanvasNavbarLabel'>
                          Offcanvas
                        </Offcanvas.Title>
                      </Offcanvas.Header>
                      
                      <Offcanvas.Body>
                        <Nav className="d-flex align-items-center justify-content-end flex-grow-1 pe-3">

                          <Nav.Link href="/upload">
                            <Button className="btn-font">CREATE</Button>
                          </Nav.Link>
                          
                          <Form onSubmit={handleSubmit} className="d-flex">
                            <Form.Control
                              type="search"
                              placeholder="Search"
                              className="mx-2"
                              aria-label="Search"
                            />
                          </Form>                                      
                      </Nav>                    
                      </Offcanvas.Body>                 
                    </Navbar.Offcanvas>

                </div>
              </div>
            )
            :(
              <div className="d-flex">
                {/* No user is logged in */}
                <Nav.Link as={NavLink} to="/login" style={{color:'#fcfcfc',}} className='ms-3'>Login</Nav.Link>
                <Nav.Link as={NavLink} to="/signup" style={{color:'#fcfcfc'}} className='ms-3'>Signup</Nav.Link>                
              </div>
            )
          }
          </Container>
        </Navbar>



    // <Navbar className="navbar navbar-expand-lg navbar-dark bg-dark">
    //     <Container>
    //       <Navbar.Brand as={Link} to={currentUser? '/home' :'/'}>
    //         <img
    //           src={Logo}
    //           height="30"
    //           className="d-inline-block align-top"
    //           alt="logo"
    //         />
    //       </Navbar.Brand>

    //       <Navbar.Toggle aria-controls="basic-navbar-nav" />
    //       <Navbar.Collapse id="basic-navbar-nav">
    //         <Nav className="ms-auto align-items-center">
    //           {
    //             currentUser? (
    //               <>
    //                 <NavItems />
                    
    //                 <NavLink to='/upload'>
    //                     <Button>CREATE</Button>
    //                   </NavLink>

    //                 <NavDropdown                                    
    //                   align={'end'}
    //                   title={
    //                     userPhotoUrl
    //                     ? <Image
    //                         className="photo-placeholder"
    //                         src={userPhotoUrl}
    //                         height={30}
    //                         width={30}
    //                         fluid
    //                         roundedCircle
    //                         />
    //                     : userName || userEmail

    //                 }>

                     
    //                   <NavLink to="/dashboard" className="dropdown-item">
    //                     Dashboard
    //                   </NavLink>
    //                   <NavDropdown.Divider />


    //                   <NavLink to="/logout"
    //                     className="dropdown-item">
    //                       Log Out
    //                   </NavLink>
    //                   </NavDropdown>
    //                 </>
    //             ) : (
    //               <>
    //                 {/* No user is logged in */}
    //                 <Nav.Link as={NavLink} to="/login">Login</Nav.Link>
    //                 <Nav.Link as={NavLink} to="/signup">Signup</Nav.Link>
      
    //               </>
    //             )
    //           }
    //         </Nav>
    //       </Navbar.Collapse>
    //     </Container>
      
    // </Navbar>
  )
}

export default Navigation