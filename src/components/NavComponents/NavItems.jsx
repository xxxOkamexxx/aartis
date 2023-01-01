import React from 'react'
import { NavLink } from 'react-router-dom';

// mui
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@emotion/react';

const NavItems = () => {
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
    <div>
      
      <ThemeProvider theme={theme}>

        <Badge badgeContent={5} color='primary' sx={{mx:1}}>
            <NotificationsIcon color="action" />
        </Badge>

        <Badge badgeContent={4} color='primary'sx={{mx:1}}>
            <MailIcon color="action" />
        </Badge>

      </ThemeProvider>
    </div>
  )
}

export default NavItems
