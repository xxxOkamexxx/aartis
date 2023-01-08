import { useState } from "react"
import { useParams } from "react-router-dom"
import { Link } from 'react-router-dom';

import useUsersWorks from "../../hooks/useUsersWorks"

import { Card, Container, Image, Row, Col } from "react-bootstrap"

const CreatorsWorks = ({id}) => {
  const [isLoading, setIsLoading] = useState(false)
  //const { id } = useParams()

  console.log(id)
  const { data } = useUsersWorks(id)

  if(!data){
    return 
  }
  console.log(data)
  

  return (
    <>
      { data.length == 0 && 
      <h4 className="mb-5">There are no works yet</h4>
      }

      <Row xs={1} sm={2} md={3} lg={4}>
        { data && data.map(work => (
          <Col key={work.id}className="d-flex mb-4">

            <Card 
              className="thumbnail-box" 
              style={{textDecoration:'none', color:'#343530'}}
              
            >
              <div 				
                className='thumbnail-image-box'
              >
                <Link to={`/work/${work.id}`}>
                  <Image 
                    className='thumbnail-image'
                    src={work.url}
                    alt={work.title}
                    />
                </Link>
              </div>
              
              <div className='thumbnail-footer'>
                <h5>{work.title}</h5>
              </div>
          
            </Card>

          </Col>
        )) }
      </Row>
      
    </>
  )
}

export default CreatorsWorks
