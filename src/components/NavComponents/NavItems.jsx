import React from 'react'
import { NavLink } from 'react-router-dom';

import { useAuthContext } from '../../context/AuthContext'

// mui
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@emotion/react';

import NavDropdown from 'react-bootstrap/NavDropdown'
import Image from 'react-bootstrap/Image'



const NavItems = () => {
  const { 
    currentUser, 
    userName, 
    userEmail, 
    userPhotoUrl
  } = useAuthContext()
  
  const theme = createTheme({
    palette: {
      primary: {
        main: '#f44336',
        contrastText: '#fff',
      },
      action:{
        main: '#fcfcfc',
      },
    },
  });
  
  return (
    < >
      
      <ThemeProvider theme={theme}>

        <Badge badgeContent={5} color='primary' sx={{mx:1}}>
            <NotificationsIcon color="action" />
        </Badge>

        <Badge badgeContent={4} color='primary'sx={{mx:1}}>
            <MailIcon color="action" />
        </Badge>

      </ThemeProvider>

      <NavDropdown
          title={ 
            <Image
                className="photo-placeholder ms-3"
                src={userPhotoUrl?  userPhotoUrl : 'https://via.placeholder.com/225'}
                height={30}
                width={30}
                roundedCircle
                style={{backgroundColor:'#fcfcfc'}}
            />
                }
          id='offcanvasNavbarDropdown'
        >
          <NavDropdown.Item href={`/profile/${currentUser.uid}`}>Profile</NavDropdown.Item>
          <NavDropdown.Item href="/dashboard">Dashboard</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="/logout">
            Logout
          </NavDropdown.Item>
      </NavDropdown>
    </>
  )
}

export default NavItems
