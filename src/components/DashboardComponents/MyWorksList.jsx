import React from 'react'
import MyWorks from './MyWorks'

import { Container, Alert, ListGroup } from 'react-bootstrap'
import BeatLoader from 'react-spinners/BeatLoader'
import { Link } from 'react-router-dom'

const MyWorksList = ({ query }) => {
  if (query.isError) {
		// show error
		return (
			<Alert variant='warning'>
				<strong>Error!</strong> {query.error.message}
			</Alert>
		)
	}

	if (query.isLoading) {
		// show spinner
		return <BeatLoader color={'#AD9510'} />
	}

	console.log(query)
  return (

        <ListGroup>
          {query.data && query.data.map(image => (
            
            <ListGroup.Item key={image.id}>
              
                <MyWorks image={image} />
      
            </ListGroup.Item>
          ))}
        </ListGroup>


  )
}

export default MyWorksList