import { useState } from "react"
import { useParams } from "react-router-dom"

import useUsersWorks from "../../hooks/useUsersWorks"

import { Card, Container, Image } from "react-bootstrap"

const CreatorsWorks = () => {
  const [isLoading, setIsLoading] = useState(false)
  const { id } = useParams()

  console.log(id)
  const { data } = useUsersWorks(id)

  if(!data){
    return 
  }
  console.log(data)
  

  return (
    <>
      { data && data.map(work => (
        <Card key={work.id}>
          <p>{work.title}</p>

        </Card>
      )) }
      
    </>
  )
}

export default CreatorsWorks
