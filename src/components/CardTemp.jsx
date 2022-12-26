import React from 'react'

// material ui
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';


const CardTemp = ({children, title}) => {
  return (
    <Card className='card'>
        <h4>{title}</h4>
        <CardContent>

            {children}
        </CardContent>
    </Card>
  )
}

export default CardTemp