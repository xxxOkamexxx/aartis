import { useEffect, useState } from "react"
import { Link, NavLink, useNavigate } from "react-router-dom"

// components
import NavItems from "./NavItems"
import SearchForm from "../SearchForm"

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
import MenuIcon from '@mui/icons-material/Menu';


const Navigation = () => {
    const [data, setData] = useState([])
    const { 
      currentUser, 
      userName, 
      userEmail, 
      userPhotoUrl
    } = useAuthContext()

    const navigate = useNavigate()
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    
    // const handleSubmit = async(e) => {
    //   e.preventDefault()
    //   try {

    //     console.log('start search')
    //     //navigate('/search')
  
    //   } catch (err) {       
    //     console.log('something is wrong')
    //   }
    // }

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

                <Nav className="no-display">
                {/* <Nav className="no-display d-flex align-items-center justify-content-end flex-grow-1 pe-3"> */}
                  <Link to ="/upload">
                    <Button className="btn-outline-secondary btn-font">CREATE</Button>
                  </Link>
                    
    
                  <SearchForm />    

                  <Link to="/logout">
                    <Button className="btn-secondary btn-font ">Logout</Button> 
                  </Link>              
                </Nav>

              {/* users setting */}
                <div className='d-flex align-items-center justify-content-end'>              
                  <NavItems />
                </div>

              {/* offcanvas menu */}
                <Button 
                  variant="outline-light"  
                  className="ms-2 d-inline" 
                  onClick={handleShow}
                >
                  <MenuIcon />
                </Button>

                <Offcanvas
                  className='offcanvas' 
                  show={show} 
                  onHide={handleClose}
                >
                  <Offcanvas.Header 
                    closeButton
                    closeVariant='white'
                  >
                    <Offcanvas.Title className="d-flex flex-column">
                                           
                    </Offcanvas.Title>
                  </Offcanvas.Header>

                    <div className="offcanvas-user">
                      <NavLink to={`/profile/${currentUser.uid}`} className="d-flex flex-row mb-3">
                        <Image
                            className="photo-placeholder ms-3"
                            src={userPhotoUrl?  userPhotoUrl : 'https://via.placeholder.com/225'}
                            height={50}
                            width={50}
                            roundedCircle
                            style={{backgroundColor:'#fcfcfc'}}
                        />

                        <h3 className="ms-3 align-self-end">{userName}</h3>
                      </NavLink>
                    </div>
                    
                  <Offcanvas.Body>

                  

                    <Nav className="offcanvas-body">
                      <SearchForm /> 

                      <hr />

                      <Link to="/">
                        <h5>Home</h5>
                      </Link>

                      <Link to={`/profile/${currentUser.uid}`}>
                        <h5>Profile</h5>
                      </Link>

                      <Link to="/upload">
                        <h5>Create</h5>
                      </Link> 
                      
                      <Link to="/dashboard">
                        <h5>Dashboard</h5>
                      </Link> 


        
                           

                      <Link to="/logout">
                        <Button className="btn-secondary btn-font offcanvas-btn">Logout</Button>
                      </Link>              
                    </Nav> 

                  </Offcanvas.Body>
                </Offcanvas>

              </div>

              // <div className="d-flex flex-row justify-content-end align-item-center"> 
              //   {/* users setting */}
              //   <div className='d-flex align-items-center justify-content-end'>              
              //     <NavItems />
              //   </div>


              //    {/* menu  */}
              //   <div >
         
              //     <Navbar.Toggle aria-controls='offcanvasNavbar' />
              //     <Navbar.Offcanvas
              //       id='offcanvasNavbar'
              //       aria-labelledby='offcanvasNavbarLabel'
              //       className='offcanvas'
              //     >
              //       <Offcanvas.Header closeButton closeVariant='white' >
              //         {/* <Offcanvas.Title id='offcanvasNavbarLabel'>
              //           Offcanvas
              //         </Offcanvas.Title> */}
              //       </Offcanvas.Header>
                    
              //       <Offcanvas.Body>
              //         <Nav className="d-flex align-items-center justify-content-end flex-grow-1 pe-3">

              //           <Nav.Link href="/upload">
              //             <Button className="btn-secondary btn-font">CREATE</Button>
              //           </Nav.Link>
                        
              //           <SearchForm />    

              //           <Button className="btn-outline-secondary btn-font ">Logout</Button>               
              //       </Nav>                    
              //       </Offcanvas.Body> 
                      
                
              //     </Navbar.Offcanvas>

              //   </div>
              // </div>
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

  )
}

export default Navigation