import React from 'react'
import { Link } from 'react-router-dom'

// hooks
import useOwnWorks from '../hooks/useOwnWorks' 

// components
import MyWorksList from '../components/DashboardComponents/MyWorksList'

// image, style, bootstrap
import { Button, Container } from 'react-bootstrap'



const Dashboard = () => {
  // get works
  const imageQuery = useOwnWorks()

  return (
    <Container>
      <h1>Dashboard</h1>
      <h1>Works Management Page</h1>
      <Link to='/upload'>
        <Button >Create</Button>
      </Link>
      
      < MyWorksList query={imageQuery} />
    </Container>
  )
}

export default Dashboard