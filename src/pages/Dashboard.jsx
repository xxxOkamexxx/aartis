import React from 'react'

import useWorks from '../hooks/useWorks'
import MyWorksList from '../components/DashboardComponents/myWorksList'

const Dashboard = () => {
  // get works
  const imageQuery = useWorks({ fetchOnlyCurrentUser: true})

  return (
    <div>
      <h1>Dashboard</h1>
      <h1>Works Management Page</h1>
      
      < MyWorksList query={imageQuery}/>
    </div>
  )
}

export default Dashboard