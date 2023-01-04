import React from 'react'

import useWorks from '../hooks/useWorks'
import MyWorksList from '../components/DashboardComponents/MyWorksList'
import { Link } from 'react-router-dom'
import { Button, Container } from 'react-bootstrap'

const Dashboard = () => {
  // get works
  const imageQuery = useWorks({ fetchOnlyCurrentUser: true})

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